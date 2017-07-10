---
title: Decode Ways
author: Haijun (Navy) Su
layout: page
difficulty: Medium
leetcode_link: https://leetcode.com/problems/decode-ways/#/description
lintcode_link: http://www.lintcode.com/en/problem/decode-ways/
tags: [Dynamic Programming,String]
---
## Question
A message containing letters from <span style="color: #C72541; background: #F9F2F4;">A-Z </span>is being encoded to numbers using the following mapping:
~~~
'A' -> 1
'B' -> 2
...
'Z' -> 26
~~~
Given an encoded message containing digits, determine the total number of ways to decode it.

**Example**
Given encoded message <span style="color: #C72541; background: #F9F2F4;">12 </span>, it could be decoded as <span style="color: #C72541; background: #F9F2F4;">AB </span>(1 2) or <span style="color: #C72541; background: #F9F2F4;">L </span>(12).
The number of ways decoding <span style="color: #C72541; background: #F9F2F4;">12 </span>is <span style="color: #C72541; background: #F9F2F4;">2 </span>.

## Thinking
DP
* State:
  dp[i] how many ways to decode to i character
* Function:
  dp[i] = 0 (if charAt(i - 1) is zero)
  dp[i] = dp[i - 1] (if charAt(i - 1) is non-zero)
  dp[i] = dp[i - 1] + dp [i - 2] if charAt(i - 1) + charAt (i - 2) between 10 and 26
* Initialize:
  dp[0] = 1
  dp[1] = 1
  if s == null or s == "" or s startsWith "0" return 0.
* Answer:
  dp[n]

Pay more attention about "0". I was confused by it.

## Solution:
#### Java
~~~ java
public class Solution {
    public int numDecodings(String s) {
        if (s == null || s.equals("") || s.startsWith("0")) {
            return 0;
        }
        int dp1 = 1;
        int dp2 = 1;
        int ways  = 1;
        for (int i = 2; i <= s.length(); i++) {
            int pre = s.charAt(i - 1) - '0';
            int pre2 = s.charAt(i - 2) - '0';
            int value = pre + pre2 * 10;
            if (pre == 0) {
                ways = 0;
            }
            if (value >= 10 && value <= 26) {
                ways = ways + dp2;
            }
            dp2 = dp1;
            dp1 = ways;
        }
        return ways;
    }
}
~~~

