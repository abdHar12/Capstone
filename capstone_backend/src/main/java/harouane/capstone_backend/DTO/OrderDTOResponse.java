package harouane.capstone_backend.DTO;

import harouane.capstone_backend.entities.OrderStatus;
import harouane.capstone_backend.entities.PaymentType;
import harouane.capstone_backend.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
public class OrderDTOResponse {
    String id;
    String date;
    String name;
    String amount;
    String orderStatus;
    String paymentType;
    String userId;
}
