---
title: Substring Anagrams
author: Haijun (Navy) Su
layout: page
---
## Question
Given a string *s* and a **non-empty** string *p*, find all the start indices of *p*'s anagrams in *s*.
Strings consists of lowercase English letters only and the length of both strings *s* and *p* will not be larger than 40,000.
The order of output does not matter.

**Example**
Given s = *"cbaebabacd"* p = *"abc"*
return **[0, 6]**
~~~
  The substring with start index = 0 is "cba", which is an anagram of "abc".
  The substring with start index = 6 is "bac", which is an anagram of "abc".
~~~

## Thinking
* Substring for each step
* check whether anagrams is
* Pay attention about time complexity

## Java
~~~ java
public class Solution {
    /**
     * @param s a string
     * @param p a non-empty string
     * @return a list of index
     */
    public List<Integer> findAnagrams(String s, String p) {
        // Write your code here
        List<Integer> anagrams = new ArrayList<Integer>();
        // check null values
        if (s == null || p == null) {
            return anagrams;
        }
        // no anagrams if s length is less than p.length
        if (s.length() < p.length()) {
            return anagrams;
        }
        for (int i = 0; i <= (s.length() - p.length()); i++) {
            String sub = s.substring(i, i + p.length());
            if (isAnagrams(sub, p)) {
                anagrams.add(i);
            }
        }
        return anagrams;
    }
    
    private boolean isAnagrams(String s1, String s2) {
        if (s1.equals(s2)) {
            return true;
        }
        int[] s1Chars = new int[s1.length()];
        int[] countChars = new int[128];
        for (int i = 0; i < s1Chars.length; i++) {
            s1Chars[i] = (int) s1.charAt(i);
            int s2Char = (int) s2.charAt(i);
            countChars[s1Chars[i]] = countChars[s1Chars[i]] + 1;
            countChars[s2Char] = countChars[s2Char] - 1;
        }
        for (int index : s1Chars) {
            if (countChars[index] != 0) {
                return false;
            }
        }
        return true;
    }
    
}
~~~
