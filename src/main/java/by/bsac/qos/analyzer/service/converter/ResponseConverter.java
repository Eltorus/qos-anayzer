package by.bsac.qos.analyzer.service.converter;

import by.bsac.qos.analyzer.model.Response;
import by.bsac.qos.analyzer.model.dto.ResponseTO;

public interface ResponseConverter {
    Response convertFrom(ResponseTO responseTO);
}
