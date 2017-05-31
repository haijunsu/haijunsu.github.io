---
title: First Position Unique Character
author: Haijun (Navy) Su
layout: page
---
## Question
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.
**Example**
Given s = *"lintcode"*, return *0*.
Given s = *"lovelintcode"*, return *2*.

## Thinking
* Convert character as int and store them in an array with original order
* Count array is using character's int value as index.

## Java
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
