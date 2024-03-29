package harouane.capstone_backend.services;

import harouane.capstone_backend.DTO.ProductDTO;
import harouane.capstone_backend.DTO.ProductDTOResponse;
import harouane.capstone_backend.entities.CartProduct;
import harouane.capstone_backend.entities.Order;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.exceptions.NotFoundException;
import harouane.capstone_backend.repositories.OrderRepository;
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
import java.util.Objects;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    ProductRepository productDAO;
    @Autowired
    OrderRepository orderDAO;

    public CartProduct findById(UUID id) {
        return productDAO.findById(id).orElseThrow(()-> new NotFoundException(id));
    }

    public List<ProductDTOResponse> findByTitleMangaAndChapterNumber(String mangaTitle, String chapterNumber, User user){
        List<ProductDTOResponse> responseList=new ArrayList<>();
        productDAO.findByTitleMangaAndChapterNumber(mangaTitle, chapterNumber).forEach(el->{
            ProductDTOResponse dto=createProductDTO(el);
            if(Objects.equals(user.getId().toString(), dto.getUserId())) responseList.add(createProductDTO(el));
        });
        return responseList;
    }
    public List<ProductDTOResponse> getMangaProducts() {
/*        if (pageS > 20) pageS = 20;
        Pageable pageable = PageRequest.of(pageN, pageS, Sort.by(OrderBy));*/
        List<ProductDTOResponse> responseList=new ArrayList<>();
        productDAO.findAll().forEach(el->{

            responseList.add(createProductDTO(el));
        });
        return responseList;
    }

    public ProductDTOResponse addElement(ProductDTO productDTO, User user) {
        CartProduct cartProduct =new CartProduct();
        if(findByTitleMangaAndChapterNumber(productDTO.titleManga(), productDTO.chapterNumber(), user).isEmpty()) {
            cartProduct.setImgManga(productDTO.imgManga());
            cartProduct.setTitleManga(productDTO.titleManga());
            cartProduct.setChapterTitle(productDTO.chapterTitle());
            cartProduct.setChapterNumber(productDTO.chapterNumber());
            cartProduct.setPrice(Double.parseDouble(productDTO.price()));
            cartProduct.setUser(user);
            productDAO.save(cartProduct);
            return createProductDTO(cartProduct);
        } else return null;
    }

    public List<ProductDTOResponse> getProductByUserAndOrder(User user, Order order) {
        List<ProductDTOResponse> products=new ArrayList<>();
        productDAO.findByUserAndOrder(user, order).forEach(el->{
            products.add(createProductDTO(el));
        });
        System.out.println(products);
        return products;
    }

    public ProductDTOResponse createProductDTO(CartProduct cartProduct){
            return new ProductDTOResponse(cartProduct.getId().toString(), cartProduct.getTitleManga(), cartProduct.getChapterTitle(), cartProduct.getChapterNumber(), Double.toString(cartProduct.getPrice()), cartProduct.getOrder()==null?"null":cartProduct.getOrder().getId().toString() ,cartProduct.getImgManga(), cartProduct.getUser().getId().toString());
    }

    public void deleteById(String id) {
        productDAO.delete(findById(UUID.fromString(id)));
    }

    public void updateOrder(UUID uuid, Order order) {
        CartProduct product= findById(uuid);
        product.setOrder(order);
        productDAO.save(product);
    }

    public List<ProductDTOResponse> findByOrderId(String orderId) {
        List<CartProduct> products= new ArrayList<>(productDAO.findByOrder(findOrderById(UUID.fromString(orderId)))) ;
        List<ProductDTOResponse> productDTOResponseList= new ArrayList<>();
        products.forEach(cartProduct -> productDTOResponseList.add(createProductDTO(cartProduct)));
        return productDTOResponseList;
    }
    public Order findOrderById(UUID uuid) {
        return orderDAO.findById(uuid).orElseThrow(()-> new NotFoundException(uuid));
    }
}
