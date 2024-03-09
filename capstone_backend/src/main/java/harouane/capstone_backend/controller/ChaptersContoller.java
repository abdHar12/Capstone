package harouane.capstone_backend.controller;

import com.google.gson.JsonObject;
import harouane.capstone_backend.services.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/chapter")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChaptersContoller {
    @Autowired
    ChapterService chaptersService;

    @GetMapping("/{id}")
    public JsonObject getChaptersByMangaId(@PathVariable String id){
        return chaptersService.getChapterById(id);
    }
}
