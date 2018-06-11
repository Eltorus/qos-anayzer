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

function SurveyManager(baseUrl, accessKey) {
    var self = this;
    self.surveyId = decodeURI(getParams()["id"]);
    self.results = [];
    Survey.dxSurveyService.serviceUrl = "";
    var survey = new Survey.Model({
        surveyId: self.surveyId,
        surveyPostId: self.surveyId
    });
    self.columns = [];

    self.loadResults = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", baseUrl + "/results?postId=" + self.surveyId);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            var result = xhr.response ? JSON.parse(xhr.response) : [];
            var convertedresult = [];
            Object.keys(result).forEach(function (date) {
                console.log(date);
                convertedresult.push(date);
            });
            convertedresult.forEach(function (q) {
                self.results.push(q);
            });

            self.columns.push(
                {
                    data: "Дата прохождения теста",
                    sTitle: "Дата прохождения теста",
                    mRender: function (data, type, row) {
                        return JSON.stringify(row);
                    }
                });
            self.columns.push({
                targets: -1,
                data: null,
                sortable: false,
                defaultContent:
                    "<button style='min-width: 150px;'>Показать в опросе</button>"
            });
            var table = $("#resultsTable").DataTable({
                columns: self.columns,
                data: self.results
            });

            var json = new Survey.JsonObject().toJsonObject(survey);
            var windowSurvey = new Survey.SurveyWindow(json);
            windowSurvey.survey.mode = "display";
            windowSurvey.survey.title = self.surveyId;


            $(document).on("click", "#resultsTable td", function(e) {
                console.log(result[table.row(this).data()]);
                windowSurvey.survey.data = result[table.row(this).data()];
                windowSurvey.isExpanded = true;
                windowSurvey.show();
                $(".closeSurveyResult").css({'display': 'inline-block'});
            });

            $(document).on("click", ".closeSurveyResult", function (e) {
                windowSurvey.isExpanded = false;
                windowSurvey.hide();
                $(".closeSurveyResult").css({'display': 'none'});
            });
        };
        xhr.send();
    };

    survey.onLoadSurveyFromService = function () {
        self.loadResults();
    };
}

ko.applyBindings(new SurveyManager(""), document.body);
