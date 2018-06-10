var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var dbadapter = require("./dbadapter");
var inmemorydbadapter = require("./inmemorydbadapter");

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
    var json = req.body.Json;
    db.storeSurvey(id, json, function (result) {
        sendJsonResult(res, result.json);
    });
});

app.post("/post", function (req, res) {
    var db = getDBAdapter(req);
    var postId = req.body.postId;
    console.log("postId :   " + postId);
    var surveyResult = req.body.surveyResult;
    console.log(JSON.stringify(surveyResult));
    db.getSurvey(postId, function (survey) {
        db.getServqual(postId, new Date().getMonth() + "." + new Date().getFullYear(), function (result) {
            for (var i in survey.questions) {
                var question = survey.questions[i];
                if (question != null && question.type === "matrixdropdown") {
                    var servqual;
                    if (result) {
                        servqual = result.json;
                    }
                    if (typeof servqual === 'undefined' || servqual == null) {
                        servqual = {};
                    }
                    var surveyResultNonEscaped = JSON.parse(surveyResult);
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
                        if (typeof servqual[k] === 'undefined') {
                            servqual[k] = {};
                            servqual[k].w1 = 0;
                            servqual[k].w2 = 0;
                            servqual[k].w3 = 0;
                            servqual[k].w4 = 0;
                            servqual[k].w5 = 0;
                            servqual[k].contentment = {};
                            servqual[k].contentment.count = 0;
                            servqual[k].contentment.value = 0;
                        }
                        servqual[k][propertyName] += 1;
                        servqual[k].contentment.count += 1;
                        servqual[k].contentment.value += parseInt(row["contentment"]);
                    }
                    console.log("Servqual: " + JSON.stringify(servqual));
                    db.saveServqual(postId, servqual, new Date().getMonth() + "." + new Date().getFullYear());
                }
            }
        });
    });
    db.postResults(postId, surveyResult, function (postResult) {
        sendJsonResult(res, postResult.json);
    });
})
;

app.get("/servqual", function (req, res) {
    var db = getDBAdapter(req);
    var surveyId = req.query["id"];
    db.getSurvey(surveyId, function (survey) {
        db.getServquals(surveyId, function (result) {
            var resultServqual = {};
            if (result) {
                console.log("/servqual : " + JSON.stringify(result));
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
