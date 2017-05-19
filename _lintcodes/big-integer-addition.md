---
title: Big Integer Addition
author: Haijun (Navy) Su
layout: page
---
### Question
Given two non-negative integers <font style="color: #C72541; background: #F9F2F4;">num1</font> and <font style="color: #C72541; background: #F9F2F4;">num2</font> represented as string, return the sum of <font style="color: #C72541; background: #F9F2F4;">num1</font> and <font style="color: #C72541; background: #F9F2F4;">num2</font>.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice 
{: .note}
* The length of both num1 and num2 is < 5100.
* Both num1 and num2 contains only digits 0-9.
* Both num1 and num2 does not contain any leading zero.
* You must not use any built-in BigInteger library or convert the inputs to integer directly.
{: .note}

**Example**
Given num1 = <font style="color: #C72541; background: #F9F2F4;">"123"</font>, num2 = <font style="color: #C72541; background: #F9F2F4;">"45"</font>
return <font style="color: #C72541; background: #F9F2F4;">"168"</font>

### Thinking
Just think about human addition method. 

### Java
~~~ java
public class Solution {
    /**
     * @param num1 a non-negative integers
     * @param num2 a non-negative integers
     * @return return sum of num1 and num2
     */
    public String addStrings(String num1, String num2) {
        // Write your code here
        if (num1 == null) {
            return num2;
        }
        if (num2 == null) {
            return num1;
        }
        int len1 = num1.length();
        int len2 = num2.length();
        int maxLen = Math.max(len1, len2);
        int tensValue = 0;
        StringBuilder sb = new StringBuilder();
        int n1 = 0;
        int n2 = 0;
        int sum = 0;
        for (int i = 0; i < maxLen; i++) {
            if (i < len1 && i < len2) {
                n1 = Integer.valueOf(String.valueOf(num1.charAt(len1 - i - 1)));
                n2 = Integer.valueOf(String.valueOf(num2.charAt(len2 - i - 1)));
             } else if (i < len1 && i >= len2) {
                n1 = Integer.valueOf(String.valueOf(num1.charAt(len1 - i - 1)));
             } else if (i >= len1 && i < len2) {
                n2 = Integer.valueOf(String.valueOf(num2.charAt(len2 - i - 1)));
             } 
            sum = tensValue + n1 + n2;
            sb.insert(0, sum % 10);
            tensValue = sum / 10;
            n1 = 0;
            n2 = 0;
            sum = 0;
        }
        if (tensValue > 0) {
            sb.insert(0, tensValue);
        }
        return sb.toString();
    }
}
~~~
