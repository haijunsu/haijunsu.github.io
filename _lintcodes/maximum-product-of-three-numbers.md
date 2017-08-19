---
title: Maximum Product of Three Numbers
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://leetcode.com/problems/maximum-product-of-three-numbers/description/
tags: [Array]
---
## Question
Given an integer array, find three numbers whose product is maximum and output the maximum product.

**Example 1:**
~~~
Input: [1,2,3]
Output: 6
~~~
**Example 2:**
~~~
Input: [1,2,3,4]
Output: 24
~~~

<i class="fa fa-info-circle" aria-hidden="true"></i>Note:
1) The length of the given array will be in range [3,104] and all elements are in the range [-1000, 1000].
2) Multiplication of any three numbers in the input won't exceed the range of 32-bit signed integer.
{: .note}

## Thinking
1. Sort numbers and find production of three maximum nubmers or production of maximum number and two minimum numbers (negative numbers)
2. Scan number arrays to find three maximun numbers and two minimum numbers

## Solution
### Java
#### Sort numbers
~~~ java
class Solution {
    public int maximumProduct(int[] nums) {
        if (nums == null || nums.length < 3) {
            throw new IllegalArgumentException("Input is null or array length less than 3. There is no solution.");
        }
        Arrays.sort(nums);
        int k = nums.length;
        int max1 = nums[k - 1] * nums[k -2] * nums[k - 3];
        int max2 = nums[k - 1] * nums[0] * nums[1]; // handle negative numbers.
        return Math.max(max1, max2);
    }
}  
~~~
#### Scan numbers
~~~ java
class Solution {
    public int maximumProduct(int[] nums) {
        if (nums == null || nums.length < 3) {
            throw new IllegalArgumentException("Input is null or array length less than 3. There is no solution.");
        }
        int min1 = Integer.MAX_VALUE;
        int min2 = Integer.MAX_VALUE;
        int max1 = Integer.MIN_VALUE;
        int max2 = Integer.MIN_VALUE;
        int max3 = Integer.MIN_VALUE;
        for (int value : nums) {
            if (value <= min1) {
                min2 = min1;
                min1 = value;
            } else if (value <= min2) {
                min2 = value;
            }
            if (value >= max1) {
                max3 = max2;
                max2 = max1;
                max1 = value;
            } else if (value >= max2) {
                max3 = max2;
                max2 = value;
            } else if (value >= max3) {
                max3 = value;
            }
        }
        return Math.max(max1 * max2 * max3, max1 * min1 * min2);
    }
}  
~~~
