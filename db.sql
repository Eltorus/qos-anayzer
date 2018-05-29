CREATE TABLE survey
(
    id BIGINT,
    title CHARACTER VARYING(255)
);

CREATE TABLE question_type
(
    id BIGINT,
    value CHARACTER VARYING(255)
);

CREATE TABLE question
(
    id BIGINT,
    value CHARACTER VARYING(255),
    survey_id BIGINT,
    order_number INT,
    type_id BIGINT,
    choices  text[],
    CONSTRAINT survey_fk FOREIGN KEY (survey_id) REFERENCES survey (id),
    CONSTRAINT type_fk FOREIGN KEY (type_id) REFERENCES question_type (id)
);

CREATE TABLE column
(
    id BIGINT,
    question_id BIGINT,
    order_number INT,
    title CHARACTER VARYING(255),
    CONSTRAINT question_fk FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE row
(
    id BIGINT,
    question_id BIGINT,
    order_number INT,
    title CHARACTER VARYING(255),
    CONSTRAINT question_fk FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE category_product_cache_offer_update
(
    id BIGSERIAL,
    offer_id BIGINT,
    master_category_id BIGINT,
    mapped_category_id BIGINT,
    CONSTRAINT offer__fk FOREIGN KEY (offer_id) REFERENCES offer (id),
    CONSTRAINT master_category__fk FOREIGN KEY (master_category_id) REFERENCES category (id),
    CONSTRAINT mapped_category__fk FOREIGN KEY (mapped_category_id) REFERENCES category (id)
);


createdb --userename=root --port=8778 qos
