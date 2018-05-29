package by.bsac.qos.analyzer.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class ResponseTO {
    private Long surveyId;
    private List<QuestionTO> questions;
}
