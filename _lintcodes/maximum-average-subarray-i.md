---
title: Maximum Average Subarray I
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://leetcode.com/problems/maximum-average-subarray-i/description/
tags: [Array]
---
## Question
Given an array consisting of *n* integers, find the contiguous subarray of given length *k* that has the maximum average value. And you need to output the maximum average value.

**Example 1:**
~~~
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
~~~

<i class="fa fa-info-circle" aria-hidden="true"></i> Note
1 <= *k* <= *n* <= 30,000.
Elements of the given array will be in the range [-10,000, 10,000].
{: .note}

## Thinking
1. Using loop in loop to get the max value. Max initial value is Integer.MIN_VALUE (Note: ***Not Dobule.MIN_VALUE***, Time complexity is O(n^2) and timeout)
2. Summery first and then find max average
3. Using previous sum result to find max Average

## Solution
### Java
#### solution 2
~~~java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        if (nums == null || nums.length < k || k < 1) {
            throw new IllegalArgumentException("Invalid input. There is no solution");
        }
        double sums[] = new double[nums.length];
        sums[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            sums[i] = sums[i - 1] + nums[i];
        }
        double maxAvg = sums[k -1] / k;
        for (int i = k; i < nums.length; i++) {
            double sum = sums[i] - sums[i - k];
            maxAvg = Math.max(maxAvg, sum / k);    
        }
        return maxAvg;
    }
}
~~~
#### Solution 3
~~~ java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        if (nums == null || nums.length < k || k < 1) {
            throw new IllegalArgumentException("Invalid input. There is no solution");
        }
        double sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        double maxAvg = sum / k;
        for (int i = k; i < nums.length; i++) {
            sum += (nums[i] - nums[i - k]);
            maxAvg = Math.max(maxAvg, sum / k);    
        }
        return maxAvg;
    }
}
~~~
