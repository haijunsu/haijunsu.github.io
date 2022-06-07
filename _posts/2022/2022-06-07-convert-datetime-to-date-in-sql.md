---
title: Convert Datetime to Date in SQL
author: Haijun (Navy) Su
layout: post
tags: [sql]
---

## Function `CONVERT()`

Syntax:

```
CONVERT(DATA, datetime_expression)
```

If the `datetime_expression` is not a valid datetime value, the function will raise an error.

```
SELECT CONVERT(DATA, GETDATE()) my_date;
```

## Function `TRY_CONVERT()`

It has same syntax as `CONVERT()` function. Unlike the `CONVERT()` function, the `TRY_CONVERT()` function returns NULL if the conversion fails.

```
SELECT TRY_CONVERT(DATA, GETDATE()) my_date;
```

## Function `CAST`

Syntax:

```
CAST(datetime_expression AS DATE)
```

Example:

```
SELECT CAST(GATEDATE() AS DATE) my_date;
```
