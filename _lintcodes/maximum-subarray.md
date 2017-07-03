---
title: Maximum Subarray
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/maximum-subarray/
leetcode_link: https://leetcode.com/problems/maximum-subarray/#/description
tags: [Subarray,LinkedIn,Enumeration,Greedy,Array]
---
## Question
Given an array of integers, find a contiguous subarray which has the largest sum.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
The subarray should contain at least one number.
{: .note}

**Example**
Given the array <font style="color: #C72541; background: #F9F2F4;">[−2,2,−3,4,−1,2,1,−5,3] </font>, the contiguous subarray <font style="color: #C72541; background: #F9F2F4;">[4,−1,2,1] </font>has the largest sum = <font style="color: #C72541; background: #F9F2F4;">6 </font>.

**Challenge**
Can you do it in time complexity O(n)?

**More practice:**
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## Thinking
Same as the problem [Continous Subarray Sum](/lintcodes/continuous-subarray-sum/)

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: A integer indicate the sum of max subarray
     */
    public int maxSubArray(int[] nums) {
        // write your code
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int max = nums[0];
        int sum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (sum < 0) {
                sum = nums[i];
            } else {
                sum += nums[i];
            }
            if (sum > max) {
                max = sum;
            }
        }
        return max;
    }
}
~~~
