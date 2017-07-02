---
title: Palindrome Number
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/palindrome-number/
leetcode_link: https://leetcode.com/problems/palindrome-number/#/description
tags: [String,Integer]
---
## Question
Check a positive number is a palindrome or not.
A palindrome number is that if you reverse the whole number you will get exactly the same number.

<i class="fa fa-info-circle" aria-hidden="true"></i> **Notice**
It's guaranteed the input number is a 32-bit integer, but after reversion, the number may exceed the 32-bit integer.
{: .note}

**Example**
*11, 121, 1, 12321* are palindrome numbers.
*23, 32, 1232* are not palindrome numbers.

On Leetcode, it requires doing it without extra space.

Determine whether an integer is a palindrome. Do this without extra space.

**Some hints:**
Could negative integers be palindromes? (ie, -1)
If you are thinking of converting the integer to string, note the restriction of using extra space.
You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?
There is a more generic way of solving this problem.

## Thinking
* Resverse number and compare them (Math)
* Convert number to string and compare first half part with last half part (Greed)

## Review
* Find the divider for numbers at begin, then compare begin and end numbers.
* Each loop will remove begin number and end number ((x % div) / 10). (x % div) removes the first number, and divided by 10 remove the last number.

## Solution
#### Java (in place, leetcode passed)
~~~ java
public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) {
            return false;
        }
        if (x >= 0 && x < 10) {
            return true;
        }
        int div = 10;
        while (x / div > 9) {
            div *= 10;
        }
        while (x > 0) {
            int start = x / div;
            int end = x % 10;
            if (start != end) {
                return false;
            }
            x = (x % div) / 10;
            div = div / 100;
        }
        return true;
    }
}
~~~

#### Java (Math)
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

#### Java (String)
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
