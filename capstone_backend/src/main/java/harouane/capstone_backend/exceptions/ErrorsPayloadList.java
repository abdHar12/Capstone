package harouane.capstone_backend.exceptions;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ErrorsPayloadList extends ErrorsPayload{
    private List<String> errorList;

    public ErrorsPayloadList(String message, LocalDate time, List<String> errorList) {
        super(message, time);
        this.errorList = errorList;
    }
}
