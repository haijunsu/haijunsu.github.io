---
title: Intersection of Two Arrays II
author: Haijun (Navy) Su
layout: page
---
### Question
Given two arrays, write a function to compute their intersection.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
a) Each element in the result should appear as many times as it shows in both arrays.
b) The result can be in any order.
{: .note}

**Example**
Given nums1 = <font style="color: #C72541; background: #F9F2F4;">[1,2,9,2,1]</font>, nums2 = <font style="color: #C72541; background: #F9F2F4;">[2,8,2,3,1]</font>, return <font style="color: #C72541; background: #F9F2F4;">[1,2,2]</font>.

### Thinking

#### Method 1 (time complexity is O(n<sup>2</sup>))
* Using a temp array to store postion which has been found.
* Create an array with marked elements

#### Method 2 (time complexity is O(n))
* Using map to store each element counts 
* Check element in another array and save element whose value greater than 0;

### Java (method 2)
~~~ java
public class Solution {
    /**
     * @param nums1 an integer array
     * @param nums2 an integer array
     * @return an integer array
     */
    public int[] intersection(int[] nums1, int[] nums2) {
        // Write your code here
        int[] isc = new int[0];
        if (nums1 == null || nums2 == null) {
            return isc;
        }
        Map<Integer, Integer> countsMap = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums1.length; i++) {
            if (countsMap.get(nums1[i]) == null) {
                countsMap.put(nums1[i], 1);
            } else {
                countsMap.put(nums1[i], countsMap.get(nums1[i]) + 1);
            }
        }
        List<Integer> iscList = new ArrayList<Integer>();
        for (int i = 0; i < nums2.length; i++) {
            if (countsMap.get(nums2[i]) == null) {
                continue;
            } else {
                if (countsMap.get(nums2[i]) > 0) {
                    iscList.add(nums2[i]);
                    countsMap.put(nums2[i], countsMap.get(nums2[i]) - 1);
                }
            }
        }
        isc = new int[iscList.size()];
        for (int i = 0; i < iscList.size(); i++) {
            isc[i] = iscList.get(i);
        }
        return isc;
    }
}
~~~

### Java (method 1)

<i class="fa fa-info-circle" aria-hidden="true"></i> **Notice**
This is not a good solution since the case was run timeout.
{: .note}

~~~ java
public class Solution {
    /**
     * @param nums1 an integer array
     * @param nums2 an integer array
     * @return an integer array
     */
    public int[] intersection(int[] nums1, int[] nums2) {
        // Write your code here
        int[] isc = new int[0];
        if (nums1 == null || nums2 == null) {
            return isc;
        }
        int[] marks = new int[nums2.length];
        int totalNums = 0;
        for (int i = 0; i < nums1.length; i++) {
            for (int j = 0; j < nums2.length; j++) {
                if (nums1[i] == nums2[j] && marks[j] == 0) {
                    marks[j] = 1;
                    ++totalNums;
                    break;
                } 
            }
        }
        isc = new int[totalNums];
        int iscIndex = 0;
        for (int i = 0; i < marks.length; i++) {
            if (marks[i] == 1) {
                isc[iscIndex++] = nums2[i];
            }
        }
        return isc;
    }
}
~~~
