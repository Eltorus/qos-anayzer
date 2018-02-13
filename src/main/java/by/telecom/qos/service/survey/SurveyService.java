package by.telecom.qos.service.survey;

import by.telecom.qos.entity.Survey;

import java.util.List;

public interface SurveyService {
    Survey getSurveyById(Long id);
    List<Survey> getSurveyByTitleLike(String title);

    void saveSurvey(Survey survey);
    void saveSurveyResults(Survey survey);
}
