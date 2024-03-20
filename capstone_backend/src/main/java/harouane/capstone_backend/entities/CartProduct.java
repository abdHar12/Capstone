package harouane.capstone_backend.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.repository.cdi.Eager;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "products")
@ToString
public class CartProduct {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    UUID id;
    String titleManga;
    String chapterTitle;
    String chapterNumber;
    double price;
    String imgManga;
    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "user_id")
    User user;
    
    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "order_id")
    Order order;

}
