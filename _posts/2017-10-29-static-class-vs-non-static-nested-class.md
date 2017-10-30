---
title: Static Class vs Non-static Nested Class
author: Haijun (Navy) Su
layout: post
tags: [java, static, nested, inner]
---
**Only nested classes (inner classes) can be static.**

* Nested static class doesn't need reference of outer class.
* Inner class can access both static and non-static members of outer class. A static class only can access static members of outer class.
* An instance of inner class cannot be created without an instance of outer class. An inner class can reference data and methods which defined in outer class.

Reference:
<http://www.geeksforgeeks.org/static-class-in-java/>
