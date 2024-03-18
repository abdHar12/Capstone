package harouane.capstone_backend.services;

import harouane.capstone_backend.DTO.ProductDTO;
import harouane.capstone_backend.DTO.ProductDTOResponse;
import harouane.capstone_backend.entities.CartProduct;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.repositories.ProductRepository;
import harouane.capstone_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productDAO;
    @Autowired
    UserRepository userDAO;
    @Autowired
    UserService userService;


    public Page<CartProduct> getMangaProducts(int pageN, int pageS, String OrderBy) {
        if (pageS > 20) pageS = 20;
        Pageable pageable = PageRequest.of(pageN, pageS, Sort.by(OrderBy));
        return productDAO.findAll(pageable);
    }

    public ProductDTOResponse addElement(ProductDTO productDTO, User user) {
        CartProduct cartProduct =new CartProduct();
        cartProduct.setImgManga(productDTO.imgManga());
        cartProduct.setTitleManga(productDTO.titleManga());
        cartProduct.setChapterTitle(productDTO.chapterTitle());
        cartProduct.setChapterNumber(productDTO.chapterNumber());
        cartProduct.setPrice(Double.parseDouble(productDTO.price()));
        cartProduct.setUser(user);
        productDAO.save(cartProduct);
        return createProductDTO(cartProduct);
    }

    public List<ProductDTOResponse> getProductByUser(User user) {
        List<ProductDTOResponse> products=new ArrayList<>();
        productDAO.findByUser(user).forEach(el->{
            System.out.println(el);
            products.add(createProductDTO(el));
        });
        System.out.println(products);
        return products;
    }

    public ProductDTOResponse createProductDTO(CartProduct cartProduct){
        return new ProductDTOResponse(cartProduct.getId().toString(), cartProduct.getTitleManga(), cartProduct.getChapterTitle(), cartProduct.getChapterNumber(), Double.toString(cartProduct.getPrice()), cartProduct.getImgManga(), cartProduct.getUser().getId().toString());
    }
}
