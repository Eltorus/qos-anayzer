package by.bsac.qos.analyzer.util;

import by.bsac.qos.analyzer.model.Question;
import by.bsac.qos.analyzer.model.QuestionType;
import by.bsac.qos.analyzer.model.Survey;
import org.springframework.stereotype.Service;

@Service
public class SurveyValidator {

    public boolean isSurveyValid(Survey survey) {
        if (survey.getQuestions().isEmpty()|| survey.getTitle().isEmpty()) {
            return false;
        }
        return survey.getQuestions().stream().anyMatch(this::isMatrixDropdownQuestionValid);
    }

    private boolean isMatrixDropdownQuestionValid(Question question) {
        return question.getType() != QuestionType.MATRIX_DROPDOWN || !question.getRows().isEmpty();
    }
}
