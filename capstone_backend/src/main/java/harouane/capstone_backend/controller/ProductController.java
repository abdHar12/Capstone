package harouane.capstone_backend.controller;

import harouane.capstone_backend.DTO.ProductDTO;
import harouane.capstone_backend.DTO.ProductDTOResponse;
import harouane.capstone_backend.entities.CartProduct;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/products")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("")
    public Page<CartProduct> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(defaultValue = "id") String order) {
        System.out.println(productService.getMangaProducts(page, size, order));
        return productService.getMangaProducts(page, size, order);
    }
    @PostMapping("")
    public ProductDTOResponse addElement(@RequestBody ProductDTO productDTO, @AuthenticationPrincipal User user){
        System.out.println(user);
        return productService.addElement(productDTO, user);
    }

    @GetMapping("/cart")
    public List<ProductDTOResponse> getProductsByUser(@AuthenticationPrincipal User user){
        return productService.getProductByUser(user);
    }
}
