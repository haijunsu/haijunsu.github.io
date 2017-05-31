---
title: Two Strings Are Anagrams
author: Haijun (Navy) Su
layout: page
---
## Question
Write a method <font style="color: #C72541; background: #F9F2F4;">anagram(s,t) </font>to decide if two strings are anagrams or not.

**Example**
Given s = <font style="color: #C72541; background: #F9F2F4;">"abcd" </font>, t = <font style="color: #C72541; background: #F9F2F4;">"dcab" </font>, return <font style="color: #C72541; background: #F9F2F4;">true </font>.
Given s = <font style="color: #C72541; background: #F9F2F4;">"ab" </font>, t = <font style="color: #C72541; background: #F9F2F4;">"ab" </font>, return <font style="color: #C72541; background: #F9F2F4;">true </font>.
Given s = <font style="color: #C72541; background: #F9F2F4;">"ab" </font>, t = <font style="color: #C72541; background: #F9F2F4;">"ac" </font>, return <font style="color: #C72541; background: #F9F2F4;">false </font>.

## Clarification
What is *Anagram*?
- Two strings are anagram if they can be the same after change the order of characters.

## Thinking
* Using map to store the count of each character.
* Character in first string is adding while character in second string is substrcting.
* Every character count must be 0 in the map.

## Solution
### Java
~~~ java
public class Solution {
    /**
     * @param s: The first string
     * @param b: The second string
     * @return true or false
     */
    public boolean anagram(String s, String t) {
        // write your code here
        if (s == null && t == null) {
            return true;
        }
        if ((s == null && t != null) || (s != null && t == null)) {
            return false;
        }
        if (s.length() != t.length()) {
            return false;
        }
        
        Map<Character, Integer> countMap = new HashMap<Character, Integer>();
        for (int i = 0; i < s.length(); i++) {
            char skey = s.charAt(i);
            char tkey = t.charAt(i);
            if (countMap.get(skey) == null) {
                countMap.put(skey, 1);
            } else {
                countMap.put(skey, (countMap.get(skey) + 1));
            }
            if (countMap.get(tkey) == null) {
                countMap.put(tkey, -1);
            } else {
                countMap.put(tkey, (countMap.get(tkey) - 1));
            }
        }
        Set<Character> keys = countMap.keySet();
        for (Character key : keys) {
            if (countMap.get(key) != 0) {
                return false;
            }
        }
        return true;
    }
};
~~~

