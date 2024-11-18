---
title: Integrating Swagger into Spring Boot Application
author: Haijun (Navy) Su
layout: post
tags: [java, api, swagger, spring, boot]
---

Integrating Swagger into Spring Boot applications can  greatly simplify the process of documenting and testing APIs. Here's how to do it using `springdoc-openapi` library.

## Add the Dependency

Add the following dependency to the project's `pom.xml` file.

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
    <version>1.6.15</version>
</dependency>
```

## Configure Swagger

You can customize the Swagger UI using a configuration class. Create a class like this:

```java
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Your API Title")
                        .version("1.0.0")
                        .description("API Description"));
    }
}
```

## Annotate the controllers

Use Swagger annotations to enhance the documentation of API endpoints.

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "User Controller", description = "Operations related to users")
public class UserController {

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Retrieves a list of all users", responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    public List<User> getAllUsers() {
        // ... implementation
    }
}
```

## Access Swagger UI

Start the Spring Boot application, and then access the Swagger UI at the following URL:

```browser
http://localhost:8080/swagger-ui/index.html
```

You should now see the Swagger UI, which allows you to view and interact with the API documents.

## Benefits fo using Swagger

* Interactive Documentation:
  Swagger generates an interactive documentation page where you can easily test the API endpoints.

* API Contract:
  Swagger creates an OpenAPI sepcification, wich serves as a contract between your API and its consumers.

* Code Generation
  You can use Swagger Codegen to generate client SDKs in various programming languages.

* Improved Development:
  Swagger can help streamline the development process and improve collaboration between frontend and backend developers.

Other links:

<https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api>
