---
title: Coins in a Line
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/coins-in-a-line/
tags: [Greedy,Dynamic Programming,Array,Game Theory]
---
## Question
There are n coins in a line. Two players take turns to take one or two coins from right side until there are no more coins left. The player who take the last coin wins.

Could you please decide the **first** play will win or lose?

**Example**
n = <span style="color: #C72541; background: #F9F2F4;">1 </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>.
n = <span style="color: #C72541; background: #F9F2F4;">2 </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>.
n = <span style="color: #C72541; background: #F9F2F4;">3 </span>, return <span style="color: #C72541; background: #F9F2F4;">false </span>.
n = <span style="color: #C72541; background: #F9F2F4;">4 </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>.
n = <span style="color: #C72541; background: #F9F2F4;">5 </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>.

## Challenge
O(n) time and O(1) memory

## Thinking
* DP: Check previous 2 values, if both are true, return false. If has false, return true.
* O(1) time and O(1) memory: If n is 3 times, first will lose.

## Solution
#### Java (DP)
~~~ java
public class Solution {
    /**
     * @param n: an integer
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int n) {
        // write your code here
        if (n < 1) {
            return false;
        }
        if (n > 0 && n < 3) {
            return true;
        }
        boolean win1 = true;
        boolean win2 = true;
        for (int i = 3; i <= n; i ++) {
            boolean tmp = win2;
            win2 = !(win1 && win2);
            win1 = tmp;
        }
        return win2;
    }
}
~~~

#### Java (O(1) time and space)
~~~ java
public class Solution {

    /**
     * @param n: an integer
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int n) {
        // write your code here
        if (n < 1) {
            return false;
        }
        if (n % 3 != 0) {
            return true;
        }
        return false;
    }
}
~~~
