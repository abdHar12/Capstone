package harouane.capstone_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductDTOResponse {
        String UUID;
        String titleManga;
        String chapterTitle;
        String chapterNumber;
        String price;
        String orderId;
        String imgManga;
        String userId;
}
