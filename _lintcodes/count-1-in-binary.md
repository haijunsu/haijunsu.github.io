---
title: Count 1 in Binary
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/count-1-in-binary/
tags: [Bit Manipulation,Binary]
---
## Question
Count how many *1* in binary representation of a 32-bit integer.

**Example**
Given *32*, return *1*
Given *5*, return *2*
Given *1023*, return *9*

## Thinking
We have to remember this.

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param num: an integer
     * @return: an integer, the number of ones in num
     */
    public int countOnes(int num) {
        // write your code here
        boolean isPositive = false;
        if (num >= 0) {
            isPositive = true;
        } else {
            // remove one 1 at high position
            // 0x6fffffff and 0x5fffffff also work.
            num = num & 0x3fffffff; 
        }
        num = ((num & 0xaaaaaaaa) >> 1) + (num & 0x55555555);
        num = ((num & 0xcccccccc) >> 2) + (num & 0x33333333);
        num = ((num & 0xf0f0f0f0) >> 4) + (num & 0x0f0f0f0f);
        num = ((num & 0xff00ff00) >> 8) + (num & 0x00ff00ff);
        num = ((num & 0xffff0000) >> 16) + (num & 0x0000ffff);
        if (!isPositive) {
            // add back missing 1s.
            num += 2;
        }
        return num;
    }
};
~~~
