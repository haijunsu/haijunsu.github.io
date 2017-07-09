---
title: Coins in a Line III
author: Haijun (Navy) Su
layout: page
difficulty: Hard
lintcode_link: http://www.lintcode.com/en/problem/coins-in-a-line-iii/
tags: [Dynamic Programming,Array,Game Theory]
---
## Question
There are n coins in a line. Two players take turns to take a coin from one of the ends of the line until there are no more coins left. The player with the larger amount of money wins.

Could you please decide the first player will win or lose?

**Example**
Given array A = *[3,2,2]*, return *true*.
Given array A = *[1,2,4]*, return *true*.
Given array A = *[1,20,4]*, return *false*.

## Challenge
Follow Up Question:
If n is even. Is there any hacky algorithm that can decide whether first player will win or lose in O(1) memory and O(n) time?

## Thinkin
DP:
* State:
  dp[i][j]: max sum which can get between i and j by first player
* Function:
  dp[i][j] = sum[j] - sum[i - 1] - min(dp[i][j-1], dp[i+1],[j])
* Initialize
  dp[i][i] = sum[i] - sum[i - 1]
* Answer:
  dp[0][n]

<https://www.gitbook.com/book/aaronice/lintcode/details>
<https://aaronice.gitbooks.io/lintcode/content/dynamic_programming/coins_in_a_line_iii.html>

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
        int n = values.length;
        int[][] dp = new int[n + 1][n + 1];
        boolean[][] visited = new boolean[n + 1][n + 1];
        int[] sum = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            sum[i] = sum[i - 1] + values[n - i];
        }
        int max = maxValue(1, n, dp, visited, sum);
        return max > sum[n] / 2;

    }

    private int maxValue(int i, int j, int[][] dp, boolean[][] visited, int[]sum) {
        if (visited[i][j]) {
            return dp[i][j];
        }
        int subSum = sum[j] -sum[i - 1];
        if (i == j) {
            dp[i][j] = subSum;
        } else {
            dp[i][j] = subSum - Math.min(maxValue(i, j - 1, dp, visited, sum), maxValue(i + 1, j, dp, visited, sum));
        }
        visited[i][j] = true;
        return dp[i][j];
    }
}
~~~
