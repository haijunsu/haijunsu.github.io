---
title: Longest Substring with At Most K Distinct Characters
author: Haijun (Navy) Su
layout: page
lintcode_link: http://www.lintcode.com/en/problem/longest-substring-with-at-most-k-distinct-characters/
leetcode_link: /lintcode-tags/#Paid
difficulty: Medium
tags: [String,Hash Table,Two Pointers,Paid]
---
## Question
Given a string s, find the length of the longest substring T that contains at most k distinct characters.

**Example**
For example, Given s = <font style="color: #C72541; background: #F9F2F4;"> "eceba", k = 3 </font>,
T is <font style="color: #C72541; background: #F9F2F4;">"eceb" </font>which its length is <font style="color: #C72541; background: #F9F2F4;">4 </font>.

## Thinking
I was confused by the question because the example doesn't give me enough information. After test, the result should be followiings.
* If s length is less than k, return s length
* The substring can be started from any postion of the string. I used two for loops to implement it.
* For performance, if found the longest substring, the main loop need be stoped. I check the set size at the end of main loop.

## Review
Using a map to save all characters happened times. A left variable helps remember's left postion. If the keys number is greater than k, we remove the keys value is zero character from map.
Another is saving character's position. Each time we update the character's position, only remove the postion equals left value.
![longest-substring-with-at-most-k-distinct-characters](/images/Lintcode/longest-substring-with-k-distinct-characters.png)

Other solution:
<http://www.cnblogs.com/grandyang/p/5351347.html>
<http://www.cnblogs.com/grandyang/p/5185561.html>

## Solution
#### Java (Review, using map, saving position, passed on lintcodes)
~~~ java
public class Solution {
    /**
     * @param s : A string
     * @return : The length of the longest substring 
     *           that contains at most k distinct characters.
     */
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // write your code here
        if (s == null) {
            return 0;
        }
        if (k > s.length()) {
            return s.length();
        }
        int len = 0;
        int left = 0;
        Map<Character, Integer> cMap = new HashMap<Character, Integer>();
        for (int i = 0; i < s.length(); i++) {
            char key = s.charAt(i);
            cMap.put(key, i);
            if (cMap.keySet().size() > k) {
                char key2 = s.charAt(left);
                int value2 = cMap.get(key2);
                if (value2 == left) {
                    cMap.remove(key2);
                }
                ++left;
            }
            if (len < (i - left + 1)) {
                len = i - left + 1;
            }
        }
        return len;
    }
}
~~~

#### Java (Review, using map, passed on lintcodes)
~~~ java
public class Solution {
    /**
     * @param s : A string
     * @return : The length of the longest substring 
     *           that contains at most k distinct characters.
     */
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // write your code here
        if (s == null) {
            return 0;
        }
        if (k > s.length()) {
            return s.length();
        }
        int len = 0;
        int left = 0;
        Map<Character, Integer> cMap = new HashMap<Character, Integer>();
        for (int i = 0; i < s.length(); i++) {
            char key = s.charAt(i);
            Integer value = cMap.get(key);
            if (value == null) {
                cMap.put(key, 1);
            } else {
                cMap.put(key, value + 1);
            }
            if (cMap.keySet().size() > k) {
                char key2 = s.charAt(left);
                int value2 = cMap.get(key2);
                if (value2 == 1) {
                    cMap.remove(key2);
                } else {
                    cMap.put(key2, value2 - 1);
                }
                ++left;
            }
            if (len < (i - left + 1)) {
                len = i - left + 1;
            }
        }
        return len;
    }
}
~~~

#### Java
~~~ java
public class Solution {
    /**
     * @param s : A string
     * @return : The length of the longest substring 
     *           that contains at most k distinct characters.
     */
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // write your code here
        if (s == null) {
            return 0;
        }
        if (k > s.length()) {
            return s.length();
        }
        int pos = 0;
        Set<Character> chs = new HashSet<Character>();
        for (int i = 0; i < s.length(); i++) {
            for (int j = i; j < s.length(); j++) {
                chs.add(s.charAt(j));
                if (chs.size() > k) {
                    if (pos < (j - i)) {
                        pos = j - i;
                    }
                    break;
                }
                if (pos < (j - i + 1)) {
                    pos = j - i + 1;
                }
            }
            if (chs.size() <= k) { //already found the longest substring.
                break;
            }
            chs.clear();
        }
        return pos;
    }
}
~~~
