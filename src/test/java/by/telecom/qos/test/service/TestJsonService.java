package by.telecom.qos.test.service;

import by.telecom.qos.entity.SurveyItem;
import by.telecom.qos.entity.ItemType;
import by.telecom.qos.entity.Survey;
import by.telecom.qos.service.JsonService;
import by.telecom.qos.service.exception.JsonServiceException;
import by.telecom.qos.test.service.configuration.TestConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;

@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {TestConfiguration.class})
public class TestJsonService {

    @Autowired
    JsonService<Survey> jsonService;
    Survey survey;

    @ClassRule
    public static TemporaryFolder folder = new TemporaryFolder();
    File testFolder;

    private static final String INVALID_RESULT = "{\n"
        + "  \"id\": \"test\",\n"
        + "  \"title\": \"Test Survey\",\n"
        + "  \"items\": [\n"
        + "    {{{\n"
        + "      \"index\": 0,\n"
        + "      \"type\": \"MULTIPLE_CHOICE\",\n"
        + "      \"title\": \"Test Question\",\n"
        + "      \"isRequired\": false,\n"
        + "      \"choices\": [\n"
        + "        \"Answer1\",\n"
        + "        \"Answer2\",\n"
        + "        \"Answer3\",\n"
        + "        \"Answer4\",\n"
        + "        \"Answer5\"\n"
        + "      ]\n"
        + "    }\n"
        + "  ]\n"
        + "}";

    private static final String VALID_RESULT = "{\n"
        + "  \"id\": \"test\",\n"
        + "  \"title\": \"Test Survey\",\n"
        + "  \"items\": [\n"
        + "    {\n"
        + "      \"index\": 0,\n"
        + "      \"type\": \"MULTIPLE_CHOICE\",\n"
        + "      \"title\": \"Test Question\",\n"
        + "      \"isRequired\": false,\n"
        + "      \"choices\": [\n"
        + "        \"Answer1\",\n"
        + "        \"Answer2\",\n"
        + "        \"Answer3\",\n"
        + "        \"Answer4\",\n"
        + "        \"Answer5\"\n"
        + "      ]\n"
        + "    }\n"
        + "  ]\n"
        + "}";

    @Before
    public void initialize() {
        survey = new Survey();
        survey.setId(12L);
        survey.setTitle("Test Survey");

        SurveyItem surveyItem = new SurveyItem();
        surveyItem.setType(ItemType.MULTIPLE_CHOICE);
        surveyItem.setIndex(0);
        surveyItem.setTitle("Test Question");
        surveyItem.setChoices(Arrays.asList("Answer1", "Answer2", "Answer3", "Answer4", "Answer5"));

        survey.setItems(Arrays.asList(surveyItem));

        try {
            testFolder = folder.newFolder();
            jsonService.setFilePath(testFolder.getPath());
        } catch (IOException e) {
            log.error("Error while setting file path: ", e);
        }
    }

    @After
    public void destroy() {
        testFolder.delete();
    }

    @Test
    public void testSuccessToSaveNullJson() throws JsonServiceException {
        jsonService.saveJsonToFile(survey.getId().toString(),null);
        assertEquals(survey.getId() + ".json", testFolder.list()[0]);
    }

    @Test(expected = JsonServiceException.class)
    public void testFailedToSaveNullIDJson() throws JsonServiceException {
        jsonService.saveJsonToFile(null, null);
    }

    @Test
    public void testSuccessSaveJson() throws IOException, JsonServiceException {
        jsonService.saveJsonToFile(survey.getId().toString(), survey);
        assertEquals(survey.getId() + ".json", testFolder.list()[0]);
        File file = testFolder.listFiles()[0];
        assertEquals(FileUtils.readFileToString(file), VALID_RESULT);
    }

    @Test
    public void testSuccessLoadJson() throws JsonServiceException {
        jsonService.saveJsonToFile(survey.getId().toString(), survey);
        Survey result = jsonService.loadJsonFromFile(survey.getId().toString(),Survey.class);
        assertEquals(result, survey);
    }

    @Test(expected = JsonServiceException.class)
    public void testFailedLoadInvalidJson() throws IOException, JsonServiceException {
        FileUtils.writeStringToFile(new File(testFolder.getPath()+"/test.json"),INVALID_RESULT);
        jsonService.loadJsonFromFile("test",Survey.class);
    }

    @Test(expected = JsonServiceException.class)
    public void testFailedToLoadUnknownJson() throws JsonServiceException {
       jsonService.loadJsonFromFile("wrongTest",Survey.class);
    }
}
