package by.telecom.qos.service.exception;

public class SurveyServiceException extends RuntimeException {

    public SurveyServiceException() {
    }

    public SurveyServiceException(String message) {
        super(message);
    }

    public SurveyServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public SurveyServiceException(Throwable cause) {
        super(cause);
    }

    public SurveyServiceException(
        String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
