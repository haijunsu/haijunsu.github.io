---
title: Spliterator of SortedMap and SortSet in Java
author: Haijun (Navy) Su
layout: post
tags: [set, map, sort, sortedSet, sortedMap, spliterator, java]
---

An object for traversing and partitioning elements of a source. The source of elements covered by a Spliterator could be, for example, an array, a Collection, an IO channel, or a generator function.

A `Spliterator` is an advanced iterator that supports parallel processing of elements in a collection. `Spliterator` is part of the `java.util` pacakge and was introduced in Java 8.

## Spliterator in `SortedSet`

`SortedSet` is a set that maintains its elements in a sorted order. The `Spliterator` for a `SortedSet` can efficiently traverse and partition the elements in the set.

Example:

```java
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.Spliterator;

public class SortedSetSpliteratorExample {
    public static void main(String[] args) {
        SortedSet<Integer> sortedSet = new TreeSet<>();
        sortedSet.add(1);
        sortedSet.add(2);
        sortedSet.add(3);
        sortedSet.add(4);
        sortedSet.add(5);

        Spliterator<Integer> spliterator = sortedSet.spliterator();
        System.out.println("Characteristics: " + spliterator.characteristics());
        System.out.println("Estimate size: " + spliterator.estimateSize());

        spliterator.forEachRemaining(System.out::println);
    }
}

```

## Spliterator in `SortedMap`

`SortedMap` is a map that maintains its entries in a sorted order based on the keys. The `Spliterator` for a `SortedMap` can efficiently traverse and partition the entires in the map.

Example:

```java
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.Spliterator;
import java.util.Map.Entry;

public class SortedMapSpliteratorExample {
    public static void main(String[] args) {
        SortedMap<String, Integer> sortedMap = new TreeMap<>();
        sortedMap.put("apple", 1);
        sortedMap.put("banana", 2);
        sortedMap.put("cherry", 3);
        sortedMap.put("date", 4);
        sortedMap.put("elderberry", 5);

        Spliterator<Entry<String, Integer>> spliterator = sortedMap.entrySet().spliterator();
        System.out.println("Characteristics: " + spliterator.characteristics());
        System.out.println("Estimate size: " + spliterator.estimateSize());

        spliterator.forEachRemaining(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
    }
}

```

## Differences in SortedSet and sortedMap

* **Nature of Elements:** In `SortedSet`, the `Spliterator` operates on individual elements, when in `SorteMap`, the `Spliterator` operates on key-value pairs (entires);
* **Underlying Collection:** `SortedSet` is a set that maintains a sorted order of elements, whereas `SortedMap` is a map that maintains a sorted order of key-value pairs.
* **Traversal:** The traversal methods (forEachRemaining, tryAdvance, etc) for both `Spliterator` in `SortedSet` and `SortedMap` are similar, but the type of the elements they traverse differs.
