---
title: Json Files in Java
author: Haijun (Navy) Su
layout: post
tags: [json, java, gson, jackson]
---

## Gson

### Add Gson dependency to the project

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.8</version>
</dependency>

```

### Create a simple Java class to pepresent the data (POJO)

```java
public class Employee {
    private String name;
    private int age;
    private String position;

    public Employee(String name, int age, String position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }

    // Getters and setters (optional, for demonstration purposes)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
}
```

### Serialize Java Object to JSON

```java
import com.google.gson.Gson;

public class SerializeExample {
    public static void main(String[] args) {
        Gson gson = new Gson();
        Employee employee = new Employee("John Doe", 30, "Software Engineer");

        // Serialize to JSON
        String json = gson.toJson(employee);
        System.out.println("JSON: " + json);
    }
}
```

### Deserialize JSON to Java Object

```java
import com.google.gson.Gson;

public class DeserializeExample {
    public static void main(String[] args) {
        Gson gson = new Gson();
        String json = "{\"name\":\"John Doe\",\"age\":30,\"position\":\"Software Engineer\"}";

        // Deserialize from JSON
        Employee employee = gson.fromJson(json, Employee.class);
        System.out.println("Employee Name: " + employee.getName());
        System.out.println("Employee Age: " + employee.getAge());
        System.out.println("Employee Position: " + employee.getPosition());
    }
}
```

### Handling JSON File

```java
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class JsonFileExample {
    public static void main(String[] args) {
        Gson gson = new Gson();
        Employee employee = new Employee("Jane Smith", 25, "Data Scientist");

        // Serialize to JSON and write to file
        try (JsonWriter writer = new JsonWriter(new FileWriter("employee.json"))) {
            gson.toJson(employee, Employee.class, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read from JSON file and deserialize
        try (JsonReader reader = new JsonReader(new FileReader("employee.json"))) {
            Employee emp = gson.fromJson(reader, Employee.class);
            System.out.println("Employee Name: " + emp.getName());
            System.out.println("Employee Age: " + emp.getAge());
            System.out.println("Employee Position: " + emp.getPosition());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Jackson

### Add Jackson dependency to the project

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.3</version>
</dependency>
```

### Create the POJO

```java
public class Employee {
    private String name;
    private int age;
    private String position;

    public Employee() {
        // Default constructor needed for Jackson deserialization
    }

    public Employee(String name, int age, String position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
}
```

### Serialize a Java Object to JSON

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class SerializeExample {
    public static void main(String[] args) {
        ObjectMapper objectMapper = new ObjectMapper();
        Employee employee = new Employee("John Doe", 30, "Software Engineer");

        try {
            // Serialize to JSON
            String json = objectMapper.writeValueAsString(employee);
            System.out.println("JSON: " + json);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Deserialize JSON String to Java Object

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class DeserializeExample {
    public static void main(String[] args) {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "{\"name\":\"John Doe\",\"age\":30,\"position\":\"Software Engineer\"}";

        try {
            // Deserialize from JSON
            Employee employee = objectMapper.readValue(json, Employee.class);
            System.out.println("Employee Name: " + employee.getName());
            System.out.println("Employee Age: " + employee.getAge());
            System.out.println("Employee Position: " + employee.getPosition());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Working with a JSON File

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

public class JsonFileExample {
    public static void main(String[] args) {
        ObjectMapper objectMapper = new ObjectMapper();
        Employee employee = new Employee("Jane Smith", 25, "Data Scientist");

        // Serialize to JSON and write to file
        try {
            objectMapper.writeValue(new File("employee.json"), employee);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read from JSON file and deserialize
        try {
            Employee emp = objectMapper.readValue(new File("employee.json"), Employee.class);
            System.out.println("Employee Name: " + emp.getName());
            System.out.println("Employee Age: " + emp.getAge());
            System.out.println("Employee Position: " + emp.getPosition());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
