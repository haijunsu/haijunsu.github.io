---
title: Find Square numbers
author: Haijun (Navy) Su
layout: page
difficulty: Easy
tags: []
---
## Question
Gave a number of row and column, find the numbers of square such as (1x1) (2x2) ...

#### Python
~~~python
def countSquares(m, n):                                                                                                                                                       
    points = []                                                                                                                                                               
    for i in range(m + 1):                                                                                                                                                        
        for j in range(n + 1):                                                                                                                                                    
            points.append((i, j))
    print(len(points)) 
    pointSet = set()                                                                                                                                                          
    for i, point in enumerate(points):                                                                                                                                             
        for j, point2 in enumerate(points):
            # print(point2)
            if j > i:                                                                                                                                                         
                if (point2[0] - point[0]) == (point2[1] - point[1]):                                                                                                             
                    pointSet.add((point, point2))  
    return len(pointSet)  
~~~

