package by.bsac.qos.analyzer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity(name = "row_table")
@Data
@EqualsAndHashCode(exclude = { "question" })
@ToString(exclude = { "question" })
@JsonPropertyOrder(value = { "id" })
public class Row {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("value")
    private Long id;

    @OneToOne
    @JoinColumn(name = "questionId")
    @JsonBackReference(value = "question-row-ref")
    private Question question;
    private String text;
}
