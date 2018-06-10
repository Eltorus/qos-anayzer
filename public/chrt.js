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

            displatCharts(data, monthLabels);
        }
    };
    xhr.send();
}

function displatCharts(data, monthLabels) {

    var ctx = document.getElementById("myChart");

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
                data: data,
            }
        ]
    };

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });

    var ctx = document.getElementById("myPieChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: [12, 19, 3, 17, 28, 24, 7]
            }]
        }
    });
}

init();
