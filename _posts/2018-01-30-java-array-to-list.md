---
title: Convert Array to List in Java
author: Haijun (Navy) Su
layout: post
tags: [Java, Array, List, primitive]
---

Java version: 8

For object array:
```java
    Integer[] nums = {1, 2, 3, 4};
    List<Integer> numList = Arrays.asList(nums);
```

For a primitive Array (need import java.util.stream.Collectors)
```
    int[] nums = {1, 2, 3, 4};
    List<Integer> numList = Arrays.stream(nums).boxed().collect(Collectors.toList());
```

Sort a primitive Array as descending order. It is not in space.
```
    int[] nums = {1, 2, 3, 4};
    int[] numsOrdered = Arrays.stream(nums).boxed().sorted(Comparator.reverseOrder()).mapToInt(i->i).toArray();
```

List<Integer> to int[]
```
    int[] nums = {1, 2, 3, 4};
    List<Integer> numList = Arrays.stream(nums).boxed().collect(Collectors.toList());
    int[] array = numList.stream().mapToInt(i->i).toArray();
```

