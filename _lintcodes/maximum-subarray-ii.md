---
title: Maximum Subarray II
author: Haijun (Navy) Su
layout: page
difficulty: Medium
lintcode_link: http://www.lintcode.com/en/problem/maximum-subarray-ii/
tags: [Subarray,Enumeration,Greedy,Array,Forward-Backward Traversal]
---
## Question
Given an array of integers, find two non-overlapping subarrays which have the largest sum.
The number in each subarray should be contiguous.
Return the largest sum.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
The subarray should contain at least one number
{: .note}

**Example**
For given <font style="color: #C72541; background: #F9F2F4;">[1, 3, -1, 2, -1, 2] </font>, the two subarrays are </font>[1, 3] </font>and <font style="color: #C72541; background: #F9F2F4;">[2, -1, 2] </font>or <font style="color: #C72541; background: #F9F2F4;">[1, 3, -1, 2] </font>and <font style="color: #C72541; background: #F9F2F4;">[2] </font>, they both have the largest sum <font style="color: #C72541; background: #F9F2F4;">7 </font>.

**Challenge**
Can you do it in time complexity *O(n)* ?

## Thinking
* Calculate [Maximum subarray](/lintcodes/maximum-subarray/) of each postion.
* If number behinds maximum subarry, it should filled with maximum value instead of actual sum value. For example, give [1,5,-1,2], maximum subarry value is 6 ([1,5]). The maximum subarry values are [1, 6, 6, 6].
* Add left and right values and find the maximum summary value.

Refer: <http://blog.csdn.net/nicaishibiantai/article/details/43637645>

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: An integer denotes the sum of max two non-overlapping subarrays
     */
    public int maxTwoSubArrays(ArrayList<Integer> nums) {
        // write your code
        if (nums == null || nums.isEmpty()) {
            return 0;
        }
        int size = nums.size();
        int[] leftSums = new int[size];
        int[] rightSums = new int[size];
        int leftsum = 0;
        int leftmax = Integer.MIN_VALUE;
        int rightsum = 0;
        int rightmax = Integer.MIN_VALUE;
        // calculate maximum subarray till left i or right size - i;
        for (int i = 0; i < size; i++) {
            if (leftsum <= 0) {
                leftsum = nums.get(i);
            } else {
                leftsum = nums.get(i) + leftsum;
            }
            if (leftsum > leftmax) {
                leftSums[i] = leftsum;
                leftmax = leftsum;
            } else {
                leftSums[i] = leftmax;
            }
            if (rightsum <= 0) {
                rightsum = nums.get(size -i - 1);
            } else {
                rightsum = nums.get(size -i - 1) + rightsum;
            }
            if (rightsum > rightmax) {
                rightSums[size -i - 1] = rightsum;
                rightmax = rightsum;
            } else {
                rightSums[size -i - 1] = rightmax;
            }
        }
        int max = leftSums[0] + rightSums[1];
        int sum = Integer.MIN_VALUE;
        for (int i = 1; i < size - 1; i ++) {
            sum = leftSums[i] + rightSums[i + 1];
            if (sum > max) {
                max = sum;
            }
        }
        return max;
    }
}
~~~
