---
title: Split Array into Consecutive Subsequences
author: Haijun (Navy) Su
layout: page
difficulty: Medium
leetcode_link: https://leetcode.com/contest/leetcode-weekly-contest-45/problems/split-array-into-consecutive-subsequences/
tags: [Array,Subsquences,Consecutive Subsequences]
---
## Question
You are given an integer array sorted in ascending order (may contain duplicates), you need to split them into several subsequences, where each subsequences consist of at least 3 consecutive integers. Return whether you can make such a split.

**Example 1**
~~~
Input: [1,2,3,3,4,5]
Output: True
Explanation:
You can split them into two consecutive subsequences : 
1, 2, 3
3, 4, 5
~~~

**Example 2**
~~~
Input: [1,2,3,3,4,4,5,5]
Output: True
Explanation:
You can split them into two consecutive subsequences : 
1, 2, 3, 4, 5
3, 4, 5
~~~

**Example 3**
~~~
Input: [1,2,3,4,4,5]
Output: False
~~~

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
The length of the input is in range of [1, 10000]
{: .note}

## Thinking
At first, I have no idea about it. I thought I should use DP to solve it. But I
couldn't find the base case.
Check the discuss, I think this is the good idea:
1. Save all numbers in a map and count them
2. In another loop, check each number and make sure it can be added to exist subsquences or create a new one.
3. If the number cannot create a new subsequences  or be added to  an exist subsquence . return false.

## Solution
### Java
~~~ java
public class Solution {
    public boolean isPossible(int[] nums) {
        Map<Integer, Integer> freqMap = new HashMap<Integer, Integer>();
        Map<Integer, Integer> nextMap = new HashMap<Integer, Integer>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        for (int num : nums) {
            if (freqMap.get(num) == 0) {
                continue; // All this number has been used for subsquence.
            } else if (nextMap.getOrDefault(num, 0) > 0) {
				// add to an exist subsquence
                nextMap.put(num, nextMap.getOrDefault(num, 0) - 1);
                nextMap.put(num + 1, nextMap.getOrDefault(num + 1, 0) + 1);    
            } else if (freqMap.getOrDefault(num + 1, 0) > 0 && freqMap.getOrDefault(num + 2, 0) > 0) {
				// create a new subsquence
                freqMap.put(num + 1, freqMap.get(num + 1) - 1);
                freqMap.put(num + 2, freqMap.get(num + 2) - 1);
                nextMap.put(num + 3, nextMap.getOrDefault(num + 3, 0) + 1); 
            } else {
                return false;
            }
            freqMap.put(num, freqMap.get(num) - 1);
        }
        
        return true;
    }
}
~~~

