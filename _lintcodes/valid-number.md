---
title: Valid Number
author: Haijun (Navy) Su
layout: page
difficulty: Hard
lintcode_link: http://www.lintcode.com/en/problem/valid-number/
leetcode_link: https://leetcode.com/problems/valid-number/#/description
tags: [String,LinkedIn]
---
## Question
Validate if a given string is numeric.

**Example**
<span style="color: #C72541; background: #F9F2F4;">"0"</span> => <span style="color: #C72541; background: #F9F2F4;">true </span>
<span style="color: #C72541; background: #F9F2F4;">" 0.1 "</span> => <span style="color: #C72541; background: #F9F2F4;">true </span>
<span style="color: #C72541; background: #F9F2F4;">"abc"</span> => <span style="color: #C72541; background: #F9F2F4;">false </span>
<span style="color: #C72541; background: #F9F2F4;">"1 a"</span> => <span style="color: #C72541; background: #F9F2F4;">false </span>
<span style="color: #C72541; background: #F9F2F4;">"2e10"</span> => <span style="color: #C72541; background: #F9F2F4;">true </span>

## Thinking
This question is not hard. The main thing is that you need to clarify what is a numeric since the question is no clear.
* Empty string - false
* Single character ".", "+", "-" - false
* Starts with "e" or ends with "e" - false
* "e" must behind dot if dot exists.
* only one "e" and one "."
* "+", "-" must be the first character if they exist.

## Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param s the string that represents a number
     * @return whether the string is a valid number
     */
    public boolean isNumber(String s) {
        // Write your code here
        if (s == null) {
            return false;
        }
        s = s.trim();
        // special case only one dot or empty string
        if (s.length() == 0 || s.equals(".") || s.equals("+") || s.equals("-")) {
            return false;
        }
        // special cases (start or end with 'e')
        if (s.charAt(0) == 'e' || s.charAt(s.length() - 1) == 'e') {
            return false;
        }
        boolean hasDot = false;
        boolean hasE = false;
        for (int i = 0; i < s.length(); i++) {
            char cstr = s.charAt(i);
            if (cstr == '.') {
                if (hasDot || hasE) { // e must behind dot
                    return false;
                }
                hasDot = true;
            } else if (cstr == 'e') {
                if (hasE) {
                    return false;
                }
                hasE = true;
            } else if (cstr >= '0' && cstr <= '9') {
                continue;
            } else if (cstr == '+' || cstr == '-') {
                if (i > 0) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}
~~~
