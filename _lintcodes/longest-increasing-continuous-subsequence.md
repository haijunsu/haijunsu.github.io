---
title: Longest Increasing Continuous Subsequence
author: Haijun (Navy) Su
layout: page
---
### Question
Give an integer array，find the longest increasing continuous subsequence in this array.

An increasing continuous subsequence:
* Can be from right to left or from left to right.
* Indices of the integers in the subsequence should be continuous.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
O(n) time and O(1) extra space.
{: .note}

**Example**
For <font style="color: #C72541; background: #F9F2F4;">[5, 4, 2, 1, 3] </font>, the LICS is <font style="color: #C72541; background: #F9F2F4;">[5, 4, 2, 1] </font>, return <font style="color: #C72541; background: #F9F2F4;">4 </font>.
For <font style="color: #C72541; background: #F9F2F4;">[5, 1, 2, 3, 4] </font>, the LICS is <font style="color: #C72541; background: #F9F2F4;">[1, 2, 3, 4] </font>, return <font style="color: #C72541; background: #F9F2F4;">4 </font>.

### Thinking
* Using two array to save sequences.
* Return the longest

### Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param A an array of Integer
     * @return  an integer
     */
    public int longestIncreasingContinuousSubsequence(int[] A) {
        // Write your code here
        if (A == null || A.length == 0) {
            return 0;
        }
        if (A.length == 1) {
            return 1;
        }
        List<Integer> lics = new ArrayList<Integer>();
        List<Integer> tmplics = new ArrayList<Integer>();
        boolean isIncreasing = A[0] <= A[1];
        int tmp = A[0];
        tmplics.add(tmp);
        for (int i = 1; i < A.length; i++) {
            if (A[i - 1] <= A[i]) {
                if (isIncreasing) {
                    tmplics.add(tmp);
                } else {
                    if (tmplics.size() > lics.size()) {
                        lics.clear();
                        lics.addAll(tmplics);
                    }
                    tmplics.clear();
                    tmplics.add(A[i -  1]);
                    tmplics.add(A[i]);
                    isIncreasing = true;
                }
            } else {
                if (!isIncreasing) {
                    tmplics.add(tmp);
                } else {
                    if (tmplics.size() > lics.size()) {
                        lics.clear();
                        lics.addAll(tmplics);
                    }
                    tmplics.clear();
                    tmplics.add(A[i -  1]);
                    tmplics.add(A[i]);
                    isIncreasing = false;
                }
            }
        }
        if (lics.size() < tmplics.size()){
            return tmplics.size();
        }
        return lics.size();
    }
}
~~~
