---
title: Longest Substring with At Most K Distinct Characters
author: Haijun (Navy) Su
layout: page
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

## Solution
### Java
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
