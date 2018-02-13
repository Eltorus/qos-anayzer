package by.telecom.qos.dao;

import by.telecom.qos.entity.SurveyResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SurveyResultRepository extends MongoRepository<SurveyResult, Long> {

}
