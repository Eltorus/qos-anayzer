package by.bsac.qos.analyzer.service;

import java.util.List;

import by.bsac.qos.analyzer.model.Answer;
import by.bsac.qos.analyzer.model.ImportanceCoefficientValues;
import by.bsac.qos.analyzer.model.PQuality;
import by.bsac.qos.analyzer.model.Question;
import by.bsac.qos.analyzer.model.Response;
import by.bsac.qos.analyzer.model.Row;

public interface ServqualService {
    abstract void saveServqualResult(Question question, Response response);

    Double calculateImportanceCoefficient(Row row);

    Double calculateAverageContentment(ImportanceCoefficientValues icv);

    PQuality calculatePQ(Response response, List<Answer> contentmentAnswers);
}
