package by.bsac.qos.analyzer.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "icv")
@Data
@EqualsAndHashCode(exclude = { "row" })
@ToString(exclude = { "row" })
public class ImportanceCoefficientValues {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "rowId")
    private Row row;

    private Double averageContentment;

    private Integer countFives;
    private Integer countFours;
    private Integer countThrees;
    private Integer countTwos;
    private Integer countOnes;

    public ImportanceCoefficientValues() {
        countFives = 0;
        countFours = 0;
        countThrees = 0;
        countTwos = 0;
        countOnes = 0;
    }
}
