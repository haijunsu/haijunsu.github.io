---
title: MongoDB Group By Aggregate
author: Haijun (Navy) Su
layout: post
tags: [mongodb, mongo, group, aggregate]
---


### Single Field Group By & Count:

```
db.Request.aggregate([
    {"$group" : {_id:"$source", count:{$sum:1}}}
])
```

### Multiple Fields Group By & Count:

```
db.Request.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}}
])
```

### Multiple Fields Group By & Count with Sort using Field:

```
db.Request.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}},
    {$sort:{"_id.source":1}}
])
```

### Multiple Fields Group By & Count with Sort using Count:

```
db.Request.aggregate([
    {"$group" : {_id:{source:"$source",status:"$status"}, count:{$sum:1}}},
    {$sort:{"count":-1}}
])
```

Reference:
<https://stackoverflow.com/questions/23116330/mongodb-select-count-group-by>
