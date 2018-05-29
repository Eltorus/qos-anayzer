package by.bsac.qos.analyzer.util;

import javax.persistence.AttributeConverter;

import by.bsac.qos.analyzer.model.ServqualCriterion;

public class ServqualCriterionConverter implements AttributeConverter<ServqualCriterion, Long> {

    @Override
    public Long convertToDatabaseColumn(ServqualCriterion attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getId();
    }

    @Override
    public ServqualCriterion convertToEntityAttribute(Long id) {
        if(id == null) {
            return null;
        }
        return ServqualCriterion.valueOfId(id);
    }
}
