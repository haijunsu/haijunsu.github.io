---
title: Netflix EureKa
author: Haijun (Navy) Su
layout: post
tags: [microservice, eureka, netflix, discovery, java, spring, boot, zookeeper]
---

Netflix Eureka is a RESTful service that acts as a service registry for microservices. It's primarily used for service discovery, load balancing, and failover in distributed systems. Eureka allows microservices to register themselves and discover other services dynamically, which simplifies the process of communication between different services.

## Key Feature of Netflix Eureka

* **Service Registry**: Microservices register themselves with Eureka, providing their location (IP address and port).
* **Service Discovery**: Microservices can query Eureka to find the locations of other services.
* **Load Balancing**: Eureka supports client-side load balancing, allowing requests to be distributed across multiple instances of a service.
* **Failover**: If a service instance is fails, Eureka can detect the failure and remove the instance from the registry, allowing clients to discover other available services.

## Examples of Using Netflix Eureka

### Eureka Server Example

#### Add dependencies for server

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

#### Server configuration

```properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

#### Server Application

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

### Eureka client

#### Add dependencies for Eureka client

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
</dependencies>
```

#### Client configuration

```properties
spring.application.name=eureka-client
server.port=8080
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka
```

#### Controller for Service euraka-client

```java
@RestController
public class ServiceAController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Service eureka-client!";
    }
}
```

#### Eureka Client Application

```java
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class EurekaClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaClientApplication.class, args);
    }
}
```

### Feign Clients and Eureka Client

#### Add dependencies for Feign Client

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
</dependencies>
```

#### Fiegn client configuration

```properties
# Spring application name, which is the service name registered with Eureka
spring.application.name=service-web

# Server port
server.port=8082

# Eureka server URL where this service will register itself
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka

# Enable Eureka client
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true

# Enable Feign client logging for debugging (optional)
feign.client.config.default.loggerLevel=full
```

#### Create a Feign Client Interface

It calls the `/hello` endpoint to service `eureka-client`.

```java
@FeignClient(name = "eureka-client")
public interface MyServiceClient {
    @GetMapping("/hello")
    String sayHello();
}
```

#### Usage in a Controller

```java
@RestController
public class MyServiceController {
    @Autowired
    private MyServiceClient myServiceClient;

    @GetMapping("/invoke-hello")
    public String invokeHello() {
        return myServiceClient.sayHello();
    }
}
```

## Putting It All Together

* **Start the Eureka Server**: Run the `EurekaServerApplication`.
* **Register the Eureka Client**: Run the `EurekaClientApplication`.
* **Use the Feign Client**: Access the endpoint defined in the controller to invoke the `sayHello` method via the Feign client.

More reading:

<https://www.baeldung.com/spring-cloud-netflix-eureka>
