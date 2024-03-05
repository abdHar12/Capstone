package harouane.capstone_backend.services;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MangadexService {
    @Autowired
    private Environment env;
    String getBaseUrl(){
        return env.getProperty("mangadex.baseUrl");
    }

    JsonObject stringToJson(String url){
        RestTemplate restTemplate=new RestTemplate();
        String result= restTemplate.getForObject(url, String.class);
        JsonParser parser = new JsonParser();
        //Creating JSONObject from String using parser
        JsonObject JSONObject = parser.parse(result).getAsJsonObject();
        System.out.println("Object: "+JSONObject);
        return JSONObject;
    }
    public JsonObject getMangasFromApi(int page, int size){
        String url= getBaseUrl() + "manga?limit="+size+"&offset="+(((page+1)*size-size));
        return stringToJson(url);
    }
    public JsonObject getChaptersByMangaId(String id, int page, int size){
        String url= getBaseUrl() + "chapter?limit="+size+"&offset="+(((page+1)*size-size))+"&manga="+id;
        return stringToJson(url);
    }


}
