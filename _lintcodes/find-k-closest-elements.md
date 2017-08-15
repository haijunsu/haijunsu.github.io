---
title: Find K Closest Elements
author: Haijun (Navy) Su
layout: page
difficulty: Medium
leetcode_link: https://leetcode.com/contest/leetcode-weekly-contest-45/problems/find-k-closest-elements/
tags: [Array]
---
## Question
Given a sorted array, two integers *k* and *x*, find the *k* closest elements to *x* in the array. The result should also be sorted in ascending order. If there is a tie, the smaller elements are always preferred.

**Example 1:**
~~~
Input: [1,2,3,4,5], k=4, x=3
Output: [1,2,3,4]
~~~
**Example 2:**
~~~
Input: [1,2,3,4,5], k=4, x=-1
Output: [1,2,3,4]
~~~

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
The value k is positive and will always be smaller than the length of the sorted array.
Length of the given array is positive and will not exceed 10^4
Absolute value of elements in the array and x will not exceed 10^4
{: .note}

## Thinking
1. Using a hashmap to store distance and nums, distance values are keys
2. If list size less than k, add distance and values into map and result lists
3. If list size equals k and distance less than the longest distance, remove the longest distance and add current value
4. Space O(k) Time O(nlogn)

Another solution is using binary search find the closest value position, the check back and forward k items. It is faster.
The idea is to find the first number which is equal to or greater than *x* in *arr*. Then, we determine the indices of the start and the end of a subarray in *arr*, where the subarray is our result. The time complexity is *O(logn + k)*.
In the following code, *arr[index]* is the first number which is euqal to or geater than *x* (if all numbers are less than *x*, *index* is *arr.size()*), and the result is *arr[i+1, i+2, ... j]*.
see: <https://discuss.leetcode.com/topic/99270/java-c-very-simple-binary-search-solution>

## Solution
### Java
#### My own solution
~~~ java
public class Solution {
    public List<Integer> findClosestElements(List<Integer> arr, int k, int x) {
        if (arr == null || arr.size() == k) {
            return arr;
        }
        int distance = Integer.MAX_VALUE;
        Map<Integer, Integer> distMap = new TreeMap<Integer, Integer>();
        List<Integer> result = new ArrayList<Integer>();
        for (Integer value : arr) {
            Integer absDist = Math.abs(x - value);
            if (distance == Integer.MAX_VALUE) {
                distance = absDist;
                distMap.put(distance, value);
                result.add(value);
                continue;
            }
            if (result.size() == k) {
                if (distance > absDist) {
                    Integer rmValue = distMap.remove(distance);
                    result.remove(rmValue);
                    distMap.put(absDist, value);
                    if (result.contains(rmValue)) {
                        distMap.put(distance, rmValue); 
                    } else {
                        SortedSet<Integer> keys = (SortedSet) distMap.keySet();
                        distance = keys.last();
                    }
                    result.add(value);
                }
            } else {
                if (distance < absDist) {
                    distance = absDist;
                }
                distMap.put(absDist, value);
                result.add(value);
            }
         }
         return result;
    }
}
~~~

#### Using binary search
~~~ java
public class Solution {
    public List<Integer> findClosestElements(List<Integer> arr, int k, int x) {
        if (arr == null || arr.size() <= k) {
            return arr;
        }
        int index = Collections.binarySearch(arr, x);
        if (index < 0) {
            index = - index - 1; // pay attation the index value. See javadoc
        }
        int i = index - 1;
        int j = index;
        while (k > 0) {
            if (i < 0 || (j < arr.size() && Math.abs(x - arr.get(i)) > Math.abs(x - arr.get(j)))) {
                ++j;
            } else {
                --i;
            }
            --k;
        }
        return arr.subList(i + 1, j);
    }
}
~~~
