package harouane.capstone_backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orders")
@ToString
public class Order {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    UUID id;
    LocalDate date;
    String name;
    double amount;
    String address;
    @Enumerated(EnumType.STRING)
    OrderStatus orderStatus;
    @Enumerated(EnumType.STRING)
    PaymentType paymentType;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="user_id")
    User user;
    @OneToMany(mappedBy = "order")
    @JsonIgnore
    List<CartProduct> cartProductList;


}
