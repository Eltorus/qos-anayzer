package by.telecom.qos.service.survey;

import by.telecom.qos.dao.SurveyRepository;
import by.telecom.qos.entity.Survey;
import by.telecom.qos.service.exception.SurveyServiceException;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    SurveyRepository surveyRepository;

    @Override
    public Survey getSurveyById(@NonNull Long id) {
        return surveyRepository.findOne(id);
    }

    @Override
    public List<Survey> getSurveyByTitleLike(String title) {
        if(isBlank(title)) {
            throw new SurveyServiceException("Survey title must not be blank");
        }

        return surveyRepository.findSurveyByTitleLike(title);
    }

    @Override
    public void saveSurveyResults(Survey survey) {
    }

    @Override
    public void saveSurvey(@NonNull Survey survey) {
        surveyRepository.save(survey);
    }
}
