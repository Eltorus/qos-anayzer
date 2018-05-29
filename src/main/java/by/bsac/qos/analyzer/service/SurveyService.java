package by.bsac.qos.analyzer.service;

import by.bsac.qos.analyzer.model.Survey;

public interface SurveyService {
    void saveSurvey(Survey survey);
    Survey getSurvey(Long id);
}
