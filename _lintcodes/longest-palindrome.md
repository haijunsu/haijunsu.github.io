---
title: Longest Palindrome
author: Haijun (Navy) Su
layout: page
leetcode_link: https://leetcode.com/problems/longest-palindrome/#/description
lintcode_link: https://www.lintcode.com/en/problem/longest-palindrome/
difficulty: Easy
tags: [Hash Table,Amazon]
---
## Question
Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.
This is case sensitive, for example *"Aa"* is not considered a palindrome here.
**Note** Assume the length of given string will not exceed **1010**.

**Example** 
Given s = *"abccccdd"* return *7*
One longest palindrome that can be built is *"dccaccd"*, whose length is *7*.

## Thinking
* All characters with even count number should be counted.
* Only one odd count number only can be used and only once.

## Review
Since we only need to count even characters and add one odd character, we can use set or map to store odd characters. Map is faster than set.

## Solution
#### Java (using Map, passed on leetcode)
~~~ java
public class Solution {
    public int longestPalindrome(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        Map<Character, Integer> cMap = new HashMap<Character, Integer>();
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char key = s.charAt(i);
            if (cMap.get(key) ==  null) {
                cMap.put(key, 1);
            } else {
                cMap.remove(key);
                count += 2;
            }
        }
        if (cMap.size() > 0) {
            return count + 1;
        }
        return count;
    }
}
~~~

#### Java (using Set, passed on lintcode)
~~~ java
public class Solution {
    /**
     * @param s a string which consists of lowercase or uppercase letters
     * @return the length of the longest palindromes that can be built
     */
    public int longestPalindrome(String s) {
        // Write your code here
        if (s == null || s.length() == 0) {
            return 0;
        }
        int count = 0;
        Set<Character> cSet = new HashSet<Character>();
        for (int i = 0; i < s.length(); i++) {
            if (cSet.contains(s.charAt(i))) {
                cSet.remove(s.charAt(i));
                count = count + 2;
            } else {
                cSet.add(s.charAt(i));
            }
        }
        if (cSet.size() > 0) {
            return count + 1;
        }
        return count;
    }
}
~~~

#### Java
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
