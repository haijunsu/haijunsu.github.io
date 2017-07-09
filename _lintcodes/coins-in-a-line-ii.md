---
title: Coins in a Line II
author: Haijun (Navy) Su
layout: page
difficulty: Medium
lintcode_link: http://www.lintcode.com/en/problem/coins-in-a-line-ii/#
tags: [Dynamic Programming,Array,Game Theory]
---
## Question
There are n coins with different value in a line. Two players take turns to take one or two coins from left side until there are no more coins left. The player who take the coins with the most value wins.

Could you please decide the **first** player will win or lose?

**Example**
Given values array A = <span style="color: #C72541; background: #F9F2F4;">[1,2,2] </span>, return <span style="color: #C72541; background: #F9F2F4;">true </span>.
Given A = <span style="color: #C72541; background: #F9F2F4;">[1,2,4] </span>, return <span style="color: #C72541; background: #F9F2F4;">false </span>.

## Thinking
DP:
* State
  dp[n]: picking up the n item, how to get maximum values for left items.
* Function
  * n: all items
  * sums[n]: sum of all items 
  * dp[n] = sums[n] - min(dp[n - 1], dp[n - 2]);
* Intialize:
  dp[0]: 0
  dp[1]: values[n - 1]
  dp[2]: values[n - 1] + values[n - 2]
* Answer
  dp[n]

<https://aaronice.gitbooks.io/lintcode/content/dynamic_programming/coins_in_a_line_ii.html>
<http://algorithms.tutorialhorizon.com/dynamic-programming-coin-in-a-line-game-problem/>

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param values: an array of integers
     * @return: a boolean which equals to true if the first player will win
     */
    public boolean firstWillWin(int[] values) {
        // write your code here
        if (values == null || values.length == 0) {
            return false;
        }
        int len = values.length;
        if (len < 3) {
            return true;
        }
        int[] dp  = new int[len + 1];
        boolean[] visited = new boolean[len + 1];
        int total = 0;
        int[] sums = new int[len + 1];
        for (int i = 1; i <= len; i++) {
            sums[i] = sums[i - 1] + values[len - i];
            total += values[len - i];
        }
        int sum = maxSum(len, len, dp, visited, sums, values);
        return sum > total / 2;
    }

    private int maxSum(int i, int len, int[] dp, boolean[] visited, int[] sums, int[] values) {
        if (visited[i]) {
            return dp[i];
        }
        if (i == 0) {
            dp[i] = 0;
        } else if (i == 1) {
            dp[i] = values[len - 1];
        } else if (i == 2) {
            dp[i] = values[len - 1] + values[len - 2];
        } else {
            dp[i] = sums[i] - Math.min(maxSum(i - 1, len, dp, visited, sums, values), maxSum(i - 2, len, dp, visited, sums, values));
        }
        visited[i] = true;
        return dp[i];
     }
}
~~~
