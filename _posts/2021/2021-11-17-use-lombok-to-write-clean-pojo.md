---
title: Use Lombok to write clean POJO
author: Haijun (Navy) Su
layout: post
tags: [java, eclipse, maven, lombok]
---

### Project Lombok

All Features at <https://projectlombok.org/features/all>

#### Common Annotations

[@Getter / @Setter](https://projectlombok.org/features/GetterSetter)  
Auto generate the getter and setter method


[@ToString(includeFieldNames=true)](https://projectlombok.org/features/ToString)

Auto generate the `toString()` methed. The property `includeFieldNames` default value is **false** if using `@Data` annotation.

[@Data](https://projectlombok.org/features/Data)

All together now: A shortcut for `@ToString`, `@EqualsAndHashCode`, `@Getter` on all fields, and `@Setter` on all non-final fields, and `@RequiredArgsConstructor`!

### Working with Maven

TO include lombok as 'provided' dependency, add it to `<dependencies>` block:

```xml
<dependencies>
	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.22</version>
		<scope>provided</scope>
	</dependency>
</dependencies>
```

### Working with Eclipse

Dobule-click lombok.jar in eclipse project. It is in the `Maven Dependencies` classpath.

Please refer: <https://projectlombok.org/setup/eclipse>
