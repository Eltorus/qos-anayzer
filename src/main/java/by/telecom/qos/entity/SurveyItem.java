package by.telecom.qos.entity;

import lombok.Data;

import java.util.List;

@Data
public class SurveyItem {
    int index;

    ItemType type;

    String title;

    boolean isRequired;

    List<String> choices;

    String leftLabel;

    String rightLabel;

    String upperBound;

    String lowerBound;
}
