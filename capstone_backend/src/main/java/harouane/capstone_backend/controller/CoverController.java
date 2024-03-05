package harouane.capstone_backend.controller;

import com.google.gson.JsonObject;
import harouane.capstone_backend.services.CoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/cover")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CoverController {
    @Autowired
    CoverService coverService;
    @GetMapping("/{id}")
    public JsonObject getSingleCover(@PathVariable String id){
        return coverService.getSingleCover(id);
    }

}
