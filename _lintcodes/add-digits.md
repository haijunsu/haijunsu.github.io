---
title: Add Digits
author: Haijun (Navy) Su
layout: page
lintcode_link: http://www.lintcode.com/en/problem/add-digits/
leetcode_link: https://leetcode.com/problems/add-digits/#/description
difficulty: Easy
tags: [Mathematics,Math]
---
## Question
Given a non-negative integer <font style="color: #C72541; background: #F9F2F4;">num</font>, repeatedly add all its digits until the result has only one digit.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">num</font> = 38.
The process is like: <font style="color: #C72541; background: #F9F2F4;">3 + 8 = 11</font>, <font style="color: #C72541; background: #F9F2F4;">1 + 1 = 2</font>. Since <font style="color: #C72541; background: #F9F2F4;">2</font> has only one digit, return <font style="color: #C72541; background: #F9F2F4;">2</font>.

**Challenge**
Could you do it without any loop/recursion in O(1) runtime?

## Thinking
General solution:
Using mod(%) get first digit
Using divid(/) get other digits until digit is less than 10

Challenge solution:
It is a [Digital root](https://en.wikipedia.org/wiki/Digital_root) question. The formula is:
~~~
dr(n) = 1 + ((n-1) % 9)
~~~

## Solution
#### Java (Challenge solution)
~~~
public class Solution {
    /**
     * @param num a non-negative integer
     * @return one digit
     */
    public int addDigits(int num) {
        // Write your code here
        if (num < 10) {
            return num;
        }
        return (num - 1) % 9 + 1;
    }
}
~~~
#### Java (Normal solution)
~~~ java
public class Solution {
    /**
     * @param num a non-negative integer
     * @return one digit
     */
    public int addDigits(int num) {
        // Write your code here
        if (num < 10) {
            return num;
        }
        
        while (num >= 10) {
            int tmp = 0;
            while (num >= 10) {
                tmp = tmp + num % 10;
                num = num /10;
            }
            num = num + tmp;
        }
        return num;
    }
}
~~~
