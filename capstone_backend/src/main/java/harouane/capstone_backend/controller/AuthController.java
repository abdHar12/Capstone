package harouane.capstone_backend.controller;


import harouane.capstone_backend.DTO.LoginDTO;
import harouane.capstone_backend.DTO.UserDTO;
import harouane.capstone_backend.DTO.UserLoginDTO;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.exceptions.BadRequestException;
import harouane.capstone_backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public LoginDTO login(@RequestBody UserLoginDTO body) {
        return new LoginDTO(authService.authUserAndGenerateToken(body));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody @Validated UserDTO body, BindingResult validation) {
        if (validation.hasErrors()) {
            throw new BadRequestException(validation.getAllErrors());
        }
        return this.authService.save(body);
    }
}
