package by.telecom.qos.controller;

import by.telecom.qos.entity.Survey;
import by.telecom.qos.service.survey.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class SurveyController {

    @Autowired
    SurveyService surveyService;

    @RequestMapping(value = "/survey/{id}", method = RequestMethod.GET)
    public @ResponseBody Survey getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id);
    }

    @RequestMapping(value = "/survey", method = RequestMethod.GET)
    public @ResponseBody List<Survey> getSurveyByTitle(@RequestParam String title) {
        return surveyService.getSurveyByTitleLike(title);
    }

    @RequestMapping(value="/survey", method = RequestMethod.POST)
    public @ResponseBody ResponseEntity addSurvey(@RequestBody Survey survey) {
        surveyService.saveSurvey(survey);
        return new ResponseEntity(HttpStatus.OK);
    }
}
