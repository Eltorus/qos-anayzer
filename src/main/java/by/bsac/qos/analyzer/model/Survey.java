package by.bsac.qos.analyzer.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(exclude = { "questions"})
@ToString(exclude = { "questions"})
@JsonPropertyOrder(value = {"id"})
@JsonIgnoreProperties(ignoreUnknown = true)
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("name")
    private Long id;
    private String title;

    @OneToMany(mappedBy = "survey", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Question> questions = new LinkedHashSet<>();
}
