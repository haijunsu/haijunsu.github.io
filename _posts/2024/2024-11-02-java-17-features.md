---
title: Java 17 features
author: Haijun (Navy) Su
layout: post
tags: [java]
---

## Sealed Classes and Interfaces

Sealed CLasses and Interfaces restrict with other classes and interfaces can extend or implement them. The provides a way to enforce certain design constraints and maintain better control over class hierarchy.

### Sealed classes example

```java
public sealed class Transaction permits Deposit, Withdrawal, Transfer {
    // common properties and methods for transactions
}

public final class Deposit extends Transaction {
    // Properties and methods for deposit
}

public final class Withdrawal extends Transaction {
    // Properties and methods for withdraw
}

public final class Transfer extends Transaction {
    // Properties and methods for transfer
}
```

### Sealed interfaces example

```java
public sealed interface Vehicle permits Car, Truck, Motorcycle {
    // common properties and methods for Vehicles
}

public final class Car implements Vehicle {
    // Properties and methods for car
}

public final class Truck implements Vehicle {
    // Properties and methods for truck
}

public final class  Motorcycle implements Vehicle {
    // Properties and methods for motorcycle
}
```

## Pattern Matching for `intanceof`

Pattern matching for `intanceof` allows for more concise and readable code when checking an object's type and extracting its files.

Example:

```java
Object obj = "Hello, World!";
if (obj instanceof String str) {
    System.out.println(str.toUpperCase());
}

public void processShape(Shape shape) {
    if (shape instanceof Circle circle) {
        System.out.println("Circle radius: " + circle.radius());
    } else if (shape instanceof Rectangle rectangle) {
        System.out.println("Rectangle width: " + rectangle.getWidth());
        System.out.println("Rectangle height: " + rectangle.getHeight());
    } else {
        System.out.println("Unknown shape");
    }
}
```

**Benefits:**

* Cleaner Code: Reduces the redundancy by combining the type checking and casting.
* Improved Readability: Makes it easier to follow the logic of the code.
* Type Safety: Helps avoid potential ClassCastException at runtime.

## Records

Records in Java provide a compact and clear syntax for creating classes that are primarily used to store data. Records simplify the creation of data-carrying classes by automatically generating essential methods like `equals()`, `hashCode()`, and `toString()`.

Example:

```java
public record Point(int x, int y) {}

public class Main {
    public static void main(String[] args) {
        Point point = new Point(5, 10);
        System.out.println(point.x()); // Output: 5
        System.out.println(point.y()); // Output: 10
        System.out.println(point); // Output: Point[x=5, y=10]
    }
}
```

**Benefits of Records:**

* Conciseness: Reduces boilerplate codes.
* Readability: Makes intentions clear; it's obvious that the class is just for storing data.
* Immutability: Records are implicitly final and all fields are private and final.

## Stronger Encapsulation

Stronger Encapsulation refers to the initiative to restrict access to internal APIs, even via reflection, to improve the stability and security of the platform. It's a way of ensuring that internal classes and members, which are meant to be hidden, remain inaccessible from outside the module.

**Benefits of Stronger Encapsulation**

* Improved Security: By preventing unauthorized access to internal classes and methods.
* Stability: By hiding internal APIs, it reduces the risk of breaking changes affecting external code.
* Better Modular Design: Encourages more thoughtful and deliberate design of module boundaries and dependencies.

## Enhanced Pseudo-Random Number Generators

New interfaces and implementations for Pseudo-Random Number Generators (PRNG) to support different algorithms interchangeably.

## New macOS Rendering Pipeline

This update implements a new rendering pipeline for the macOS using the Apple Metal API.

## Deprecation of the Applet API

The Applet API has been deprecated for removal, as many web browsers have already removed support for Java plugins.

## Vector API

This feature provides native support for vector operations, which can improve program performance using hardware acceleration. It is particularly useful for applications that involve heavy numerical computations, such as image processing, signal processing, encryption and bioinformatics.
