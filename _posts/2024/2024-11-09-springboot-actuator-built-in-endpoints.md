---
title: Springboot Actuator built-in endpoints
author: Haijun (Navy) Su
layout: post
tags: [java, spring, springboot, actuator]
---

Here are some of the most commonly used ones:

* `/actuator/health`: Shows the application health information.
* `/actuator/info`: Displays arbitrary application info.
* `/actuator/beans`: Shows all the Spring Beans in the application.
* `/actuator/metrics`: Provides metrics information.
* `/actuator/env`: Displays properties from the application's environment.
* `/actuator/loggers`: Exposes the configurations of the loggers in the application.
* `/actuator/threaddump`: Shows the current thread dump.
* `/actuator/heapdump`: Returns a heap dump file.
* `/actuator/scheduledtasks`: Shows the scheduled tasks in the application.
* `/actuator/httptrace`: Displays HTTP trace information (last 100 HTTP request-response exchanges).

## Seucre Actuator endpoints

### Add Dependencies

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### Configure Actuator Endpoints

```properties
management.endpoints.web.exposure.include=health,info
```

### Define Security Configuration

Create a configuration class to secure Actuator endpoints.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/actuator/**").authenticated()
            .and()
            .httpBasic();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();

        return new InMemoryUserDetailsManager(user);
    }
}
```
