---
title: Palindrome Number
author: Haijun (Navy) Su
layout: page
---
### Question
Check a positive number is a palindrome or not.
A palindrome number is that if you reverse the whole number you will get exactly the same number.

<i class="fa fa-info-circle" aria-hidden="true"></i> **Notice**
It's guaranteed the input number is a 32-bit integer, but after reversion, the number may exceed the 32-bit integer.
{: .note}

**Example**
*11, 121, 1, 12321* are palindrome numbers.
*23, 32, 1232* are not palindrome numbers.

### Thinking
* Resverse number and compare them (Math)
* Convert number to string and compare first half part with last half part (Greed)

### Java (Math)
~~~ java
public class Solution {
    /**
     * @param num a positive number
     * @return true if it's a palindrome or false
     */
    public boolean palindromeNumber(int num) {
        // Write your code here
        if (num < 0) {
            return false;
        }
        int sum = 0;
        int temp = num;
        while (temp > 0) {
            sum = sum * 10 + temp % 10; //mod get last number
            temp = temp / 10;
        }
        return sum == num;
    }
}
~~~

### Java (Greed)
~~~ java
public class Solution {
    /**
     * @param num a positive number
     * @return true if it's a palindrome or false
     */
    public boolean palindromeNumber(int num) {
        // Write your code here
        if (num < 0) {
            return false;
        }
        String numStr = Integer.toString(num);
        int numLen = numStr.length();
        for (int i = 0; i < (numLen/2); i++) {
            if (numStr.charAt(i) != numStr.charAt(numLen - i -1)) {
                return false;
            } 
        }
        return true;
    }
}
~~~
