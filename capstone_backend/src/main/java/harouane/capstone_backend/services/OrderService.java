package harouane.capstone_backend.services;

import harouane.capstone_backend.DTO.OrderDTO;
import harouane.capstone_backend.DTO.OrderDTOResponse;
import harouane.capstone_backend.entities.Order;
import harouane.capstone_backend.entities.OrderStatus;
import harouane.capstone_backend.entities.PaymentType;
import harouane.capstone_backend.entities.User;
import harouane.capstone_backend.exceptions.NotFoundException;
import harouane.capstone_backend.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderDAO;
    @Autowired
    ProductService productService;
    public OrderDTOResponse addSingleOrder(OrderDTO orderDTO, User user) {
        Order order= new Order();
        order.setOrderStatus(OrderStatus.IN_PROGRESS);
        order.setAmount(Double.parseDouble(orderDTO.amount()));
        order.setName(orderDTO.name());
        order.setUser(user);
        order.setPaymentType(PaymentType.valueOf(orderDTO.paymentType()));
        order.setDate(LocalDate.now());
        orderDAO.save(order);
        orderDTO.products().forEach(product->{
            productService.updateOrder(UUID.fromString(product.getUUID()), order);
        });
        return new OrderDTOResponse(order.getId().toString(), order.getDate().toString(), order.getName(), Double.toString(order.getAmount()), order.getOrderStatus().toString(), order.getPaymentType().toString(), order.getUser().getId().toString());
    }

    public List<OrderDTOResponse> getOrderByUser(User user) {
        List<Order> orders= new ArrayList<>(orderDAO.findByUser(user));
        List<OrderDTOResponse> OrderDTOResponseList=new ArrayList<>();
        orders.forEach(order->OrderDTOResponseList.add(new OrderDTOResponse(order.getId().toString(), order.getDate().toString(), order.getName(), Double.toString(order.getAmount()), order.getOrderStatus().toString(), order.getPaymentType().toString(), order.getUser().getId().toString())));
        return OrderDTOResponseList;
    }


}
