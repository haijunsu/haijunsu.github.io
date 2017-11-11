---
title: Lambda Function in Python
author: Haijun (Navy) Su
layout: post
tags: [python, lambda]
---
## Sort in non-standard way
In python2
```python
>>> a = ['floor', 'house', 'room', 'roof']
>>> a.sort(lambda x,y: cmp(len(x), len(y)))
>>> a
['room', 'roof', 'floor', 'house']
>>>
```
In Python3
```python
>>> a = ['floor', 'house', 'room', 'roof']
>>> a.sort(key=lambda x: (len(x)))
>>> a
['room', 'roof', 'floor', 'house']
>>>
```
## Closures -  functions evaluated in an environment containing bound variables
In python2
```python
>>> def comp(threshold):
...     return lambda x: x < threshold
...
>>> func_a = comp(10)
>>> func_b = comp(20)
>>> print func_a(5), func_a(9), func_a(15), func_a(25)
True True False False
>>> print func_b(5), func_b(9), func_b(15), func_b(25)
True True True False
```
In python3
```python
>>> def comp(threshold):
...     return lambda x: x < threshold
...
>>> func_a = comp(10)
>>> func_b = comp(20)
>>> print(func_a(5), func_a(9), func_a(15), func_a(25))
True True False False
>>> print(func_b(5), func_b(9), func_b(15), func_b(25))
True True True False
```
## Mapping - performs a function call on each element of a list.
In python2
```python
>>> a = [1, 2, 3, 4, 5, 6]
>>> print map(lambda x: x*x, a)
[1, 4, 9, 16, 25, 36]
```
In python3
```python
>>> a = [1, 2, 3, 4, 5, 6]
>>> [item for item in map(lambda x: x*x, a)]
[1, 4, 9, 16, 25, 36]
```
## Filter -  returns all elements from a list that evaluate True when passed to a certain function.
In python2
```python
>>> a = [1, 2, 3, 4, 5, 6]
>>> filter(lambda x: x % 2 == 0, a)
[2, 4, 6]
```
In python3
```python
>>> a = [1, 2, 3, 4, 5, 6]
>>> list(filter(lambda x: x % 2 == 0, a))
[2, 4, 6]
```
## Reduce - The fold/reduce function runs over all elements in a list (usually left-to-right), accumulating a value as it goes.
```python
>>> from functools import reduce
>>> a = [1, 2, 3, 4, 5, 6]
>>> reduce(lambda x, y: x+y, a)
21
>>>
```
This performs `(((((1 + 2) + 3) + 4) + 5) + 6) = 21`

Reference:
<https://en.wikipedia.org/wiki/Anonymous_function>
