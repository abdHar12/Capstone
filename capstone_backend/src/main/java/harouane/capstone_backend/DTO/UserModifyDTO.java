package harouane.capstone_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserModifyDTO {
    String username;
    String firstName;
    String surname;
    String email;
}
