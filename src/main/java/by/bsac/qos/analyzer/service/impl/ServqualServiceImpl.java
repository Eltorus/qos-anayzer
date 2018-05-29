package by.bsac.qos.analyzer.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import by.bsac.qos.analyzer.model.Answer;
import by.bsac.qos.analyzer.model.ImportanceCoefficientValues;
import by.bsac.qos.analyzer.model.PQuality;
import by.bsac.qos.analyzer.model.Question;
import by.bsac.qos.analyzer.model.Response;
import by.bsac.qos.analyzer.model.Row;
import by.bsac.qos.analyzer.model.ServqualCriterion;
import by.bsac.qos.analyzer.respository.ImportanceCoefficientRepository;
import by.bsac.qos.analyzer.respository.PQualityRepository;
import by.bsac.qos.analyzer.service.ServqualService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServqualServiceImpl implements ServqualService {

    private ImportanceCoefficientRepository importanceCoefficientRepository;
    private PQualityRepository pQualityRepository;

    public ServqualServiceImpl(ImportanceCoefficientRepository importanceCoefficientRepository,
                               PQualityRepository pQualityRepository) {
        this.importanceCoefficientRepository = importanceCoefficientRepository;
        this.pQualityRepository = pQualityRepository;
    }

    @Override
    @Transactional
    public void saveServqualResult(Question question, Response response) {
        question.getRows().forEach(row -> {
                    List<Answer> answerList = response.getAnswers().stream()
                            .filter(answer -> answer.getRow() != null && answer.getRow().equals(row))
                            .collect(Collectors.toList());
                    answerList.stream()
                            .filter(answer -> answer.getServqualCriterion() == ServqualCriterion.IMPORTANCE)
                            .forEach(this::saveImportanceCoefficientInners);

                    List<Answer> contentmentAnswers = answerList.stream()
                            .filter(answer -> answer.getServqualCriterion() == ServqualCriterion.CONTENTMENT)
                            .collect(Collectors.toList());

                    calculatePQ(response, contentmentAnswers);
                }
        );
    }

    @Override
    public Double calculateImportanceCoefficient(Row row) {
        ImportanceCoefficientValues icv = importanceCoefficientRepository.findByRowId(row.getId())
                .orElseThrow(() -> new IllegalArgumentException("Unknown value"));

        return (icv.getCountFives() + 0.5 * icv.getCountFours() - 0.5 * icv.getCountTwos() - icv.getCountOnes()) /
                (icv.getCountFives() + icv.getCountFours() + icv.getCountThrees() + icv.getCountTwos() + icv.getCountOnes());
    }

    @Override
    public Double calculateAverageContentment(ImportanceCoefficientValues icv) {
        return (5.0 * icv.getCountFives() +
                4 * icv.getCountFours() +
                3 * icv.getCountThrees() +
                2 * icv.getCountTwos() +
                icv.getCountOnes()) /
                (icv.getCountFives() +
                        icv.getCountFours() +
                        icv.getCountThrees() +
                        icv.getCountTwos() +
                        icv.getCountOnes());
    }

    @Transactional
    public void saveImportanceCoefficientInners(Answer answer) {
        ImportanceCoefficientValues icv = importanceCoefficientRepository.findByRowId(answer.getRow().getId())
                .orElseGet(ImportanceCoefficientValues::new);
        countValuesForImportanceCoefficient(icv, Integer.parseInt(answer.getValue()));
        icv.setAverageContentment(calculateAverageContentment(icv));
        icv.setRow(answer.getRow());
        importanceCoefficientRepository.save(icv);
    }

    private void countValuesForImportanceCoefficient(ImportanceCoefficientValues icv, Integer integer) {
        switch (integer) {
            case 1:
                icv.setCountOnes(icv.getCountOnes() + 1);
                break;
            case 2:
                icv.setCountTwos(icv.getCountTwos() + 1);
                break;
            case 3:
                icv.setCountThrees(icv.getCountThrees() + 1);
                break;
            case 4:
                icv.setCountFours(icv.getCountFours() + 1);
                break;
            case 5:
                icv.setCountFives(icv.getCountFives() + 1);
                break;
            default:
                throw new IllegalArgumentException("Unknown value");
        }
    }

    @Override
    @Transactional
    public PQuality calculatePQ(Response response, List<Answer> contentmentAnswers) {
        PQuality pQuality = new PQuality();
        pQuality.setResponse(response);
        double result = contentmentAnswers.stream()
                .mapToDouble(answer -> (calculateImportanceCoefficient(
                        answer.getRow()) * Integer.parseInt(answer.getValue()) - 5))
                .sum();
        pQuality.setValue(result);
        return pQualityRepository.save(pQuality);
    }
}
