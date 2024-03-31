package harouane.capstone_backend.services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import harouane.capstone_backend.DTO.RoleDTO;
import harouane.capstone_backend.DTO.UserDTO;
import harouane.capstone_backend.DTO.UserModifyDTO;
import harouane.capstone_backend.entities.CartProduct;
import harouane.capstone_backend.entities.Role;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.exceptions.BadRequestException;
import harouane.capstone_backend.exceptions.NotFoundException;
import harouane.capstone_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    UserRepository userDAO;

    @Autowired
    Cloudinary cloudinary;

    public Page<User> getUsers(int pageN, int pageS, String OrderBy) {
        if (pageS > 20) pageS = 20;
        Pageable pageable = PageRequest.of(pageN, pageS, Sort.by(OrderBy));
        return userDAO.findAll(pageable);
    }

    public User findById(UUID id) {
        return userDAO.findById(id).orElseThrow(()-> new NotFoundException(id));
    }

    public User update(UUID id, User userUp) {
        User found = this.findById(id);
        found.setName(userUp.getName());
        found.setSurname(userUp.getSurname());
        found.setEmail(userUp.getEmail());
        found.setPassword(userUp.getPassword());
        return userDAO.save(found);
    }

    public void addProductToCart(UUID id, CartProduct cartProduct) {
        User user= findById(id);
        List<CartProduct> cartProductList = new ArrayList<>();
        cartProductList.add(cartProduct);
        user.addProductsToBuy(cartProductList);
        userDAO.save(user);
    }

        public void deleteUser(UUID id) {
        User found = this.findById(id);
        userDAO.delete(found);
    }

    public User findByEmail(String email){
        return userDAO.findByEmail(email).orElseThrow(() -> new NotFoundException("Email "+ email + " not found"));
    }


    public UserDTO uploadAvatar(User currentUser, MultipartFile image) throws IOException {
        String avatarUrl = (String) cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap()).get("url");
        currentUser.setAvatar(avatarUrl);
        this.userDAO.save(currentUser);
        return new UserDTO(currentUser.getId().toString(), currentUser.getUsername(), currentUser.getEmail(), currentUser.getPassword(), currentUser.getName(), currentUser.getSurname(), currentUser.getAvatar());
    }

    public User updateRole(UUID id, RoleDTO role) throws Exception {
        User found = this.findById(id);
        Role roleOfUser = found.getRole();

        if (roleOfUser.name().toLowerCase().equals(Role.ADMIN.toString().toLowerCase())){
            found.setRole(Role.ADMIN);
            this.userDAO.save(found);
            return found;
        }else {
            throw new Exception("Invalid role");
        }
    }

    public UserDTO currentUser(User currentUser) {
        return new UserDTO(currentUser.getId().toString(), currentUser.getUsername(), currentUser.getEmail(), currentUser.getPassword(), currentUser.getName(), currentUser.getSurname(), currentUser.getAvatar());
    }

    public UserDTO updateProfile(UserModifyDTO userCamps, User currentUser) throws Exception {
        if (!Objects.equals(userCamps.getEmail(), currentUser.getEmail())) {
            if (!userDAO.existsByEmail(userCamps.getEmail())) {
                currentUser.setEmail(userCamps.getEmail());
            } else throw new BadRequestException("Email not permitted");
        } else currentUser.setEmail(userCamps.getEmail());

        if (!Objects.equals(userCamps.getUsername(), currentUser.getUsername())) {
            if (!userDAO.existsByUsername(userCamps.getUsername()   )) {
                currentUser.setUsername(userCamps.getUsername());
            } else throw new BadRequestException("Username not permitted");
        } else currentUser.setUsername(userCamps.getUsername());
        currentUser.setName(userCamps.getFirstName());
        currentUser.setSurname(userCamps.getSurname());
        userDAO.save(currentUser);
        return new UserDTO(currentUser.getId().toString(), currentUser.getUsername(), currentUser.getEmail(), currentUser.getPassword(), currentUser.getName(), currentUser.getSurname(), currentUser.getAvatar());
    }
}
