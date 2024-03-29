package harouane.capstone_backend.controller;

import harouane.capstone_backend.DTO.OrderDTO;
import harouane.capstone_backend.DTO.OrderDTOForUser;
import harouane.capstone_backend.DTO.OrderDTOResponse;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    @Autowired
    OrderService orderService;
    @PostMapping("")
    public OrderDTOResponse addSingleOrder(@RequestBody OrderDTO orderDTO, @AuthenticationPrincipal User user){
        return orderService.addSingleOrder(orderDTO, user);
    }
    @GetMapping("/user")
    public List<OrderDTOForUser> getOrderByUser(@AuthenticationPrincipal User user){
        return orderService.getOrderByUser(user);
    }
}
