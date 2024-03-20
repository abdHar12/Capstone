package harouane.capstone_backend.DTO;

import harouane.capstone_backend.entities.OrderStatus;
import harouane.capstone_backend.entities.PaymentType;
import harouane.capstone_backend.entities.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record OrderDTO(
        String name,
       String amount,
       String address,
       String paymentType,

        List<ProductDTOResponse> products
                               ) {
}
