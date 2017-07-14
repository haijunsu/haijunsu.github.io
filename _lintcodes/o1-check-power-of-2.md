---
title: O(1) Check Power of 2
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/o1-check-power-of-2/
tags: [Bit Manipulation]
---
## Question
Using *O(1)* time to check whether an integer *n* is a power of <span style="color: #C72541; background: #F9F2F4;">2 </span>.

**Example**
For <span style="color: #C72541; background: #F9F2F4;">n=4 </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>;
For <span style="color: #C72541; background: #F9F2F4;">n=5 </span>, return <span style="color: #C72541; background: #F9F2F4;">false </span>;

## Challenge
O(1) time

## Thinking
* If n < 0, return false
* Use & operator to compare n and n - 1.
Hit: 4 = '100' 3 = '11', 8 = '1000', 7 = '111' (binary value)

## Solution
#### Java
~~~ java
class Solution {
    /*
     * @param n: An integer
     * @return: True or false
     */
    public boolean checkPowerOf2(int n) {
        // write your code here
        if (n < 1) {
            return false;
        }
        return (n & (n - 1)) == 0;
    }
};

~~~
     
