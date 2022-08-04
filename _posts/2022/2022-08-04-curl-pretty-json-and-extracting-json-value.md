---
title: CURL pretty JSON and extracting JSON value
author: Haijun (Navy) Su
layout: post
tags: [curl]
---

#### Pretty JSON

```

curl -s https://api.github.com/users/haijunsu | python -m json.tool

```

#### Extracting JSON value

```

curl -s https://api.github.com/users/haijunsu | python -c "import sys,json; print(json.load(sys.stdin)['name'])"

```
