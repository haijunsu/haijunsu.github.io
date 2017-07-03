---
title: Continuous Subarray Sum
author: Haijun (Navy) Su
layout: page
difficulty: Medium
lintcode_link: http://www.lintcode.com/en/problem/continuous-subarray-sum/
tags: [Subarray,Array]
---
## Question
Given an integer array, find a continuous subarray where the sum of numbers is the biggest. Your code should return the index of the first number and the index of the last number. (If their are duplicate answer, return anyone)

**Example**
Give <font style="color: #C72541; background: #F9F2F4;">[-3, 1, 3, -3, 4] </font>, return <font style="color: #C72541; background: #F9F2F4;">[1,4] </font>.

## Thinking
* Using DP, create an array to store all sum value
* sum[i] = A[i] + sum[i-1] (sum[i-1] is greater 0).
* sum[i] = A[i] (sum[i-1] is less than or equals 0). Neet to reset start index value.
* if (sum[i] > max) then, max = sum[i], startM equals current start value, endM equals current end value.

Refer: <https://aaronice.gitbooks.io/lintcode/content/array/maximum_subarray_sum.html>

![subarray sum](/images/Lintcode/subarray_sum.png)

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param A an integer array
     * @return  A list of integers includes the index of the first number and the index of the last number
     */
    public ArrayList<Integer> continuousSubarraySum(int[] A) {
        // Write your code here
        ArrayList<Integer> results = new ArrayList<Integer>();
        if (A == null || A.length == 0) {
            return results;
        }
        int start = 0;
        int end = 0;
        int startM = 0;
        int endM = 0;
        int sum = A[0];
        int max = sum;
        for (int i = 1; i < A.length; i++) {
            if (sum < 0) {
                start = i;
                end = i;
                sum = A[i];
            } else {
                end = i;
                sum = A[i] + sum;
            }
            if (sum > max) {
                max = sum;
                startM = start;
                endM = end;
            }
        }
        results.add(startM);
        results.add(endM);
        return results;
    }
}
~~~
