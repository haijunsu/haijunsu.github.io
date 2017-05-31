---
title: Classical Binary Search
author: Haijun (Navy) Su
layout: page
---
## Question
Find any position of a target number in a sorted array. Return -1 if target does not exist.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">[1, 2, 2, 4, 5, 5] </font>.
For target = <font style="color: #C72541; background: #F9F2F4;"> 2 </font>, return 1 or 2.
For target = <font style="color: #C72541; background: #F9F2F4;"> 5 </font>, return 4 or 5.
For target = <font style="color: #C72541; background: #F9F2F4;"> 6 </font>, return -1.

## Solution
### Java (Binary search)
~~~ java
public class Solution {
    /**
     * @param nums: An integer array sorted in ascending order
     * @param target: An integer
     * @return an integer
     */
    public int findPosition(int[] nums, int target) {
        // Write your code here
        // invalid input
        if (nums == null || nums.length == 0) {
            return -1;
        }
        // out of range
        if (target < nums[0] || target > nums[nums.length - 1]) {
            return -1;
        }
        int start = 0;
        int end = nums.length - 1;
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return -1;
    }
}
~~~

### Java (Interpolation search)
~~~ java
public class Solution {
    /**
     * @param nums: An integer array sorted in ascending order
     * @param target: An integer
     * @return an integer
     */
    public int findPosition(int[] nums, int target) {
        // Write your code here
        // invaild input
        if (nums == null || nums.length == 0) {
            return -1;
        }
        // out of range
        if (target < nums[0] || target > nums[nums.length - 1]) {
            return -1;
        }
        int start = 0;
        int end = nums.length - 1;
        while (start <= end) {
            // avoid divid by zero error
            if (nums[end] == nums[start] || start == end) {
                if (nums[start] != target) {
                    return -1;
                } else {
                    return start;
                }
            }
            int mid = Math.min(end, start + (target / (nums[end] - nums[start])) / (end - start));
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return -1;
    }
}
~~~
