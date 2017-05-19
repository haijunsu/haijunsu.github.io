---
title: Strings Homomorphism
author: Haijun (Navy) Su
layout: page
---
### Question
Given two strings s and t, determine if they are isomorphic.
Two strings are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

<i class="fa fa-info-circle" aria-hidden="true"></i>**Note** You may assume both s and t have the *same length*.
{: .note}

**Example**
Given s = *"egg"*, t = *"add"*, return *true*.
Given s = *"foo"*, t = *"bar"*, return *false*.
Given s = *"paper"*, t = *"title"*, return *true*.

### Thinking
* same length (not null)
* one array save charactor's int value
* another array save charactor's postions in the string
* check each charactor's postion values

### Java
~~~ java
public class Solution {
    /**
     * @param s a string
     * @param t a string
     * @return true if the characters in s can be replaced to get t or false
     */
    public boolean isIsomorphic(String s, String t) {
        // Write your code here
        if (s == null || t == null) {
            return false;
        }
        if (s.length() != t.length()) {
            return false;
        }
        // char value as postions, point to PosValue array
        int[] sPos = new int[s.length()];
        int[] tPos = new int[s.length()];
        // count of char valuess
        int[] sPosValue = new int[128];
        int[] tPosValue = new int[128];
        for (int i = 0; i < s.length(); i++) {
            int sIndex = (int) s.charAt(i);
            int tIndex = (int) t.charAt(i);
            sPos[i] = sIndex;
            tPos[i] = tIndex;
            sPosValue[sIndex] = sPosValue[sIndex] * 10 * i + 1;
            tPosValue[tIndex] = tPosValue[tIndex] * 10 * i + 1;
        }
        for (int i = 0; i < sPos.length; i++) {
            if (sPosValue[sPos[i]] != tPosValue[tPos[i]]) {
                return false;
            }
        }
        return true;
    }
}
~~~
