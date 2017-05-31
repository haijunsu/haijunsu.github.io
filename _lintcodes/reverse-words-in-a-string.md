---
title: Reverse Words in a String
author: Haijun (Navy) Su
layout: page
---
## Question
Given an input string, reverse the string word by word.

**Example**
Given s = <font style="color: #C72541; background: #F9F2F4;">"the sky is blue" </font>,
return <font style="color: #C72541; background: #F9F2F4;">"blue is sky the" </font>.

## Clarification
* What constitutes a word?
A sequence of non-space characters constitutes a word.
* Could the input string contain leading or trailing spaces?
Yes. However, your reversed string should not contain leading or trailing spaces.
* How about multiple spaces between two words?
Reduce them to a single space in the reversed string.

## Solution
### Java
~~~ java
public class Solution {
    /**
     * @param s : A string
     * @return : A string
     */
    public String reverseWords(String s) {
        // write your code
        if (s == null || s.indexOf(" ") == -1) {
            return s;
        }
        StringTokenizer tokens = new StringTokenizer(s);
        StringBuilder sb = new StringBuilder();
        while (tokens.hasMoreTokens()) {
            sb.insert(0, tokens.nextToken());
            sb.insert(0, " ");
        }
        return sb.toString().trim();
    }
}
~~~
