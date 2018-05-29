package by.bsac.qos.analyzer.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ServqualCriterion {
    IMPORTANCE(1L, "importance"),
    CONTENTMENT(2L, "contentment");

    @Getter
    private Long id;

    @Getter
    private String title;

    public static ServqualCriterion valueOfId(Long id) {
        for (ServqualCriterion value : ServqualCriterion.values()) {
            if (value.id.equals(id)) {
                return value;
            }
        }
        throw new IllegalArgumentException("No enum constant " + ServqualCriterion.class.getCanonicalName() +
                "." + id);
    }
}
