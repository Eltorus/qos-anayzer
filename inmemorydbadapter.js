var demoData = require("./demo-surveys");
var fs = require('fs');
var fileSession = {};

function InMemoryDBAdapter(session) {
    function getTable(tableName) {
        var table = session[tableName];
        if (!table) {
            table = [];
            session[tableName] = table;
        }
        return table;
    }

    function getObjectsFromStorage(tableName, callback) {
        var objects = {};
        var table = getTable(tableName);
        table.forEach(function (item) {
            objects[item.name] = item;
        });
        callback(objects);
    }

    function addSurvey(name, callback) {
        var table = getTable("surveys");
        var newObj = {
            name: name,
            json: "{}"
        };
        table.push(newObj);
        callback(newObj);
    }

    function postResults(postId, json, date, callback) {
        var table = getTable("results");
        var result = table.filter(function (item) {
            return item[postId] !== undefined;
        })[0];
        console.log("postResults : " + JSON.stringify(result));
        if (!!result) {
            result[postId][date] = json;
        } else {
            result = {
                [postId]: {
                    [date]: json
                }
            };
            table.push(result);
        }
        callback && callback(result);
    }

    function getResults(postId, callback) {
        var table = getTable("results");
        if (Object.keys(table).length <= 0) {
            Object.keys(demoData.results).forEach(function (surveyId) {
                Object.keys(demoData.results[surveyId]).forEach(function (date) {
                    postResults(surveyId, demoData.results[surveyId][date],date);
                });
            });
        }
        var results = table
            .filter(function (item) {
                return item[postId] !== undefined;
            }).map(function (item) {
                return item[postId];
            });
        console.log("getResults :" + JSON.stringify(results));
        callback(results);
    }

    function getServqual(postId, date, callback) {
        getServquals(postId, function (result) {
            callback(result[date]);
        });
    }

    function getServquals(postId, callback) {
        var table = getTable("servqual");
        if (Object.keys(table).length <= 0) {
            Object.keys(demoData.servqual).forEach(function (postId) {
                Object.keys(demoData.servqual[postId]).forEach(function (date) {
                    saveServqual(postId, demoData.servqual[postId][date], date);
                });
            });
        }
        var result = table
            .filter(function (item) {
                return item[postId] !== undefined;
            })[0];
        var servqual = {};
        if (result && result[postId] !== undefined) {
            servqual = result[postId];
        }
        console.log("Get Result output : " + JSON.stringify(servqual));
        callback(servqual);
    }


    function saveServqual(id, json, date, callback) {
        var table = getTable("servqual");
        var result = table.filter(function (item) {
            return item[id] !== undefined;
        })[0];
        if (!!result) {
            result[id][date] = json;
        } else {
            result = {
                [id]: {
                    [date]: json
                }
            };
            table.push(result);
        }
        console.log("Save Servqual : " + JSON.stringify(result));
        callback && callback(result);
    }

    function deleteSurvey(surveyId, callback) {
        var table = getTable("surveys");
        var result = table.filter(function (item) {
            return item.name === surveyId;
        })[0];
        table.splice(table.indexOf(result), 1);
        callback(result);
    }

    function storeSurvey(id, json, callback) {
        var table = getTable("surveys");
        var result = table.filter(function (item) {
            return item.name === id;
        })[0];
        if (!!result) {
            result.json = json;
        } else {
            result = {
                name: id,
                json: json
            };
            table.push(result);
        }
        callback && callback(result);
    }

    function changeName(id, name, callback) {
        var table = getTable("surveys");
        var result = table.filter(function (item) {
            return item.name === id;
        })[0];
        if (!!result) {
            result.name = name;
        }
        callback && callback(result);
    }

    function getSurveys(callback) {
        getObjectsFromStorage("surveys", function (objects) {
            if (Object.keys(objects).length > 0) {
                callback(objects);
            } else {
                Object.keys(demoData.surveys).forEach(function (surveyId) {
                    storeSurvey(surveyId, demoData.surveys[surveyId]);
                });
                getObjectsFromStorage("surveys", callback);
            }
        });
    }

    return {
        addSurvey: addSurvey,
        getSurvey: function (surveyId, callback) {
            getSurveys(function (result) {
                callback(result[surveyId].json);
            });
        },
        storeSurvey: storeSurvey,
        getSurveys: getSurveys,
        getServqual: getServqual,
        getServquals: getServquals,
        saveServqual: saveServqual,
        deleteSurvey: deleteSurvey,
        postResults: postResults,
        getResults: getResults,
        changeName: changeName
    };
}

module.exports = InMemoryDBAdapter;
