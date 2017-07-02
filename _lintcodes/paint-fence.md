---
title: Paint Fence
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/paint-fence/
leetcode_link: /lintcode-tags/#Paid
tags: [Paid,Dynamic Programming]
---
## Question
There is a fence with <font style="color: #C72541; background: #F9F2F4;">n</font> posts, each post can be painted with one of the <font style="color: #C72541; background: #F9F2F4;">k</font> colors.
You have to paint all the posts such that no more than two adjacent fence posts have the same color.
Return the total number of ways you can paint the fence.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
*n* and *k* are non-negative integers. 
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">n</font>=3, <font style="color: #C72541; background: #F9F2F4;">k</font>=2 return 6
~~~
      post 1,   post 2, post 3
way1    0         0       1
way2    0         1       0
way3    0         1       1
way4    1         0       0
way5    1         0       1
way6    1         1       0
~~~

## Thinking
This is a dynamic programming. [Dynamic programming : paint fence algorithm](https://stackoverflow.com/questions/32444278/dynamic-programming-paint-fence-algorithm)
diff - number of combinations with different colors,
same - number of combinations with same colors.

For n = 1:
~~~
diff = k;
same = 0;
~~~
For n = 2:
~~~
diff = k * (k - 1);
same = k;
~~~
For n = 3:
~~~
diff = (k + k * (k - 1)) * (k - 1);
same = k * (k - 1);
~~~
Final formula
~~~
diff = (diff[i - 1] + diff[i - 2]) * (k - 1)
same = diff[i - 1] 
~~~
Total ways
~~~
total[n] = diff[n] + same[n]
         = (diff[n - 1] + diff[n - 2]) * (k - 1) + diff[n - 1]
         = (diff[n - 1] + same[n - 1]) * (k - 1) + (diff[n - 2] + diff[n - 3]) * (k - 1)
         = total[n - 1] * (k - 1) + total[n - 2] * (k - 1)
         = (tatal[n - 1] + total[n - 2]) * (k - 1)
~~~

## Solution
### Java
~~~ java
public class Solution {
    /**
     * @param n non-negative integer, n posts
     * @param k non-negative integer, k colors
     * @return an integer, the total number of ways
     */
    public int numWays(int n, int k) {
        // Write your code here
        if (n <= 0 || k <= 0) {
            return 0;
        }
        if (n == 1) {
            return k;
        } else if (n == 2) {
            return k * k; // k + k * (k - 1)
        } 
        int num1 = k;
        int num2 = k * k;
        int num = 3;
        while (num <= n) {
            int tmp  = num2;
            num2 = (k - 1) * (num2 + num1);
            num1 = tmp;
            ++num;
        }
        return num2;
    }
}
~~~
