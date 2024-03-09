package harouane.capstone_backend.services;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChapterService {
    @Autowired
    MangadexService mangadexService;
    public JsonObject getChapterById(String id){
        String url= mangadexService.getBaseUrl() + "chapter/"+id;
        return mangadexService.stringToJson(url);
    }
}
