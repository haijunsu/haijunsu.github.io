---
title: Reverse Pairs
author: Haijun (Navy) Su
layout: page
---
## Question
For an array A, if i < j, and A [i] > A [j], called (A [i], A [j]) is a reverse pair.
return total of reverse pairs in A.

**Example**
Given A = <font style="color: #C72541; background: #F9F2F4;">[2, 4, 1, 3, 5] </font>, <font style="color: #C72541; background: #F9F2F4;">(2, 1), (4, 1), (4, 3) </font>are reverse pairs. return <font style="color: #C72541; background: #F9F2F4;">3 </font>

## Thinking
Use two loops to find the count. Outside loop is from <font style="color: #C72541; background: #F9F2F4;">0 </font> to <font style="color: #C72541; background: #F9F2F4;">A.length - 1 </font> and inside loop is from <font style="color: #C72541; background: #F9F2F4;">i + 1 </font> to <font style="color: #C72541; background: #F9F2F4;">A.length </font>.

## Solution
### Java
~~~ java
public class Solution {
    /**
     * @param A an array
     * @return total of reverse pairs
     */
    public long reversePairs(int[] A) {
        // Write your code here
        if (A == null || A.length == 1) {
            return 0;
        }
        int count = 0;
        for (int i = 0; i < A.length - 1; i++) {
            for (int j = i + 1; j < A.length; j++) {
                if (A[i] > A[j]) {
                    ++count;
                }
            }
        }
        return count;
    }
}
~~~
