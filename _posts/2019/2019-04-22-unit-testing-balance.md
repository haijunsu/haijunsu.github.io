---
title: Unit Testing Balance
author: Haijun (Navy) Su
layout: post
tags: [testing]
---

### Consider writing unit tests:

* When the logic behind the method is complex enough that you feel you need to test extensively to verify that it works.
* When a particular code function breaks and it takes longer than a minute or so to fix it.
* Whenever it takes less time to write a unit test to verify that code works than to start up the system, log in, recreate your scenario, etc.

### Consider avoiding unit tests:

* When elaborate frameworks need to be created or installed (such as mock objects and dependency injection) just to get the tests to work.
* When the tests are applied to code that, if broken, has very little bearing whatsoever on the overall software quality.
* When the costs of maintaining the set of tests are higher than the costs of maintaining the actual product code.

Source: <https://www.javaworld.com/article/2892225/how-just-about-everyone-gets-unit-testing-wrong.html>
