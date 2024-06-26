package harouane.capstone_backend.repositories;


import harouane.capstone_backend.DTO.ProductDTOResponse;
import harouane.capstone_backend.entities.CartProduct;
import harouane.capstone_backend.entities.Order;
import harouane.capstone_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface ProductRepository extends JpaRepository<CartProduct, UUID> {
    List<CartProduct> findByUserAndOrder(User user, Order order);

    List<CartProduct> findByTitleMangaAndChapterNumber(String TitleManga, String chapterNumber);

    List<CartProduct> findByOrder(Order order);
}
