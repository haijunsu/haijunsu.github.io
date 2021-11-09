---
title: Using Spring-security to Secure a Web Application
author: Haijun (Navy) Su
layout: post
tags: [Java, Spring, security, web]
---

#### Dependencies

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-test</artifactId>
  <scope>test</scope>
</dependency>

```

#### Configuration Example

```
package com.example.securingweb;

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
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/", "/home").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login")
				.permitAll()
				.and()
			.logout()
				.permitAll();
	}

	@Bean
	@Override
	public UserDetailsService userDetailsService() {
		UserDetails user =
			 User.withDefaultPasswordEncoder()
				.username("user")
				.password("password")
				.roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}
```

#### AntMatchers vs mvcMatchers

`antMatchers` and `mvcMatchers` both implement `RequestMatcher` interface but use different expression languages under the hood.


* `andMatchers(String antPattern)`: Allows configuring the `HttpSecurity` to only be invoked when matching the provided pattern. It is an implementationfor `Ant-style` path patterns. Part of this mapping code has been kindly borrowed from Apache Ant.
* `mvcMatchers(String mvcPattern)`: Allows configuring the `HttpSecurity` to only be invoked when matching the provided Spring MVC pattern. It uses the Spring MVC's `HandlerMappingIntrospector` to match the path and extract variables.

Generally `mvcMatcher` is more secure than an `andMatcher`. For eample:

* `andMatchers("/secured")` matches only the exact `/secured` URL
* `mvcMatchers('/secured")` matches `/secured` as well as `/secured/`, `/secured.html`, `/secured.xyz`.

`mvcMatchers` uses the same rules that Spring MVC uses for matching when using `@RequestMapping` annotation


Reference:

<https://spring.io/guides/gs/securing-web/>
<https://stackoverflow.com/questions/50536292/difference-between-antmatcher-and-mvcmatcher>
