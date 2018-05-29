package by.bsac.qos.analyzer.model;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import by.bsac.qos.analyzer.util.ServqualCriterionConverter;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(exclude = { "response"})
@ToString(exclude = { "response"})
@JsonPropertyOrder(value = { "id" })
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "responseId")
    private Response response;

    @OneToOne
    @JoinColumn(name = "questionId")
    private Question question;

    @Convert(converter = ServqualCriterionConverter.class)
    private ServqualCriterion servqualCriterion;

    @OneToOne
    @JoinColumn(name = "rowId")
    private Row row;
    private String value;
}
