package harouane.capstone_backend.services;


import harouane.capstone_backend.DTO.UserDTO;
import harouane.capstone_backend.DTO.UserLoginDTO;
import harouane.capstone_backend.config.MailgunSender;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.exceptions.BadRequestException;
import harouane.capstone_backend.exceptions.UnauthorizedExeption;
import harouane.capstone_backend.repositories.UserRepository;
import harouane.capstone_backend.security.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    JWTTools jwtTools;

    @Autowired
    private PasswordEncoder bcrypt;

    @Autowired
    private UserRepository userDAO;

    @Autowired
    private MailgunSender mailgunSender;


    public String authUserAndGenerateToken(UserLoginDTO body) throws UnauthorizedExeption {
        User user = userService.findByEmail(body.email());
        if (bcrypt.matches(body.password(), user.getPassword())){
            return jwtTools.createToken(user);
        }else {
            throw new UnauthorizedExeption("Incorrect credentials");
        }
    }

    public User save(UserDTO user) {
        userDAO.findByEmail(user.email()).ifPresent(newUser ->{
            throw new BadRequestException("The email is already in use");
        });
        String avatar =  "https://ui-avatars.com/api/?name=" + user.name() + "+" + user.surname();
        User newUser = new User(user.username(), user.email(), bcrypt.encode(user.password()), user.name(), user.surname(), avatar);

        User savedUser = userDAO.save(newUser);
        mailgunSender.sendRegistrationEmail(savedUser);
        return savedUser;
    }
}
