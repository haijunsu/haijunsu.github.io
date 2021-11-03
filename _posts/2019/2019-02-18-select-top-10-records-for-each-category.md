---
title: Select top 10 records for each category
author: Haijun (Navy) Su
layout: post
tags: [sql]
---

Return top 10 records from each section in one query. Section is some of columns in the table.

For example, we need to calculate top 10 records for each products.

Solution:

```sql
SELECT rs.Field1,rs.Field2
    FROM (
        SELECT Field1,Field2, Rank()
          over (Partition BY Section
                ORDER BY RankCriteria DESC ) AS Rank
        FROM table
        ) rs WHERE Rank <= 10


WITH TOPTEN AS (
    SELECT *, ROW_NUMBER()
    over (
        PARTITION BY [group_by_field]
        order by [prioritise_field]
    ) AS RowNo
    FROM [table_name]
)
SELECT * FROM TOPTEN WHERE RowNo <= 10
```
Source: <https://stackoverflow.com/questions/176964/select-top-10-records-for-each-category>
