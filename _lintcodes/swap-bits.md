---
title: Swap Bits
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/swap-bits/
tags: [Bit Manipulation]
---
## Question
Write a program to swap odd and even bits in an integer with as few instructions as possible (e.g., bit 0 and bit 1 are swapped, bit 2 and bit 3 are swapped, and so on).

**Example**
5 = (101)2 => (1010)2 = 10

## Thinking
0x55555555 => 1010101010101010101010101010101
0xaaaaaaaa => 10101010101010101010101010101010
0x7fffffff => 1111111111111111111111111111111
[Bits operations Summary](/bits-operation-summary/)
[位操作基础篇之位操作全面总结](http://blog.csdn.net/morewindows/article/details/7354571)

## Solution
#### Java
~~~java
public class Solution {
    /**
     * @param x an integer
     * @return an integer
     */
    public int swapOddEvenBits(int x) {
        // Write your code here
        int odd = ((x & 0x55555555) << 1);
		// 0x7fffffff takes care of 1 in the highest position
        int even = ((x & 0xAAAAAAAA) >> 1) & 0x7fffffff; 
        return even|odd;    
    }
}
~~~

