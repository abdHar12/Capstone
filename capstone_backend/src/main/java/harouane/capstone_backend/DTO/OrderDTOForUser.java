package harouane.capstone_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@Getter
public class OrderDTOForUser {
    String id;
    String date;
    String name;
    String amount;
    String address;
}
