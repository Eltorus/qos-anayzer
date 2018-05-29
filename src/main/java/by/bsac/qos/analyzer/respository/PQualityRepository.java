package by.bsac.qos.analyzer.respository;

import by.bsac.qos.analyzer.model.PQuality;
import by.bsac.qos.analyzer.model.Row;
import org.springframework.data.repository.CrudRepository;

public interface PQualityRepository extends CrudRepository<PQuality, Row> {
}
