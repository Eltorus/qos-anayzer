package by.telecom.qos.entity;

import lombok.Data;

import java.util.List;

@Data
public class Survey {
    Long id;

    String title;

    List<SurveyItem> items;
}
