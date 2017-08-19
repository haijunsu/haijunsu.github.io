---
title: Two Sum
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://leetcode.com/problems/two-sum/description/
tags: [Array]
---
## Question
Given an array of integers, return *indices* of the two numbers such that they add up to a specific target.
You may assume that each input would have ***exactly*** one solution, and you may not use the ***same*** element twice.

**Example:**
~~~
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
~~~

## Thinking
At first, I thought I need to sort the array and put their positions in a hashmap.
But there are some elements have same values. We may lose some position value.

Good way to use target subtract current value, the use the remain as key and query
from position map. If the value in map is not null, return remail position and current index.

## Solution
### Java
~~~ java 
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null) {
            return null;
        }
        Map<Integer, Integer> posMap = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
            int remain = target - nums[i];
            if (posMap.get(remain) != null) {
                return new int[]{posMap.get(remain), i};
            }
            posMap.put(nums[i], i);
        }
        return null; 
    }
}
~~~
