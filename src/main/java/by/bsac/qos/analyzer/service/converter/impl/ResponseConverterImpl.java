package by.bsac.qos.analyzer.service.converter.impl;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import by.bsac.qos.analyzer.model.Answer;
import by.bsac.qos.analyzer.model.Question;
import by.bsac.qos.analyzer.model.QuestionType;
import by.bsac.qos.analyzer.model.Response;
import by.bsac.qos.analyzer.model.Row;
import by.bsac.qos.analyzer.model.ServqualCriterion;
import by.bsac.qos.analyzer.model.dto.QuestionTO;
import by.bsac.qos.analyzer.model.dto.ResponseTO;
import by.bsac.qos.analyzer.model.dto.RowTO;
import by.bsac.qos.analyzer.respository.QuestionRepository;
import by.bsac.qos.analyzer.respository.RowRepository;
import by.bsac.qos.analyzer.service.SurveyService;
import by.bsac.qos.analyzer.service.converter.ResponseConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResponseConverterImpl implements ResponseConverter {
    private SurveyService surveyService;
    private RowRepository rowRepository;
    private QuestionRepository questionRepository;

    @Autowired
    public ResponseConverterImpl(SurveyService surveyService,
                                 RowRepository rowRepository,
                                 QuestionRepository questionRepository) {
        this.surveyService = surveyService;
        this.rowRepository = rowRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public Response convertFrom(ResponseTO responseTO) {
        Response result = new Response();
        result.setSurvey(surveyService.getSurvey(responseTO.getSurveyId()));
        result.setAnswers(createAnswer(responseTO));
        result.getAnswers().forEach(answer -> answer.setResponse(result));
        return result;
    }

    public Set<Answer> createAnswer(ResponseTO responseTO) {
        Set<Answer> result = new LinkedHashSet<>();
        responseTO.getQuestions().forEach(questionTO -> {
                    if(getQuestion(questionTO.getId()).getType() != QuestionType.MATRIX_DROPDOWN) {
                        result.add(createAnswerFromQuestion(questionTO));
                    }
                    if(questionTO.getRows() != null) {
                        questionTO.getRows().forEach(rowTO -> result.addAll(createAnswerFromRow(rowTO, questionTO.getId())));
                    }
                }
        );
        return result;
    }

    private Answer createAnswerFromQuestion(QuestionTO questionTO) {
        Answer answer = new Answer();
        answer.setValue(questionTO.getAnswer());
        answer.setQuestion(getQuestion(questionTO.getId()));
        //TODO: if dropdown check for legimitate answer
        return answer;
    }

    private List<Answer> createAnswerFromRow(RowTO rowTO, Long questionId) {
        Answer answerImportance = new Answer();
        answerImportance.setRow(getRow(rowTO.getId()));
        answerImportance.setQuestion(getQuestion(questionId));
        answerImportance.setServqualCriterion(ServqualCriterion.IMPORTANCE);
        answerImportance.setValue(rowTO.getImportance());

        Answer answerContentment = new Answer();
        answerContentment.setRow(getRow(rowTO.getId()));
        answerContentment.setQuestion(getQuestion(questionId));
        answerContentment.setServqualCriterion(ServqualCriterion.CONTENTMENT);
        answerContentment.setValue(rowTO.getContentment());
        return Arrays.asList(answerImportance, answerContentment);
    }

    public Row getRow(Long id) {
        return rowRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Unknown row requested"));
    }

    public Question getQuestion(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Unknown offer " + id +
                " has been requested"));
    }
}
