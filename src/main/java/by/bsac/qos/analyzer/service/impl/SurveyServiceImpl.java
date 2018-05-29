package by.bsac.qos.analyzer.service.impl;

import by.bsac.qos.analyzer.model.Survey;
import by.bsac.qos.analyzer.respository.SurveyRepository;
import by.bsac.qos.analyzer.service.SurveyService;
import by.bsac.qos.analyzer.util.SurveyValidator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SurveyServiceImpl implements SurveyService {

    private SurveyRepository surveyRepository;
    private SurveyValidator surveyValidator;

    public SurveyServiceImpl(SurveyRepository surveyRepository,
                             SurveyValidator surveyValidator) {
        this.surveyRepository = surveyRepository;
        this.surveyValidator = surveyValidator;
    }

    @Override
    @Transactional
    public void saveSurvey(Survey survey) {
        if (!surveyValidator.isSurveyValid(survey)) {
            throw new IllegalArgumentException("Survey validation error");
        }
        surveyRepository.save(survey);
    }

    @Override
    @Transactional
    public Survey getSurvey(Long id) {
        return surveyRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Unknown survey requested"));
    }
}
