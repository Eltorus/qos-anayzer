package by.bsac.qos.analyzer.model;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import by.bsac.qos.analyzer.util.QuestionTypeConverter;
import by.bsac.qos.analyzer.util.StringListConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(exclude = { "survey", "choices", "rows" })
@ToString(exclude = { "survey", "choices", "rows" })
@JsonPropertyOrder(value = { "id" })
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("name")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "surveyId")
    @JsonBackReference
    private Survey survey;
    private String title;

    @Convert(converter = QuestionTypeConverter.class)
    private QuestionType type;

    @javax.persistence.Column
    @Convert(converter = StringListConverter.class)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<String> choices = new ArrayList<>();

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "question-row-ref")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Row> rows = new LinkedHashSet<>();
}
