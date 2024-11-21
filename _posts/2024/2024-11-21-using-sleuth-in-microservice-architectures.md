---
title: Using Sleuth in Microservice Architectures
author: Haijun (Navy) Su
layout: post
tags: [sleuth, apache, cloud, micro, servcie, java, log, monitor]
---

Spring Cloud Sleuth is a distributed tracing solution that helps you troubleshoot and monitor complex microservice architectures. It is a library that provides distributed tracing and logging capabilities for Spring Boot applications. It integrates with OpenZipkin Brave to add unique identifiers (trace IDs and span IDs) to log entries, making it easier to track and diagnose issues across multiple services.

## Key Features

* **Trace IDs**: Unique identifiers for an entire request flow.
* **Span IDs**: Unique identifiers for individual units of work within a request.
* **Log Correclation**: Correlates logs with distributed traces.
* **Error Contextualization**: Helps understand the impact of exceptions.

## Example

* Add dependencies

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>spring-cloud-sleuth-example</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Cloud Sleuth -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-sleuth</artifactId>
        </dependency>

        <!-- Spring Cloud Zipkin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>

        <!-- Spring Boot Starter Test (for testing purposes) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>2021.0.3</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

```

* Configuration and Application Files
  * Application properties

  ```properties
  spring.application.name=myapp
  server.port=8080
  spring.cloud.config.uri=http://localhost:8888
  spring.sleuth.sampler.probability=1.0
  spring.zipkin.base-url=http://localhost:9411
  ```

  * Main Application Class

  ```java
  @SpringBootApplication

  public class SleuthExampleApplication {
      public static void main(String[] args) {
          SpringApplication.run(SleuthExampleApplication.class, args);
      }
  }
  ```

  * REST Controller

  ```java
  @RestController
  public class MyController {
      @GetMapping("/hello")
      public String hello() {
          return "Hello, Sleuth!";
      }
  }
  ```

* Run the Application
  Start the Spring Boot application. Sleuth will automatically add trace and span IDs to the logs.

* Set Up Zipkin (Optional)
  * Download zipkin Jar file from the offical website.
  * Run Zipkin server using the following command.

  ```bash
  java -jar zipkin-server-<version>.jar
  ```

* Test the application
  * Make a request to the REST endpoint (<http://localhost:8080/hello>)
  * Open the Zipkin UI in browser (usually <http://localhost:9411>)
  * You should see the trace of your request, including the duration of each span and how the spans relate to each other.

* Exception log

```sh
2024-11-21 13:00:00.000 INFO  [myapp,5e8eeec48b08e26882aba313eb08f0a4,82aba313eb08f0a4,true]  97203 --- [nio-8081-exec-2] o.s.c.s.i.web.ExceptionLoggingFilter      : Hello, Sleuth!
```

## Customizing Spring CLoud Sleuth

### Sampling

Control the probability of tracing request (from 0.0 to 1.0)

```properties
spring.sleuth.sampler.probability=0.5
```

### Log Pattern

Customize the log pattern to include trace and span Ids.

```properties
logging.pattern.level=%5p [${spring.application.name:},%X{traceId},%X{spanId}] %c - %m%n
```

### Skip Pattern

Exclude specific endpoints or service from the tracing

```properties
spring.sleuth.web.skipPattern=/health|/info
```

### Propagation

Customize how to trace context is propagated,

```properties
spring.sleuth.propagation-keys=x-my-trace-id,x-my-span-id
```

Here is the combined congratulations

```properties
spring.application.name=myapp
server.port=8080

# Sleuth configurations
spring.sleuth.sampler.probability=1.0
spring.sleuth.web.skipPattern=/health|/info
logging.pattern.level=%5p [${spring.application.name:},%X{traceId},%X{spanId}] %c - %m%n
spring.zipkin.base-url=http://localhost:9411
```

Note:

* `@EngalbeSlueth`: Not needed as Sleuth is enable by default with the dependency
* **Default Behavior**: Automatically adds trace and span IDs to logs and propagates tracing information.
* **Customization**: Configurable through properties for sampling rate, log patterns, skip patterns an propagation.
