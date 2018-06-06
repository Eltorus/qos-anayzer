var surveys = {
  "Оценка услуг мобильной связи": {
  "name": 1,
  "title": "Сотовая связь",
  "questions": [{
    "type": "matrixdropdown",
    "title": "Показатели качества услуг оператора",
    "name": 1,
    "columns": [{
      "name": 2,
      "title": "Удовлетворенность",
      "choices": [1, 2, 3, 4, 5],
      "cellType": "radiogroup"
    }, {
      "name": 3,
      "title": "Важность",
      "choices": [1, 2, 3, 4, 5],
      "cellType": "radiogroup"
    }],
    "rows": [{
      "text": "Высокая скорость передачи данных при использовании Интернет",
      "value": 4
    }, {
      "text": "Правильность расчета за услуги",
      "value": 5
    }, {
      "text": "Четкость передачи речи в телефонном разговоре",
      "value": 6
    }, {
      "text": "Возможность позвонить в городе",
      "value": 7
    }, {
      "text": "Безлимитный доступ в Интернет за текущую цену тарифного плана",
      "value": 8
    }, {
      "text": "Объем мегабайт, включенных в абонентскую плату",
      "value": 9
    }, {
      "text": "Возможность позвонить при движении по железной дороге",
      "value": 10
    }]
  }, {
    "name": 7,
    "type": "text",
    "title": "Укажите ваш род занятий"
  }, {
    "name": 8,
    "type": "dropdown",
    "title": "Укажите область вашего проживания",
    "choices": ["Минская", "Витебская", "Брестская", "Гродненская", "Гомельская", "Могилевская"]
  }]
},    
"Оценка домашнего интернета": {
  "name": 4,
  "title": "Домашний Интернет",
  "questions": [{
    "type": "matrixdropdown",
    "title": "Показатели качества услуг провайдера",
    "name": 5,
    "columns": [{
      "name": 77,
      "title": "Удовлетворенность",
      "choices": [1, 2, 3, 4, 5],
      "cellType": "radiogroup"
    }, {
      "name": 88,
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
    }]}
    , {
    "name": 7,
    "type": "text",
    "title": "Укажите ваш род занятий"
  }, {
    "name": 8,
    "type": "text",
    "title": "Укажите ваш возраст"
 }]}};

var results = {
  "Оценка услуг мобильной связи": [
    '{"1":{"4":{"2":"4","3":"4"},"5":{"2":"2","3":"3"},"6":{"2":"4","3":"4"},"7":{"2":"2","3":"5"},"8":{"2":"4","3":"4"},"9":{"3":"3"},"10":{"2":"5","3":"5"}},"7":"Инженер","8":"Минская"}'
  ],
  "Оценка домашнего интернета": [
  '{"5":{"6":{"77":"4","88":"3"},"7":{"77":"3","88":"2"},"8":{"77":"5","88":"5"},"101":{"77":"1","88":"4"},"102":{"77":"2","88":"3"}},"7":"Студент","8":"'
  ]
};

module.exports = {
  surveys: surveys,
  results: results
};