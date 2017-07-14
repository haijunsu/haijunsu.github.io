---
title: Merge Sorted Array
author: Haijun (Navy) Su
difficulty: Easy
layout: page
leetcode_link: https://leetcode.com/problems/merge-sorted-array/#/description
lintcode_link: http://www.lintcode.com/en/problem/merge-two-sorted-arrays/
tags: [Array,Sorted Array]
---
## Question
There are tow version of this question.
* Leetcode version (I meet it in Bloomberg)
Given two sorted integer arrays *nums1* and *nums2*, merge *nums2* into *nums1* as one sorted array.

<i class="fa fa-info-circle" aria-hidden="true"></i>Note:
You may assume that *nums1* has enough space (size that is greater or equal to *m + n*) to hold additional elements from *nums2*. The number of elements initialized in *nums1* and *nums2* are *m* and *n* respectively.
{: .note}

* Lintcode version
Merge two given sorted integer array A and B into a new sorted integer array.

**Example**
A= <span style="color: #C72541; background: #F9F2F4;">[1,2,3,4] </span>
B= <span style="color: #C72541; background: #F9F2F4;">[2,4,5,6] </span>
return <span style="color: #C72541; background: #F9F2F4;">[1,2,2,3,4,4,5,6] </span>

## Thinking
* Leetcode needs to compare from end to begin, always move bigger value to end

## Solution
#### Java (leetcode)
~~~ java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int index = m + n;
        for (int i = m - 1, j = n - 1; i>= 0 || j >= 0; ) {
            if (i < 0) {
                nums1[--index] = nums2[j--];
            } else if (j < 0) {
                nums1[--index] = nums1[i--];
            } else {
                if (nums1[i] > nums2[j]) {
                    nums1[--index] = nums1[i--];
                } else {
                    nums1[--index] = nums2[j--];
                }
            }
        }
    }
}
~~~
#### Java (lintcode)
~~~ java
class Solution {
    /**
     * @param A and B: sorted integer array A and B.
     * @return: A new sorted integer array
     */
    public int[] mergeSortedArray(int[] A, int[] B) {

        // Write your code here
        if (A == null) {
            return B;
        }
        if (B == null) {
            return A;
        }
        int[] newArray = new int[A.length + B.length];
        int index = 0;
        for (int i = 0, j = 0; i < A.length || j < B.length;) {
            if (i >= A.length) {
                newArray[index++] = B[j++];
            } else if (j >= B.length) {
                newArray[index++] = A[i++];
            } else {
                if (A[i] < B[j]) {
                    newArray[index++] = A[i++];
                } else {
                    newArray[index++] = B[j++];
                }
            }
        }
        return newArray;
    }
}
~~~
