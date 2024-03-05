package harouane.capstone_backend.services;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class CoverService {
    @Autowired
    MangadexService mangadexService;
    public JsonObject getSingleCover(String id) {
        String url= mangadexService.getBaseUrl() + "cover/"+id;
        return mangadexService.stringToJson(url);
    }
}
