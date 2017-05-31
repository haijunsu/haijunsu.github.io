---
title: Partition Array
author: Haijun (Navy) Su
layout: page
---
## Question
Given an array <font style="color: #C72541; background: #F9F2F4;">nums </font> of integers and an int <font style="color: #C72541; background: #F9F2F4;">k </font>, partition the array (i.e move the elements in "nums") such that:

* All elements < *k* are moved to the *left*
* All elements >= *k* are moved to the *right*
Return the partitioning index, i.e the first index *i* nums[*i*] >= *k*.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
You should do really partition in array *nums* instead of just counting the numbers of integers smaller than k.
If all elements in *nums* are smaller than *k*, then return *nums.length*
{: .note}

**Example**
If nums = <font style="color: #C72541; background: #F9F2F4;">[3,2,2,1] </font>and <font style="color: #C72541; background: #F9F2F4;">k=2 </font>, a valid answer is <font style="color: #C72541; background: #F9F2F4;">1 </font>.

## Thinking
* The array is not ordered. At the end, it still not ordered but all emelents which is less than k are moved to the left.
* Inspace exchange
* Have a value 'pos' to save the first element which is greater or equals k.
* Compare adjacent two elements. (pre and cur)
  * pre < k and cur < k; pos = cur + 1 // Maybe next one is greater or equals k.
  * pre < k and cur >=k; pos = cur
  * pre >=k and cur < k; switch pos and cur, pos ++; // Note: at this time, pos may less than pre
  * pre >=k and cur >=K; no action needed.

## Solution
## Java
~~~ java
public class Solution {
	/** 
     *@param nums: The integer array you should partition
     *@param k: As description
     *return: The index after partition
     */
    public int partitionArray(int[] nums, int k) {
	    //write your code here
	    if (nums == null || nums.length == 0) {
	        return 0;
	    }
	    if (nums.length == 1) {
	        if (nums[0] < k) {
	            return 1;
	        } else {
	            return 0;
	        }
	    }
	    int tmp = nums[0];
	    int pos = 0;
	    if (tmp < k) {
	        pos = 1;
	    }
	    int index = 1;
	    while (index < nums.length) {
	        if (nums[index - 1] < k && nums[index] < k) {
	            pos = index + 1;
	        } else if (nums[index - 1] < k && nums[index] >= k) {
	            pos = index;
	        } else if (nums[index - 1] >= k && nums[index] < k) {
	            tmp = nums[pos];
	            nums[pos] = nums[index];
	            nums[index] = tmp;
	            ++pos;
	        } else if (nums[index - 1] >= k && nums[index] >= k) {
	            // noop
	        }
	        ++index;
	    }
	    return pos;
    }
}
~~~
