---
title: Search for a Range
author: Haijun (Navy) Su
layout: page
difficulty: Medium
lintcode_link: http://www.lintcode.com/en/problem/search-for-a-range/#
leetcode_link: https://leetcode.com/problems/search-for-a-range/description/
tags: [Sorted Array,Binary Search,Array]
---
## Question
Given a sorted array of n integers, find the starting and ending position of a given target value.

If the target is not found in the array, return *[-1, -1]*.

**Example**
Given *[5, 7, 7, 8, 8, 10]* and target value *8*,
return *[3, 4]*.

## Challenge
O(log*n*) time

## Thinking
Use two binary search tree to find the Range

## Solution
### Java
~~~ java
class Solution {
    public int[] searchRange(int[] A, int target) {
        if (A == null || A.length == 0) {
            return new int[]{-1, -1};
        }
        int len = A.length;
        if (target < A[0] || target > A[len - 1]) {
            return new int[]{-1, -1};
        }
        int start = 0, end = len - 1, mid = 0, start2 = -1;
        // first binary search to find start index
        while (start + 1 < end) {
            mid =  start + (end - start) / 2;
            if (A[mid] == target) {
                if (start2 == -1) {
                    start2 = mid;
                }
                end = mid;
            } else if (A[mid] > target) {
                end = mid;
            } else {
                start = mid;
            }
        }
        if (A[start] == target) {
            // noop
        } else if (A[end] == target) {
            start = end;
        } else {
            return new int[]{-1, -1};
        }
        end = len - 1;
        // 2nd binary search to search right index
        while (start2 + 1 < end) {
            mid = start2 + (end - start2) / 2;
            if (A[mid] == target) {
                start2 = mid;
            } else if (A[mid] > target) {
                end = mid;
            } else {
                start2 = mid;
            }
        }
        if (A[end] == target) {
            // noop
        } else if (A[start2] == target) {
            end = start2;
        } else {
            return new int[]{-1, -1};
        }
        return new int[] {start, end};
    }
}
~~~
