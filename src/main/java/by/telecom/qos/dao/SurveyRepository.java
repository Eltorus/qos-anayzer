package by.telecom.qos.dao;

import by.telecom.qos.entity.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SurveyRepository extends MongoRepository<Survey, Long> {

    List<Survey> findSurveyByTitleLike(String title);
}
