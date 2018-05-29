package by.bsac.qos.analyzer.controller;

import java.util.List;

import by.bsac.qos.analyzer.model.Survey;
import by.bsac.qos.analyzer.model.dto.QuestionTO;
import by.bsac.qos.analyzer.model.dto.ResponseTO;
import by.bsac.qos.analyzer.service.ResponseService;
import by.bsac.qos.analyzer.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SurveyController {

    private SurveyService surveyService;
    private ResponseService responseService;

    @Autowired
    public SurveyController(SurveyService surveyService, ResponseService responseService) {
        this.surveyService = surveyService;
        this.responseService = responseService;
    }

    @GetMapping(path = "/survey/{id}")
    public Survey getSurvey(@PathVariable Long id) {
        return surveyService.getSurvey(id);
    }

    @PutMapping(path = "/survey")
    public ResponseEntity saveSurvey(@RequestBody Survey survey) {
        surveyService.saveSurvey(survey);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/survey/{id}/response")
    public ResponseEntity saveResponse(@PathVariable Long id, @RequestBody List<QuestionTO> questions) {
        ResponseTO responseTO = new ResponseTO();
        responseTO.setSurveyId(id);
        responseTO.setQuestions(questions);

        responseService.saveResponse(responseTO);
        return ResponseEntity.ok().build();
    }

}
