package harouane.capstone_backend.controller;

import com.google.gson.JsonObject;
import harouane.capstone_backend.services.MangadexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/manga")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MangadexController {
    @Autowired
    MangadexService mangadexService;

    @GetMapping("/")
    private JsonObject getMangasFromApi(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size)
    {
        return mangadexService.getMangasFromApi(page, size);
    }

    @GetMapping("/{id}/chapters")
    public JsonObject getChaptersByMangaId(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @PathVariable String id){
        return mangadexService.getChaptersByMangaId(id, page, size);
    }

    @GetMapping("/random")
    public JsonObject getRandomManga(){
        return mangadexService.getRandomManga();
    }
}
