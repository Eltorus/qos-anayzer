var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var dbadapter = require("./dbadapter");
var inmemorydbadapter = require("./inmemorydbadapter");
var initialized = false;

var app = express();
app.use(
    session({
        secret: "mysecret",
        resave: true,
        saveUninitialized: true,
        //cookie: { secure: true }
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function getDBAdapter(req) {
    //var db = new dbadapter();
    var db = new inmemorydbadapter(req.session);
    if(!initialized) {
        db.init();
        initialized = true;
    }
    return db;
}

function sendJsonResult(res, obj) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(obj));
}

app.get("/getActive", function (req, res) {
    var db = getDBAdapter(req);
    db.getSurveys(function (result) {
        sendJsonResult(res, result);
    });
});

app.get("/getSurvey", function (req, res) {
    var db = getDBAdapter(req);
    var surveyId = req.query["surveyId"];
    db.getSurvey(surveyId, function (result) {
        sendJsonResult(res, result);
    });
});

app.get("/changeName", function (req, res) {
    var db = getDBAdapter(req);
    var id = req.query["id"];
    var name = req.query["name"];
    db.changeName(id, name, function (result) {
        sendJsonResult(res, result);
    });
});

app.get("/create", function (req, res) {
    var db = getDBAdapter(req);
    var name = req.query["name"];
    db.addSurvey(name, function (result) {
        sendJsonResult(res, {Name: result.name, Id: result.name});
    });
});

app.post("/changeJson", function (req, res) {
    var db = getDBAdapter(req);
    var id = req.body.Id;
    var json = JSON.parse(req.body.Json);
    console.log("JSON : " + json);
    console.log("id : " + id);
    db.storeSurvey(id, json, function (result) {
        sendJsonResult(res, result.json);
    });
});

app.post("/post", function (req, res) {
    var db = getDBAdapter(req);
    var postId = req.body.postId;
    var surveyResult = req.body.surveyResult;
    var surveyResultNonEscaped = JSON.parse(surveyResult);
    console.log("/surveyResult : " + JSON.stringify(surveyResultNonEscaped));
    var date = new Date().getMonth() + "." + new Date().getFullYear()
    db.getSurvey(postId, function (survey) {
        db.getServqual(postId, date, function (result) {
            for (var i in survey.questions) {
                var question = survey.questions[i];
                if (question != null && question.type === "matrixdropdown") {
                    var servqual = {};
                    if (result) {
                        servqual = result;
                    }
                    for (var k in surveyResultNonEscaped[question.name]) {
                        var row = surveyResultNonEscaped[question.name][k];
                        var propertyName = "";
                        switch (row["importance"]) {
                            case '1':
                                propertyName = "w1";
                                break;
                            case '2':
                                propertyName = "w2";
                                break;
                            case '3':
                                propertyName = "w3";
                                break;
                            case '4':
                                propertyName = "w4";
                                break;
                            case '5':
                                propertyName = "w5";
                                break;
                        }
                        if (servqual[k] === undefined) {
                            servqual[k] = {
                                w1: 0,
                                w2: 0,
                                w3: 0,
                                w4: 0,
                                w5: 0,
                                contentment: {
                                    count: 0,
                                    value: 0
                                }
                            };
                        }
                        servqual[k][propertyName] += 1;
                        servqual[k].contentment.count += 1;
                        servqual[k].contentment.value += parseInt(row["contentment"]);
                    }
                    console.log("Servqual: " + JSON.stringify(servqual));
                    db.saveServqual(postId, servqual, date);
                }
            }
        });
    });
    date = new Date();
    db.postResults(postId, surveyResultNonEscaped, date, function (postResult) {
        sendJsonResult(res, postResult[postId][date]);
    });
});

app.get("/servqual", function (req, res) {
    var db = getDBAdapter(req);
    var surveyId = req.query["id"];
    db.getSurvey(surveyId, function (survey) {
        db.getServquals(surveyId, function (result) {
            var resultServqual = {};
            if (result) {
                for (var i in survey.questions) {
                    var question = survey.questions[i];
                    if (question != null && question.type === "matrixdropdown") {
                        Object.keys(result).forEach(function (date) {
                            resultServqual[date] = {};
                            if (result !== undefined) {
                                var servqual = result[date];
                            }
                            if (typeof servqual === 'undefined' || servqual == null) {
                                servqual = {};
                            } else {
                                for (var k in question.rows) {
                                    var row = question.rows[k];
                                    resultServqual[date][row.text] = {};
                                    resultServqual[date][row.text].importance = {};
                                    resultServqual[date][row.text].contentment = {};
                                    resultServqual[date][row.text].importance = Math.abs((servqual[row.value]["w5"] + 0.5 * servqual[row.value]["w4"] - 0.5 * servqual[row.value]["w2"] - servqual[row.value]["w1"]) /
                                        (servqual[row.value]["w5"] + servqual[row.value]["w4"] + servqual[row.value]["w3"] + servqual[row.value]["w2"] + servqual[row.value]["w1"]));
                                    resultServqual[date][row.text].contentment = servqual[row.value].contentment.value / servqual[row.value].contentment.count;
                                }
                            }
                        });
                    }
                }
            }
            sendJsonResult(res, resultServqual);
        });
    });
});

app.get("/statistic", function (req, res) {
    var db = getDBAdapter(req);
    var surveyId = req.query["id"];
    var locations = ["Минская", "Витебская", "Брестская", "Гродненская", "Гомельская", "Могилевская"];
    db.getResults(surveyId, function (result) {
        var resultStatistic = {
            age: [0, 0, 0, 0, 0],
            location: [0, 0, 0, 0, 0, 0]
        };
        if (result) {
            console.log("/servqual : " + JSON.stringify(result));
            Object.keys(result).forEach(function (i) {
            Object.keys(result[i]).forEach(function (date) {
                console.log("result[i] : " + JSON.stringify(result[i]));
                var age = parseInt(result[i][date].age);
                var index;
                if (age < 20) {
                    index = 0;
                }
                if (age >= 20 || age < 30) {
                    index = 1;
                }
                if (age >= 30 || age < 40) {
                    index = 2;
                }
                if (age >= 40 || age < 50) {
                    index = 3;
                }
                if (age >= 50) {
                    index = 4;
                }
                resultStatistic.age[index] += 1;
                var location = result[i][date].location;
                for (j = 0, len = locations.length; j < len; ++j) {
                    if (location === locations[j]) {
                        resultStatistic.location[j] += 1;
                    }
                }
            });
            });
        }
        console.log("/resultStatistic : " + JSON.stringify(resultStatistic));
        sendJsonResult(res, resultStatistic);
    });
});

app.get("/delete", function (req, res) {
    var db = getDBAdapter(req);
    var surveyId = req.query["id"];
    db.deleteSurvey(surveyId, function (result) {
        sendJsonResult(res, {});
    });
});

app.get("/results", function (req, res) {
    var db = getDBAdapter(req);
    var postId = req.query["postId"];
    db.getResults(postId, function (result) {
        sendJsonResult(res, result);
    });
});

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening!");
});
