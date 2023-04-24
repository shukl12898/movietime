package edu.usc.csci310.project.moviedetails;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MovieDetailsRestTemplateConfig {

    @Bean
    public RestTemplate MovieDetailsRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }
}