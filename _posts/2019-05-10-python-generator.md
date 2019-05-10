---
title: Python Generator
author: Haijun (Navy) Su
layout: post
tags: [python]
---

### What is generator in Python?
* A simple way of creating iterators
* A function with `yield` statement instead of `return` statement. It can have mutilple `yield` statements.
* Iterator methods `__iter__()` and `__next__()` are implemented automatically.
* `yield` statement pauses the function saving all its states and later continues from there on successive calls.
* When called, it returns an object (iterator) but does not start execution immediately.

### Benifits
* Easy to implement. No need to warry about methods `__iter__()` and `__next__()`
* Memory efficient
* Represent infinite stream
* Pipling generator

### Understand more
`[x for x in range(5)]` ==> list

`(x for x in range(5))` ==> generator

`tuple(range(5))` ==> tuple


### References
<https://www.programiz.com/python-programming/generator>

<https://medium.freecodecamp.org/python-list-comprehensions-vs-generator-expressions-cef70ccb49db>
