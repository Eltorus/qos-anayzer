package by.bsac.qos.analyzer.util;

import javax.persistence.AttributeConverter;

import by.bsac.qos.analyzer.model.QuestionType;

public class QuestionTypeConverter implements AttributeConverter<QuestionType, Long> {
    @Override
    public Long convertToDatabaseColumn(QuestionType attribute) {
        return attribute.getId();
    }

    @Override
    public QuestionType convertToEntityAttribute(Long id) {
        return QuestionType.valueOfId(id);
    }
}
