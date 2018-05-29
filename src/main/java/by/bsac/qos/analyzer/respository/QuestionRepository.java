package by.bsac.qos.analyzer.respository;

import by.bsac.qos.analyzer.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, Long> {
}
