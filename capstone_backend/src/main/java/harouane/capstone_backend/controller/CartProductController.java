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
public class CartProductController {
    @Autowired
    ProductService productService;

    /*@GetMapping("")
    @ResponseBody
    public Page<CartProduct> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(defaultValue = "id") String order) {
        System.out.println(productService.getMangaProducts(page, size, order));
        return productService.getMangaProducts(page, size, order);
    }*/
    @GetMapping("")
    public List<ProductDTOResponse> getAll() {
        return productService.getMangaProducts();}
    @PostMapping("")
    public ProductDTOResponse addElement(@RequestBody ProductDTO productDTO, @AuthenticationPrincipal User user){
        System.out.println(user);
        return productService.addElement(productDTO, user);
    }

    @GetMapping("/cart")
    public List<ProductDTOResponse> getProductByUserAndOrder(@AuthenticationPrincipal User user){
        return productService.getProductByUserAndOrder(user, null);
    }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        productService.deleteById(id);
    }

    @GetMapping("/verify-existence")
    public List<ProductDTOResponse> findByTitleMangaAndChapterNumber(@RequestParam String titleManga, @RequestParam String chapterNumber, @AuthenticationPrincipal User user)
    {
        System.out.println(titleManga+chapterNumber);
        return productService.findByTitleMangaAndChapterNumber(titleManga,chapterNumber, user);
    }
}
