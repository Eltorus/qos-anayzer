function getParams() {
    var url = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    var result = {};
    url.forEach(function (item) {
        var param = item.split("=");
        result[param[0]] = param[1];
    });
    return result;
}

function init() {
    Survey.dxSurveyService.serviceUrl = "";

    var css = {
        root: "sv_main sv_frame sv_default_css"
    };

    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сенятбрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    var surveyId = decodeURI(getParams()["id"]);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "" + '/servqual?id=' + surveyId);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        var result = JSON.parse(xhr.response);
        if (!!result) {
            var monthLabels = [];
            var data = [];
            Object.keys(result).forEach(function (date) {
                monthLabels.push(months[date.split(".")[0]]);
                var totalQuality = 0;
                Object.keys(result[date]).forEach(function (parameter){
                    totalQuality += result[date][parameter].importance * result[date][parameter].contentment;
                });
                data.push(totalQuality);
            });

            displayLineCharts(data, monthLabels);
        }
    };
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', "" + '/statistic?id=' + surveyId);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.onload = function () {
        var result = JSON.parse(xhr2.response);
        console.log("result: " + JSON.stringify(result));
        if (!!result) {
            var ageData = [];
            var locationData = [];
            if(result.age) {
                var totalAge = result.age.reduce(function (acc, val) {
                    return acc + val;
                });
                console.log("totalAge: " + JSON.stringify(totalAge));
                for (i = 0; i < 5; ++i) {
                    ageData[i] = result.age[i] / totalAge * 100;
                }
            }
            if(result.location) {
                var totalLocation = result.location.reduce(function (acc, val) {
                    return acc + val;
                });
                console.log("totalLocation: " + JSON.stringify(totalLocation));
                for (i = 0; i < 6; ++i) {
                    locationData[i] = result.location[i] / totalLocation * 100;
                    console.log("ageData["+i+"]" + ageData[i]);
                }
                console.log("ageData: " + ageData);
                console.log("locationData: " + locationData);
                displayPieCharts(ageData, locationData);
            }
        }
    };
    xhr2.send();
}

function displayLineCharts(linedata, monthLabels) {

    var ctx = document.getElementById("lineChart");
    var data = {
        labels: monthLabels,
        datasets: [
            {
                label: "Удовлетворенность пользователей",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: linedata,
            }
        ]
    };

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });
}


function displayPieCharts(ageData, locationData) {

    var ctx = document.getElementById("ageChart").getContext('2d');
    var ageChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["меньше 20", "20-30", "30-40", "40-50", "больше 50"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f"
                ],
                data: ageData
            }]
        }
    });

    ctx = document.getElementById("locationChart").getContext('2d');
    var locationChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Минская", "Витебская", "Брестская", "Гродненская", "Гомельская", "Могилевская"],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: locationData
            }]
        }
    });
}

init();
