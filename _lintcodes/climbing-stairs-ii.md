---
title: Climbing Stairs II
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/climbing-stairs-ii/
tags: [Cracking The Coding Interview]
---
## Question
A child is running up a staircase with <span style="color: #C72541; background: #F9F2F4;">n </span>steps, and can hop either 1 step, 2 steps, or 3 steps at a time. Implement a method to count how many possible ways the child can run up the stairs.

**Example**
n = <span style="color: #C72541; background: #F9F2F4;">3 </span>
1+1+1=2+1=1+2=3=3
return <span style="color: #C72541; background: #F9F2F4;">4 </span>

## Thinking
step[n] = step[n-1] + step[n-2] + step[n-3]

## Solution
#### Java
~~~ java 
public class Solution {
    /**
     * @param n an integer
     * @return an integer
     */
    public int climbStairs2(int n) {

        // Write your code here
        if (n == 0) {
            return 1;
        }
        if (n < 3) {
            return n;
        }
        if (n == 3) {
            return 4;
        }
        int[] ways = new int[n + 1];
        ways[1] = 1;
        ways[2] = 2;
        ways[3] = 4;
        for (int i = 4; i <= n; i ++) {
            ways[i] = ways[i - 1] + ways[i - 2] + ways[i - 3];
        }
        return ways[n];
    }
}
~~~
