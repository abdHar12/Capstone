package harouane.capstone_backend.controller;

import com.google.gson.JsonObject;
import harouane.capstone_backend.services.MangadexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mangas")
public class MangadexController {
    @Autowired
    MangadexService mangadexService;
    @GetMapping("/manga")
    private JsonObject getMangasFromApi(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size)
    {
        return mangadexService.getMangasFromApi(page, size);
    }

    @GetMapping("/chapter")
    public JsonObject getChaptersByMangaId(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam String id){
        return mangadexService.getChaptersByMangaId(id, page, size);
    }
}
