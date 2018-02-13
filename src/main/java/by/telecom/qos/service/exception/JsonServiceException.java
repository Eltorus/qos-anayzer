package by.telecom.qos.service.exception;

public class JsonServiceException extends RuntimeException {

    public JsonServiceException() {
        super();
    }

    public JsonServiceException(String message) {
        super(message);
    }

    public JsonServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public JsonServiceException(Throwable cause) {
        super(cause);
    }

    protected JsonServiceException(
        String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
