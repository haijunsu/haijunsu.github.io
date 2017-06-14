---
title: Intersection of Two Arrays
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/intersection-of-two-arrays/
leetcode_link: https://leetcode.com/problems/intersection-of-two-arrays/#/description
tags: [Binary Search,Hash Table,Two Pointers,Sort]
difficulty: Easy
---
## Question
Given two arrays, write a function to compute their intersection.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
a) Each element in the result must be unique.
b) The result can be in any order.
{: .note}

**Example**
Given *nums1* = <font style="color: #C72541; background: #F9F2F4;">[1, 2, 2, 1]</font>, *nums2* = <font style="color: #C72541; background: #F9F2F4;">[2, 2]</font>, return <font style="color: #C72541; background: #F9F2F4;">[2]</font>.

## Challenge
Can you implement it in three different algorithms?

## Thinking
* Convert nums1 to hashmap
* Check nums2 values. If the value is a hashmap key, save it to a Set
* Convert Set to array 

## Review
We also can convert nums1 to set.
Other soultions: 
* Sort two arrays first and use two pointers for two arrays to compare element's values.
* Sort the nums1 and then use binary Search
[Other solutions on leetcode](https://leetcode.com/problems/intersection-of-two-arrays/#/solutions)
[Other solutions](http://www.cnblogs.com/grandyang/p/5507129.html)

## Solution
#### Java (review, using set, passed on leetcode)
~~~ java
public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        if (nums1 == null || nums2 == null) {
            return new int[0];
        }
        Set<Integer> els = new HashSet<Integer>();
        for (int num : nums1) {
            els.add(num);
        }
        Set<Integer> inters = new HashSet<Integer>();
        for (int num : nums2) {
            if (els.contains(num)) {
                inters.add(num);
            }
        }
        int[] rtns = new int[inters.size()];
        int index = 0;
        for (int el : inters) {
            rtns[index++] = el;
        }
        return rtns;
    }
}
~~~
#### Java
~~~ java
public class Solution {
    /**
     * @param nums1 an integer array
     * @param nums2 an integer array
     * @return an integer array
     */
    public int[] intersection(int[] nums1, int[] nums2) {
        // Write your code here
        if (nums1 == null || nums2 == null) {
            return new int[0];
        }
        Map<Integer, Integer> countsMap = new HashMap<Integer, Integer>();
        for (int value : nums1) {
            Integer count = countsMap.get(value);
            if (count == null) {
                countsMap.put(value, 1);
            }
        }
        Set<Integer> results = new TreeSet<Integer>();
        for (int value : nums2) {
            Integer count = countsMap.get(value);
            if (count != null) {
                results.add(value);
            }
        }
        int[] isc = new int[results.size()];
        int index = 0;
        for (Iterator<Integer> elements = results.iterator(); elements.hasNext(); ) {
            isc[index++] = elements.next();
        }
        return isc;
    }
}
~~~
