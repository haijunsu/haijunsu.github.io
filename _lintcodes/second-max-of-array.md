---
title: Second Max of Array
author: Haijun (Navy) Su
layout: page
---
### Question
Find the second max number in a given array.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
You can assume the array contains at least two numbers.
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">[1, 3, 2, 4] </font>, return <font style="color: #C72541; background: #F9F2F4;">3 </font>.
Given <font style="color: #C72541; background: #F9F2F4;">[1, 2] </font>, return <font style="color: #C72541; background: #F9F2F4;">1 </font>.

### Thinking
* Max value can be duplicate values

### Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param nums: An integer array.
     * @return: The second max number in the array.
     */
    public int secondMax(int[] nums) {
        /* your code */
        if (nums == null || nums.length < 2) {
            // Input error. Throw an exception
            // throw new Exception("At least 2 numbers in the array")
        }
        int max = Math.max(nums[0], nums[1]);
        int second = Math.min(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] >= max) {
                second = max;
                max = nums[i];
            }
        }
        return second;
    }
}
~~~
