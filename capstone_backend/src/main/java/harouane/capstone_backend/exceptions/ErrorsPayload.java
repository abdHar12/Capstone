package harouane.capstone_backend.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
public class ErrorsPayload {
    private String message;
    private String time;

    public ErrorsPayload(String message, LocalDate time) {
        this.message = message;
        this.time = time.toString(); // Converti LocalDate in String
    }
}
