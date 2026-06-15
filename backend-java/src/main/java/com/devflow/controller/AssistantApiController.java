package com.devflow.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/assistant")
public class AssistantApiController {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping
    public ResponseEntity<Map<String, String>> askAssistant(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        Map<String, String> response = new HashMap<>();

        if (apiKey == null || apiKey.trim().isEmpty()) {
            response.put("reply", "Gemini API key is not configured. Please add gemini.api.key in application.properties.");
            return ResponseEntity.ok(response);
        }

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

            // Prepare Request Body matching Google Gemini API contract
            Map<String, Object> geminiReq = new HashMap<>();
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            List<Map<String, Object>> parts = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            content.put("parts", parts);
            contents.add(content);
            geminiReq.put("contents", contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(geminiReq, headers);

            ResponseEntity<Map> geminiRes = restTemplate.postForEntity(url, entity, Map.class);
            if (geminiRes.getStatusCode() == HttpStatus.OK && geminiRes.getBody() != null) {
                Map body = geminiRes.getBody();
                List candidates = (List) body.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map contentObj = (Map) candidate.get("content");
                    if (contentObj != null) {
                        List partsList = (List) contentObj.get("parts");
                        if (partsList != null && !partsList.isEmpty()) {
                            Map partObj = (Map) partsList.get(0);
                            String text = (String) partObj.get("text");
                            response.put("reply", text);
                            return ResponseEntity.ok(response);
                        }
                    }
                }
            }
            response.put("reply", "Received empty response from Gemini API.");
        } catch (Exception e) {
            response.put("reply", "Error calling Gemini API: " + e.getMessage());
        }

        return ResponseEntity.ok(response);
    }
}
