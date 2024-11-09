---
title: ComputeIfAbsent vs getOrDefault in Map
author: Haijun (Navy) Su
layout: post
tags: [java, map]
---

## ComputeIfAbsent

When using `computeIfAbsent`, the method checks if the key is already present in the map. If the key is not present, it computes a value using the given mapping function and associates it with the key.

Example:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ComputeIfAbsentExample {
    public static void main(String[] args) {
        Map<String, List<String>> map = new HashMap<>();

        // Using computeIfAbsent to add elements to the list
        map.computeIfAbsent("fruits", k -> new ArrayList<>()).add("apple");
        map.computeIfAbsent("fruits", k -> new ArrayList<>()).add("banana");
        map.computeIfAbsent("vegetables", k -> new ArrayList<>()).add("carrot");

        System.out.println(map);
    }
}

```

## GetOrDefault

When using `getOrDefault`, the method returns the value associated with the specified key, or the default value if the key is not present in the map. Unlike `computeIfAbsent`, it does not modify the map.

Example:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetOrDefaultExample {
    public static void main(String[] args) {
        Map<String, List<String>> map = new HashMap<>();

        // Using getOrDefault to get the list and add elements to it
        List<String> fruits = map.getOrDefault("fruits", new ArrayList<>());
        fruits.add("apple");
        map.put("fruits", fruits);

        fruits = map.getOrDefault("fruits", new ArrayList<>());
        fruits.add("banana");
        map.put("fruits", fruits);

        List<String> vegetables = map.getOrDefault("vegetables", new ArrayList<>());
        vegetables.add("carrot");
        map.put("vegetables", vegetables);

        System.out.println(map);
    }
}

```

## Differences

* `computeIfAbsent`: Modifies the map by computing a value and associating it with the key if the key is not present. It simplifies the code since you don't need to manually put the computed value back into the map.
* `getOrDefault`: Does not modify the map. It simply retrieves the value associated with the key or returns the default value. You need to manually put the modified value back into the map.
