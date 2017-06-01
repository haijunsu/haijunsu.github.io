---
title: Big Integer multiplication
author: Haijun (Navy) Su
layout: page
---
## Question
Given two non-negative integers <font style="color: #C72541; background: #F9F2F4;">num1 </font>and <font style="color: #C72541; background: #F9F2F4;">num2 </font>represented as strings, return the product of <font style="color: #C72541; background: #F9F2F4;">num1 </font>and <font style="color: #C72541; background: #F9F2F4;">num2 </font>

**Example**
* The length of both num1 and num2 is < 110.
* Both num1 and num2 contains only digits 0-9.
* Both num1 and num2 does not contain any leading zero.
* You must not use any built-in BigInteger library or convert the inputs to integer directly.

## Thinking
Multipling tow numbers can be done with two steps:
* Using first number multiples every single digits in the second number sub results.
* Sum sub results (Big number addition)

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param num1 a non-negative integers
     * @param num2 a non-negative integers
     * @return return product of num1 and num2
     */
    public String multiply(String num1, String num2) {
        // Write your code here
        if (num1 == null || num2 == null) {
            return null;
        }
        
        int len1 = num1.length();
        int len2 = num2.length();
        if (len1 == 0) {
            return num2;
        }
        if (len2 == 0) {
            return num1;
        }
        if (num1.equals("0") || num2.equals("0")) {
            return "0";
        }
        String[] subResults = new String[len2];
        for (int i = len2 - 1; i >= 0; i--) {
            int val2 = Character.getNumericValue(num2.charAt(i));
            if (val2 != 0) {
                int carry = 0;
                StringBuilder sb = new StringBuilder();
                for (int j = len1 - 1; j >= 0; j--) {
                    int val1 = Character.getNumericValue(num1.charAt(j));
                    int sum = val1 * val2 + carry;
                    carry = sum / 10;
                    sb.insert(0, sum % 10);
                }
                if (carry > 0) {
                    sb.insert(0, carry);
                }
                for (int k = 0; k < len2 - 1 - i; k++) {  // add zeros at end if needed.
                    sb.append("0");
                }
                subResults[i] = sb.toString();
            } else {
                subResults[i] = "0";
            }
        }
        String value = subResults[0];
        for (int i = 1; i < len2; i++) {
            if (subResults[i].equals("0")) {
                continue;
            }
            StringBuilder sb = new StringBuilder();
            int index1 = value.length() - 1;
            int index2 = subResults[i].length() - 1;
            int carry = 0;
            while (index1 >= 0 || index2 >= 0) {
                int val1 = 0;
                int val2 = 0;
                if (index1 >= 0 && index2 >= 0) {
                    val1 = Character.getNumericValue(value.charAt(index1));
                    val2 = Character.getNumericValue(subResults[i].charAt(index2));
                } else if (index1 < 0 && index2 >= 0) {
                    val2 = Character.getNumericValue(subResults[i].charAt(index2));
                } else if (index1 >= 0 && index2 < 0) {
                    val1 = Character.getNumericValue(value.charAt(index1));
                }
                int sum  = val1 + val2 + carry;
                carry = sum / 10;
                sb.insert(0, sum % 10);
                --index1;
                --index2;
            }
            if (carry > 0) {
                sb.insert(0, carry);
            }
            value = sb.toString();
        }
        return value;
    }
}
~~~
