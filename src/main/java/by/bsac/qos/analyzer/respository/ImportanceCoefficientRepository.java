package by.bsac.qos.analyzer.respository;

import javax.persistence.LockModeType;
import java.util.Optional;

import by.bsac.qos.analyzer.model.ImportanceCoefficientValues;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.CrudRepository;

public interface ImportanceCoefficientRepository extends CrudRepository<ImportanceCoefficientValues, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<ImportanceCoefficientValues> findByRowId(Long id);
}
