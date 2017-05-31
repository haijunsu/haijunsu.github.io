---
title: Valid Parentheses
author: Haijun (Navy) Su
layout: page
---
## Question
Given a string containing just the characters <font style="color: #C72541; background: #F9F2F4;">'(', ')', '{', '}', '[' </font>and <font style="color: #C72541; background: #F9F2F4;">']' </font>, determine if the input string is valid.

**Example**
The brackets must close in the correct order, <font style="color: #C72541; background: #F9F2F4;">"()" </font>and <font style="color: #C72541; background: #F9F2F4;">"()[]{}" </font>are all valid but <font style="color: #C72541; background: #F9F2F4;">"(]" </font>and <font style="color: #C72541; background: #F9F2F4;">"([)]" </font>are not.

## Solution
### Java
~~~ java
public class Solution {
    /**
     * @param s A string
     * @return whether the string is a valid parentheses
     */
    public boolean isValidParentheses(String s) {
        // Write your code here
        if (s == null || s.length() < 2) {
            return false;
        }
        Stack<Character> pths = new Stack<Character>();
        for (int i = 0; i < s.length(); i++) {
            char character = s.charAt(i);
            switch (character) {
                case '(':
                case '{':
                case '[':
                    pths.push(character);
                    break;
                case ')':
                    if (!pths.empty() && pths.pop().equals('(')) {
                        break;
                    }
                    return false;
                case '}':
                    if (!pths.empty() && pths.pop().equals('{')) {
                        break;
                    }
                    return false;
                case ']':
                    if (!pths.empty() && pths.pop().equals('[')) {
                        break;
                    }
                    return false;
                default:
                    return false;
            }
        }
        return pths.empty();
    }
}
~~~
