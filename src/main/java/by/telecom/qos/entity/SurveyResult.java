package by.telecom.qos.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
public class SurveyResult {
    Long id;

    Long surveyId;

    Date date;

    Map<Integer, List<String>> answers;
}
