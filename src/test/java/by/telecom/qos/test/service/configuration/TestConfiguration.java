package by.telecom.qos.test.service.configuration;

import by.telecom.qos.entity.Survey;
import by.telecom.qos.service.JsonService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfiguration {

    @Bean
    public JsonService<Survey> jsonService() {
        return new JsonService<>();
    }
}
