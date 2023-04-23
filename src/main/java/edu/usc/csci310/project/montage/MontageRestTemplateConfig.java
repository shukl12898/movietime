package edu.usc.csci310.project.montage;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MontageRestTemplateConfig {

    @Bean
    public RestTemplate MontageRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }
}