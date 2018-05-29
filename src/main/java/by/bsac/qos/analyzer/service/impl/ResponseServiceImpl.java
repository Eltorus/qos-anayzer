package by.bsac.qos.analyzer.service.impl;

import by.bsac.qos.analyzer.model.QuestionType;
import by.bsac.qos.analyzer.model.Response;
import by.bsac.qos.analyzer.model.Survey;
import by.bsac.qos.analyzer.model.dto.ResponseTO;
import by.bsac.qos.analyzer.respository.ResponseRepository;
import by.bsac.qos.analyzer.service.ResponseService;
import by.bsac.qos.analyzer.service.ServqualService;
import by.bsac.qos.analyzer.service.SurveyService;
import by.bsac.qos.analyzer.service.converter.ResponseConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ResponseServiceImpl implements ResponseService {

    private ServqualService servqualService;
    private SurveyService surveyService;
    private ResponseRepository responseRepository;
    private ResponseConverter responseConverter;

    public ResponseServiceImpl(ServqualService servqualService,
                               SurveyService surveyService,
                               ResponseRepository responseRepository,
                               ResponseConverter responseConverter) {
        this.servqualService = servqualService;
        this.surveyService = surveyService;
        this.responseRepository = responseRepository;
        this.responseConverter = responseConverter;
    }

    @Override
    @Transactional
    public void saveResponse(ResponseTO responseTO) {
        Response response = responseConverter.convertFrom(responseTO);
        responseRepository.save(response);
        Survey survey = surveyService.getSurvey(response.getSurvey().getId());

        survey.getQuestions()
                .stream()
                .filter(question -> question.getType() == QuestionType.MATRIX_DROPDOWN)
                .forEach(q -> servqualService.saveServqualResult(q, response));
        //TODO: add validation

    }
}
