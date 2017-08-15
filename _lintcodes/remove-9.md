---
title: Remove 9
author: Haijun (Navy) Su
layout: page
difficulty: Hard
leetcode_link: https://leetcode.com/contest/leetcode-weekly-contest-45/problems/remove-9/
tags: [Mathematics]
---
## Question
Start from integer 1, remove any integer that contains 9 such as 9, 19, 29...
So now, you will have a new integer sequence: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...
Given a positive integer *n*, you need to return the n-th integer after removing. Note that 1 will be the first integer.

**Example**
~~~
Input: 9
Output: 10
~~~
Hint: n will not exceed *9 x 10^8*.

## Thinking
This is a radix problems. The radix is 9. How to convert the value form radix 10 to radix 9?
see: [二、八、十、十六进制转换（图解篇）](http://www.cnblogs.com/gaizai/p/4233780.html)

## Solution
#### Java
~~~ java
public class Solution {
    public int newInteger(int n) {
        int num = 0;
        int base = 1;
        while (n > 0) {
            num = base * (n % 9) + num;
            n = n / 9;
            base = base * 10;
        }
        return num;
    }
}
~~~
