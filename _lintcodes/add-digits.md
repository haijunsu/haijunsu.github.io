---
title: Add Digits
author: Haijun (Navy) Su
layout: page
---
## Question
Given a non-negative integer <font style="color: #C72541; background: #F9F2F4;">num</font>, repeatedly add all its digits until the result has only one digit.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">num</font> = 38.
The process is like: <font style="color: #C72541; background: #F9F2F4;">3 + 8 = 11</font>, <font style="color: #C72541; background: #F9F2F4;">1 + 1 = 2</font>. Since <font style="color: #C72541; background: #F9F2F4;">2</font> has only one digit, return <font style="color: #C72541; background: #F9F2F4;">2</font>.

## Thinking
Using mod(%) get first digit
Using divid(/) get other digits until digit is less than 10

## Java
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
