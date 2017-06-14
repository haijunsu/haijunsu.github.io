---
title: Longest Increasing Subsequence
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/longest-increasing-subsequence/
leetcode_link: https://leetcode.com/problems/longest-increasing-subsequence/#/description
difficulty: Medium
tags: [Dynamic Programming,Binary Search]
---
## Question
Given an unsorted array of integers, find the length of longest increasing subsequence (LIS).

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice:
There may be more than one LIS combination, it is only necessary for you to return the length.
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">[10, 9, 2, 5, 3, 7, 101, 18] </font>, The longest increasing subsequence is <font style="color: #C72541; background: #F9F2F4;">[2, 3, 7, 101] </font>, therefore the length is <font style="color: #C72541; background: #F9F2F4;">4 </font>. 
For <font style="color: #C72541; background: #F9F2F4;">[5, 4, 1, 2, 3] </font>, the LIS is <font style="color: #C72541; background: #F9F2F4;">[1, 2, 3] </font>, return <font style="color: #C72541; background: #F9F2F4;">3 </font>
For <font style="color: #C72541; background: #F9F2F4;">[4, 2, 4, 5, 3, 7] </font>, the LIS is <font style="color: #C72541; background: #F9F2F4;">[2, 4, 5, 7] </font>, return <font style="color: #C72541; background: #F9F2F4;">4 </font>

## Clarification
What's the definition of longest increasing subsequence?
* The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence's elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous, or unique.
* <https://en.wikipedia.org/wiki/Longest_increasing_subsequence>

## Challenge
Time complexity O(n^2) or O(nlogn)

## Thinking
What is Dynamic Programming?
Breaking a big problems to a collection simpler subproblems. Sovling subproblems and saving result. The result can be used later instead of recomputing subproblem.

To sovle this prolbem, we need create an array to save every number's LIS. If current number is greater the previous number, current number's LIS is the max value of current number's LIS and the previous number's LIS pluses one. The time complexity is O(n^2)

To achive the O(nlogn), we need to use binary search to find it. THe idea is using an array to store an increasing sequence (NOT a real increasing sequence in the array. ONLY its length is the longest.) Each number looks the closet bigger value than it. If not find,  it adds itself at the end. Otherwise, it replaces the big value.
![longestIncreasingSubsequence](/images/Lintcode/longest-increasing-subsequence2.png)


## Solution
#### Java (O(nlogn), binary search, passed on leetcode)
~~~ java
public class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int lis = 0;
        int[] dp = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            int start = 0;
            int end = lis;
            while (start < end) {
                int mid = start + (end - start) / 2;
                if (dp[mid] < nums[i]) {
                    start = mid + 1;
                } else {
                    end = mid;
                }
            }
            dp[end] = nums[i];
            if (end == lis) {
                ++lis;
            }
        }
        return lis;
    }
}
~~~
#### Java (O(n^2), passed on lintcode)
~~~ java
public class Solution {
    /**
     * @param nums: The integer array
     * @return: The length of LIS (longest increasing subsequence)
     */
    public int longestIncreasingSubsequence(int[] nums) {
        // write your code here
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int[] lis = new int[nums.length];
        int maxlen = 0;
        for (int i = 0; i < nums.length; i++) {
            ++lis[i];
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if ((lis[j] + 1) > lis[i]) {
                        lis[i] = lis[j] + 1;
                    };
                }
            }
            if (maxlen < lis[i]) {
                maxlen = lis[i];
            }
        }
        return maxlen;
    }
}
~~~


