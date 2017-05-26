---
title: Big Integer Addition
author: Haijun (Navy) Su
layout: page
---
### Question
Given two non-negative integers <font style="color: #C72541; background: #F9F2F4;">num1</font> and <font style="color: #C72541; background: #F9F2F4;">num2</font> represented as string, return the sum of <font style="color: #C72541; background: #F9F2F4;">num1</font> and <font style="color: #C72541; background: #F9F2F4;">num2</font>.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice 
1) The length of both num1 and num2 is < 5100.
2) Both num1 and num2 contains only digits 0-9.
3) Both num1 and num2 does not contain any leading zero.
4) You must not use any built-in BigInteger library or convert the inputs to integer directly.
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
        if (num1 == null && num2 == null) {
            return null;
        }
        if (num1 == null) {
            return num2;
        }
        if (num2 == null) {
            return num1;
        }
        StringBuilder sb = new StringBuilder();
        int index1 = num1.length() - 1;
        int index2 = num2.length() - 1;
        int carry = 0;
        int value = 0;
        while (index1 >= 0 || index2 >= 0) {
            if (index1 >= 0 && index2 >=0) {
                value = carry + Character.getNumericValue(num1.charAt(index1)) 
                            + Character.getNumericValue(num2.charAt(index2));
            } else if (index1 >= 0 && index2 < 0) {
                value = carry + Character.getNumericValue(num1.charAt(index1));
            } else if (index1 < 0 && index2 >= 0) {
                value = carry + Character.getNumericValue(num2.charAt(index2));
            } else {
                // noop
            }
            carry = value / 10;
            sb.insert(0, value % 10);
            --index1;
            --index2;
        }
        if (carry > 0) {
            sb.insert(0, carry);
        }
        return sb.toString();
    }
}
~~~
