package harouane.capstone_backend.exceptions;

import lombok.Getter;
import org.springframework.validation.ObjectError;

import java.util.List;

@Getter
public class BadRequestException extends RuntimeException{

    private List<ObjectError> errorList;
    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(List<ObjectError> errorList){
        super("Errori nel payload");
        this.errorList = errorList;
    }
}
