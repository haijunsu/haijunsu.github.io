---
title: Difference Between map and flatMap in Java 8
author: Haijun (Navy) Su
layout: post
tags: [java8, java, map, flatmap]
---
## Definition in Java 8 [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html) and [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)
#### Optional
* map: If a value is present, apply the provided mapping function to it, and if the result is non-null, return an Optional describing the result. Otherwise return an empty Optional.
* flatMap: If a value is present, apply the provided Optional-bearing mapping function to it, return that result, otherwise return an empty Optional. This Method is similar to **map(Function)**, but the provided mapper is one whose result is already an Optional, and if invoked, flatMap does not wrap it with an additional Optional.

#### Stream
* map: Returns a stream consisting of the results of applying the given function to the elements of this stream.
* flatMap: Returns a stream consisting of the results of replacing each element of this stream with the contents of a mapped stream produced by applying the provided mapping function to each element. Each mapped stream is *closed* after its contents have been placed into this stream. (If a mapped stream is null and empty stram is used, instead).

## Diffenence between map() and flatMap()
1. The function you pass to map() operation returns a single value.
2. The function you pass to flatMap() operation returns Steam of value.
3. The flatMap() is combination of map and flat operation. This means you first apply map function and then flattens the result.The function used by map operation returns a Stream of values or list of values rather than single value.
4. The map() is used for transformation, but flatMap() is used for both transformation and flattening.

## Example
```java
import java.util.*;
import java.util.stream.*;
public class MapvsFlatMap {

    public void testOptional() {
        Person person = new Person("HappyMan", 26);
        Optional<Person> personOptional = Optional.of(person);
        Optional<Optional<String>> mapReturn = personOptional.map(Person::getName);
        Optional<String> flatMapReturn = personOptional.flatMap(Person::getName);

        System.out.println(mapReturn); // Optional[Optional[HappyMan]]
        System.out.println(flatMapReturn); // Optional[HappyMan]
        System.out.println(mapReturn.get().equals(flatMapReturn.get())); // false
    }

    public void testStream() {
        List<String> myList = Stream.of("a", "b")
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println(myList); // ["A", "B"]
        List<List<String>> list = Arrays.asList(
        Arrays.asList("a"),
        Arrays.asList("b"));
        System.out.println(list); // [["a"], ["b"]]
        myList = list.stream()
                    .flatMap(Collection::stream)
                    .map(String::toUpperCase)
                    .collect(Collectors.toList());
        System.out.println(myList); // ["A", "B"]
    }

    public static void main(String args[]) {
        MapvsFlatMap mfm = new MapvsFlatMap();
        mfm.testOptional();
        mfm.testStream();
    }

}

class Person {
    private String name;
    private int age;

    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }

    public Optional<Integer> getAge() {
        return Optional.ofNullable(age);
    }

    public Person() {

    }
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

```


Reference:
* <http://www.baeldung.com/java-optional>
* <http://www.baeldung.com/java-difference-map-and-flatmap>
* <http://javarevisited.blogspot.com/2016/03/difference-between-map-and-flatmap-in-java8.html>
