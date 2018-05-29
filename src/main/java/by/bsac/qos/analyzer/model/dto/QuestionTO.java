package by.bsac.qos.analyzer.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class QuestionTO {
    private Long id;
    private List <RowTO> rows;
    private String answer;
}
