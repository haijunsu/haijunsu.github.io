---
title: Linux rename file names
author: Haijun (Navy) Su
layout: post
tags: [bash linux rename]
---

Just use the for loop: (rename txt file to csv file)
```shell
{% raw %}
for j in *.txt; do mv -v "${j}" "${j%.txt}.csv"; done
{% raw %}
```
