package by.telecom.qos.service;

import by.telecom.qos.service.exception.JsonServiceException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.PostConstruct;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Slf4j
public class JsonService<T> {

    @Getter @Setter
    private String filePath;
    private Gson gson;

    @PostConstruct
    void init() {
        gson = new GsonBuilder().setPrettyPrinting().create();
    }

    public void saveJsonToFile(String id, T object) throws JsonServiceException {
        if(isBlank(id)) {
            throw new JsonServiceException("ID of file must not be null");
        }

        String path = formPath(id);
        try (FileWriter fileWriter = new FileWriter(path)) {
            fileWriter.write(gson.toJson(object));
            log.debug("Successful creating file on path: " + path);
        } catch (IOException e) {
            log.error("Error during saving json: ", e);
            throw new JsonServiceException(e);
        }
    }

    public T loadJsonFromFile(String id, @NonNull Class<T> clazz) throws JsonServiceException {
        if(isBlank(id)) {
            throw new JsonServiceException("ID of file or class must not be null");
        }

        try {
            FileReader reader = new FileReader(formPath(id));
            return gson.fromJson(reader, clazz);
        } catch (JsonSyntaxException e) {
            log.error("Error during loading (invalid json): ", e);
            throw new JsonServiceException(e);
        } catch (IOException e) {
            log.error("Error during loading: ", e);
            throw new JsonServiceException(e);
        }
    }

    private String formPath(String id) {
        return filePath + "/" + id + ".json";
    }
}
