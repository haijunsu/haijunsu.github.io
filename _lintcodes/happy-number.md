---
title: Happy Number
author: Haijun (Navy) Su
layout: page
---
## Question
Write an algorithm to determine if a number is happy.

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

**Example**
10 is a happy number
~~~
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
~~~

## Thinking
* All negative and zero are not happy number.
* One is a happy number.
* Using % and / to get each number by postion.

## Solution
### java
~~~ java
public class Solution {
    /**
     * @param n an integer
     * @return true if this is a happy number or false
     */
    public boolean isHappy(int n) {
        // Write your code here
        if (n <= 0) {
            return false;
        }
        if (n == 1) {
            return true;
        }
        Map<Integer, Integer> sumMap = new HashMap<Integer, Integer>();
        sumMap.put(n, 1);
        while (true) {
           int sum = 0;
           if (n < 10) {
                sum = n * n;
            } else {
                int n1 = n % 10;
                int n2 = n / 10;
                while (n2 > 0) {
                    sum += n1 * n1;
                    n1 = n2 % 10;
                    n2 = n2 / 10;
                }
                sum += n1 * n1;
            }
            if (sum == 1) {
                return true;
            }
            if (sumMap.get(sum) != null) {
                return false;
            }
            sumMap.put(sum, 1);
            n = sum;
        }
    }
}
~~~
