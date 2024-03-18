package harouane.capstone_backend.controller;

import com.google.gson.JsonObject;
import harouane.capstone_backend.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/author")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthorController {
    @Autowired
    AuthorService authorService;
    @GetMapping("/{id}")
    public JsonObject getSingleAuthor(@PathVariable String id){
        return authorService.getSingleAuthor(id);
    }

}
