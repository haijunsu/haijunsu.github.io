---
title: Longest Palindrome
author: Haijun (Navy) Su
layout: page
---
## Question
Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.
This is case sensitive, for example *"Aa"* is not considered a palindrome here.
**Note** Assume the length of given string will not exceed **1010**.

**Example** 
Given s = *"abccccdd"* return *7*
One longest palindrome that can be built is *"dccaccd"*, whose length is *7*.

## Thinking
* All charactors with even count number should be counted.
* Only one odd count number only can be used and only once.

## Java
~~~ java
public class Solution {
    /**
     * @param s a string which consists of lowercase or uppercase letters
     * @return the length of the longest palindromes that can be built
     */
    public int longestPalindrome(String s) {
        // Write your code here
        int[] counts = new int[128];
        for (int i = 0; i < s.length(); i++) {
            int pos = (int)s.charAt(i);
            counts[pos] = counts[pos] + 1;
        }
        boolean isFoundOdd = false;
        int len = 0;
        for (int i = 0; i < counts.length; i++) {
            if (counts[i] > 0) {
                if (counts[i] % 2 == 0) {
                    len = len + counts[i];
                } else {
                    len = len + counts[i] - 1;
                    isFoundOdd = true;
                }
            }
        }
        if (isFoundOdd) {
            len = len + 1;
        }
        return len;
    }
}
~~~
