---
title: Plus One
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://leetcode.com/problems/plus-one/description/
tags: [Array]
---
## Question
Given a non-negative integer represented as a *non-empty* array of digits, plus one to the integer.

You may assume the integer do not contain any leading zero, except the number 0 itself.

The digits are stored such that the most significant digit is at the head of the list.

## Thinking
1. Digit 1234 is represented as [1, 2, 3, 4].
2. If add one, just need to check the value of each postion. If value is less than 9, value plus one and return. Otherwise, set value as zero and continue.
3. If all digits are 9 such as 999 [9,9,9],  create a new array and set first digit as 1.

## Solution
### Java
~~~ java
class Solution {
    public int[] plusOne(int[] digits) {
        if (digits == null || digits.length == 0) {
            throw new IllegalArgumentException("Input illegal and no solution.");
        }
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                ++digits[i];
                return digits;
            }
            digits[i] = 0;
        }
        // handle all digits is 9, such as 9, 99, 999 ...
        int[] digits2 = new int[digits.length + 1];
        digits2[0] = 1;
        return digits2;
    }
}
~~~
