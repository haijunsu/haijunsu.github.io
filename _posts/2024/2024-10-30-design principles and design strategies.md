---
title: Design Principles and Design Strategies
author: Haijun (Navy) Su
layout: post
tags: [design software]
---

## Design Principles

### SOLID Principles

* Single Responsibility Principle (SRP): a class should have only one reason to change.
* Open/Close Principle (OCP): Software entities (classes, modules, functions) should be open for extension but closed for modification.
* Liskov Substitution Principle:
  * Subtypes must be substitutable for their base types without altering the correctness of the program
  * An object of a superclass should be replaceable with an object of any of its subclasses without breaking the application.
* Interface Segeration Principle (ISP): Client should not be forced to depend on interfaces they don't use.
* Dependency Inversion Principle (DIP):
  * High-level modules should not depend on low-level modules. Both modules should dependent on abstractions
  * Abstraction should not depend details.
  * Details should depend on abstractions.

### KISS (Keep it Simple, Stupid)

This principle advocates for simplicity in design. Complex solutions are often harder to understand, maintain, and debug.

### DRY (Don't Repeat Yourself)

Avoid duplicating code by extracting common functionality into reusable components or functions.

### YAGNI (You Ain't Gonna Need It)

Only implement features or code that is necessary at the moment. Avoid adding functionality based on speculation about future needs.

### Separation of Concerts

Divide the software into distinct modules or components, each adressing a specific concern or responsibility. This promotes modularity and maintainability.

## Design Strategies

### Object-Oriented Design (OOD)

OOD promotes designing software systems using objects, classes and inheritance to model real-world entities and relationships.

### Functional Programming (FP)

FP focuses on the use of pure functions and immutability to create robust and predictable software systems.

### Design patterns

Design patternsare reusable solutions to common software design problems. Examples include Singleton, Factory, Observer, and Strategy patterns.

### Component-based Architecture

Divide the software into smaller, resuable components that can be independently developed, tested, and maintained. This promotes scalability and code re-useability.

### Microservices Architecture

Decompose a large application into smaller, independent microservices that communicate through well-defined APIs. This approach promotes flexibility and scalability.

### Service-Oriented Architecture (SOA)

SOA involves designing software systems as a collection of loosely coupled services that can be independently deployed and scaled.

### Model-View-Controller (MVC)

MVC is a design pattern that separates the application into three components: Model (data), View (user interface), and Controller (logic). This promotes separation of concerns and maintainability.

### Test-Driven Development (TTD)

Write tests before writing code to ensure that the softare meets its requirements. TOD helps in creating robust and well-tested software.

### Agile and Scrum

Agile methodologies, such as Scrum, emphasize iterative and incremental development, frequent feedback, and collaboration among cross-functional teams.

### Domain-Driven Design (DDD)

DDD focus on aliging software design with the domain it serves, emphasizing rich domain models and ubiquitous languages.