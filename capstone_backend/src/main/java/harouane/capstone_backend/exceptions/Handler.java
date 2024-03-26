package harouane.capstone_backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class Handler {

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsPayload handle400(BadRequestException bd){
        if (!bd.getErrorList().isEmpty()){
            List<String> errorList = bd.getErrorList().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
            return new ErrorsPayloadList(bd.getMessage(), LocalDate.now(), errorList);
        }else {
        return new ErrorsPayload(bd.getMessage(), LocalDate.now());
        }
    }

    @ExceptionHandler(UnauthorizedException.class)
    // Con questa annotazione indico che questo metodo gestirà le eccezioni di tipo UnauthorizedException
    @ResponseStatus(HttpStatus.UNAUTHORIZED) // 401
    public ErrorsPayload handleUnauthorized(UnauthorizedException ex) {

        System.out.println(ex.getMessage());

        return new ErrorsPayload(ex.getMessage(), LocalDate.now());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorsPayload handle403(AccessDeniedException ex){
        return new ErrorsPayload("Non hai accesso a questo endpoint", LocalDate.now());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorsPayload handle404(NotFoundException nt){
        return new ErrorsPayload(nt.getMessage(), LocalDate.now());
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorsPayload generics500(Exception ex){
        ex.printStackTrace();
        return new ErrorsPayload("Problema lato Server!!", LocalDate.now());
    }
}
