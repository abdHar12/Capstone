package harouane.capstone_backend.repositories;

import harouane.capstone_backend.entities.Order;
import harouane.capstone_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser(User user);
    Optional<Order> findById(UUID id);
}
