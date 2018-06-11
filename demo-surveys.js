var surveys = {
    "Оценка услуг мобильной связи": {
        "name": 1,
        "title": "Сотовая связь",
        "questions": [{
            "type": "matrixdropdown",
            "isRequired": "true",
            "title": "Показатели качества услуг оператора",
            "name": "aa1",
            "columns": [{
                "name": "contentment",
                "title": "Удовлетворенность",
                "choices": [1, 2, 3, 4, 5],
                "cellType": "radiogroup"
            }, {
                "name": "importance",
                "title": "Важность",
                "choices": [1, 2, 3, 4, 5],
                "cellType": "radiogroup"
            }],
            "rows": [{
                "text": "Высокая скорость передачи данных при использовании Интернет",
                "value": "aa14"
            }, {
                "text": "Правильность расчета за услуги",
                "value": "aa15"
            }, {
                "text": "Четкость передачи речи в телефонном разговоре",
                "value": "aa16"
            }, {
                "text": "Возможность позвонить в городе",
                "value": "aa17"
            }, {
                "text": "Безлимитный доступ в Интернет за текущую цену тарифного плана",
                "value": "aa18"
            }, {
                "text": "Объем мегабайт, включенных в абонентскую плату",
                "value": "aa19"
            }, {
                "text": "Возможность позвонить при движении по железной дороге",
                "value": "aa110"
            }]
        }, {
            "name": "age",
            "type": "text",
            "isRequired": "true",
            "title": "Укажите ваш возраст",
            "validators": [
                {
                    "type": "numeric",
                    "minValue": 0,
                    "maxValue": 150
                }
            ]
        }, {
            "name": "location",
            "type": "dropdown",
            "isRequired": "true",
            "title": "Укажите область вашего проживания",
            "choices": ["Минская", "Витебская", "Брестская", "Гродненская", "Гомельская", "Могилевская"]
        }]
    },
    "Оценка домашнего интернета": {
        "name": 4,
        "title": "Домашний Интернет",
        "questions": [{
            "type": "matrixdropdown",
            "isRequired": "true",
            "title": "Показатели качества услуг провайдера",
            "name": 5,
            "columns": [{
                "name": "contentment",
                "title": "Удовлетворенность",
                "choices": [1, 2, 3, 4, 5],
                "cellType": "radiogroup"
            }, {
                "name": "importance",
                "title": "Важность",
                "choices": [1, 2, 3, 4, 5],
                "cellType": "radiogroup"
            }],
            "rows": [{
                "text": "Высокая скорость",
                "value": 101
            }, {
                "text": "Бонусы",
                "value": 102
            }, {
                "text": "Четкость видеосвязи",
                "value": 6
            }, {
                "text": "Возможность обещанного платежа",
                "value": 7
            }, {
                "text": "Безлимитный доступ в Интернет за текущую цену тарифного плана",
                "value": 8
            }]
        }, {
            "name": "location",
            "type": "dropdown",
            "isRequired": "true",
            "title": "Укажите область вашего проживания",
            "choices": ["Минская", "Витебская", "Брестская", "Гродненская", "Гомельская", "Могилевская"]
        }, {
            "name": "age",
            "isRequired": "true",
            "type": "text",
            "title": "Укажите ваш возраст",
            "validators": [
                {
                    "type": "numeric",
                    "minValue": 0,
                    "maxValue": 150
                }
            ]
        }]
    }
};

var results = {
    "Оценка услуг мобильной связи":
        {
            "Sun Jun 10 2018 19:57:05 GMT+0300 (Belarus Standard Time)": {
                "aa1": {
                    "aa14": {"importance": "4", "contentment": "4"},
                    "aa15": {"importance": "2", "contentment": "3"},
                    "aa16": {"importance": "4", "contentment": "4"},
                    "aa17": {"importance": "2", "contentment": "5"},
                    "aa18": {"importance": "4", "contentment": "4"},
                    "aa19": {"3": "3"},
                    "aa110": {"2": "5", "3": "5"}
                }, "age": "20", "location": "Минская"
            }
        },
    "Оценка домашнего интернета":
        {
            "Sun Jun 10 2018 19:57:07 GMT+0300 (Belarus Standard Time)": {
                "5": {
                    "6": {"importance": "4", "contentment": "3"},
                    "7": {"importance": "3", "contentment": "2"},
                    "8": {"importance": "5", "contentment": "5"},
                    "101": {"importance": "1", "contentment": "4"},
                    "102": {"importance": "2", "contentment": "3"}
                }, "age": "35", "location": "Минская"
            }
        }
};

var servqual = {
    "Оценка услуг мобильной связи": {
        "4.2018": {
            "aa14": {"w1": 0, "w2": 4, "w3": 0, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 8}},
            "aa15": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 8}},
            "aa16": {"w1": 0, "w2": 0, "w3": 0, "w4": 4, "w5": 0, "contentment": {"count": 4, "value": 12}},
            "aa17": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 16}},
            "aa18": {"w1": 0, "w2": 0, "w3": 0, "w4": 0, "w5": 4, "contentment": {"count": 4, "value": 16}},
            "aa19": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 12}},
            "aa110": {"w1": 0, "w2": 0, "w3": 0, "w4": 0, "w5": 4, "contentment": {"count": 4, "value": 20}}
        },
        "5.2018": {
            "aa14": {"w1": 0, "w2": 4, "w3": 0, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 8}},
            "aa15": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 8}},
            "aa16": {"w1": 0, "w2": 0, "w3": 0, "w4": 4, "w5": 0, "contentment": {"count": 4, "value": 12}},
            "aa17": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 16}},
            "aa18": {"w1": 0, "w2": 0, "w3": 0, "w4": 0, "w5": 4, "contentment": {"count": 4, "value": 16}},
            "aa19": {"w1": 0, "w2": 0, "w3": 4, "w4": 0, "w5": 0, "contentment": {"count": 4, "value": 12}},
            "aa110": {"w1": 0, "w2": 0, "w3": 0, "w4": 0, "w5": 4, "contentment": {"count": 4, "value": 20}}
        }
    }
};

module.exports = {
    surveys: surveys,
    results: results,
    servqual: servqual
};
