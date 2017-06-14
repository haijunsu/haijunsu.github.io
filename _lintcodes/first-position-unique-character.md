---
title: First Position Unique Character
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/first-position-unique-character/
leetcode_link: https://leetcode.com/problems/first-unique-character-in-a-string/#/solutions
difficulty: Easy
tags: [String,Amazon,Microsoft,Bloomberg]
---
## Question
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.
**Example**
Given s = *"lintcode"*, return *0*.
Given s = *"lovelintcode"*, return *2*.

## Thinking
* Convert character as int and store them in an array with original order
* Count array is using character's int value as index.

## Review
This is straight forward. It takes O(n) and goes through the string twice:
* Get the frequency of each character.
* Get the first character that has a frequency of one.

**Note:** ASCII has 256 characters. If we use array, we should define the length as 256. If we assume there are only lowcase characters, we can set the length as 26. The array index should be <font style="color: #C72541; background: #F9F2F4;">str.charAt(i) - 'a' </font>.

## Solution
#### Java (Review, passed on leetcode)
~~~ java
public class Solution {
    public int firstUniqChar(String s) {
        if (s == null || s.length() == 0) {
            return -1;
        }
        int[] countChars = new int[256];
        for (int i = 0; i < s.length(); i++) {
            ++countChars[s.charAt(i)];
        }
        for (int i = 0; i < s.length(); i++) {
            if (countChars[s.charAt(i)] == 1) {
                return i;
            }
        }
        return -1;
    }
}
~~~

#### Java (Review, assume the string only contain lowercase letters. passed on leetcode)
~~~ java
public class Solution {
    public int firstUniqChar(String s) {
        if (s == null || s.length() == 0) {
            return -1;
        }
        int[] countChars = new int[26];
        for (int i = 0; i < s.length(); i++) {
            ++countChars[s.charAt(i) - 'a'];
        }
        for (int i = 0; i < s.length(); i++) {
            if (countChars[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}
~~~

#### Java
~~~ java
public class Solution {
    /**
     * @param s a string
     * @return it's index
     */
    public int firstUniqChar(String s) {
        // Write your code here
        int[] sChars = new int[s.length()];
        int[] countChars = new int[128];
        for (int i = 0; i < s.length(); i++) {
            int value = (int) s.charAt(i);
            sChars[i] = value;
            countChars[value] = countChars[value] + 1;
        }
        for (int i = 0; i < s.length(); i++) {
            if (countChars[sChars[i]] == 1) {
                return i;
            }
        }
        return -1;
    }
}
~~~
