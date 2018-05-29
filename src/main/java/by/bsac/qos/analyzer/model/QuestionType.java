package by.bsac.qos.analyzer.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum QuestionType {
    @JsonProperty("matrixdropdown")
    MATRIX_DROPDOWN(1L, "matrixdropdown"),

    @JsonProperty("text")
    TEXT(2L, "text"),

    @JsonProperty("dropdown")
    DROPDOWN(3L, "dropdown"),

    @JsonProperty("radiogroup")
    RADIO_GROUP(4L, "radiogroup");

    @Getter
    private Long id;

    @Getter
    private String value;

    public static QuestionType valueOfId(Long id) {
        for (QuestionType value : QuestionType.values()) {
            if (value.id.equals(id)) {
                return value;
            }
        }
        throw new IllegalArgumentException("No enum constant " + QuestionType.class.getCanonicalName() +
                "." + id);
    }
}
