package edu.usc.csci310.project.search.api;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class SearchRestTemplateConfig {
    @Bean
    public RestTemplate searchRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }
}
