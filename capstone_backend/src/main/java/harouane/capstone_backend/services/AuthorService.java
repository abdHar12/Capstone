package harouane.capstone_backend.services;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
    @Autowired
    MangadexService mangadexService;
    public JsonObject getSingleAuthor(String id) {
        String url= mangadexService.getBaseUrl() + "author/"+id;
        return mangadexService.stringToJson(url);
    }
}
