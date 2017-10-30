---
title: Override or Overload Static Methods in Java
author: Haijun (Navy) Su
layout: post
tags: [java, override, overload, static]
---
Static methods can be overloaded but cannot be overrode.

**Overriding**: the method in the subclass has exactly same method name and parameters.
**Overloading**: the method in the subclass or same class has same method name and different parameters.

* For class (or static) methods, the method according to the type of reference is called, not according to the abject being referred, which means method call is decided at compile time.
* For instance (or non-static) methods, the method is called according to the type of object be referred, not according to the type of reference, which means method calls is decided at run time.
* An instance method cannot override a static method, and a static method cannot hide an instance method.
* In a subclass (or Derived Class), we can overload the methods inherited from the superclass. Such overload methods neither hide or override the superclass methods - they are new methods, unique to the subclass.

References:
<http://www.geeksforgeeks.org/can-we-overload-or-override-static-methods-in-java/>


