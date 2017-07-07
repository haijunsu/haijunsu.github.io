---
title: Climbing Stairs
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/climbing-stairs/
leetcode_link: https://leetcode.com/problems/climbing-stairs/#/description
tags: [Dynamic Programming]
---
## Question
You are climbing a stair case. It takes <span style="color: #C72541; background: #F9F2F4;">n </span>steps to reach to the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
Given <span style="color: #C72541; background: #F9F2F4;">n </span>will be a positive integer.
{: .note}

**Example**
Given an example *n=3 , 1+1+1=2+1=1+2=3*
return *3*

## Thinking
steps[n] = steps[n-1] + steps[n-2]
If n <= 1, return 1

## Solution
#### Java
~~~ java
public class Solution {
    public int climbStairs(int n) {
        if (n < 1) {
            return 1;
        }
        if (n < 3) {
            return n;
        }
        int step1 = 1;
        int step2 = 2;
        int stepn = 0;
        for (int i = 3; i <= n; i++) {
            int tmp = step2;
            step2 += step1;
            step1 = tmp;
        }
        return step2;
    }
}
~~~
