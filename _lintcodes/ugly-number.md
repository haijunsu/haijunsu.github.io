---
title: Ugly Number
author: Haijun (Navy) Su
layout: page
---
### Question
Write a program to check whether a given number is an <font style="color: #C72541; background: #F9F2F4;">ugly number</font>
<font style="color: #C72541; background: #F9F2F4;">Ugly numbers</font> are positive numbers whose prime factors only include <font style="color: #C72541; background: #F9F2F4;">2, 3, 5 </font>. For example, <font style="color: #C72541; background: #F9F2F4;">6, 8 </font>l are ugly while <font style="color: #C72541; background: #F9F2F4;">14 </font> is not ugly since it includes another prime factor <font style="color: #C72541; background: #F9F2F4;">7 </font>.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
 Note that <font style="color: #C72541; background: #F9F2F4;">1 </font> is typically treated as an ugly number.
 {: .note}

### Solution
**Java**
~~~ java
public class Solution {
    /**
     * @param num an integer
     * @return true if num is an ugly number or false
     */
    public boolean isUgly(int num) {
        // Write your code here
        if (num < 1) {
            return false;
        }
        if (num == 1) {
            return true;
        }
        while (num % 5 == 0) {
            num = num / 5;
        }
        while (num % 3 == 0) {
            num = num / 3;
        }
        while (num % 2 == 0) {
            num = num / 2;
        }
        if (num == 1) {
            return true;
        }
        return false;
    }
}
~~~

