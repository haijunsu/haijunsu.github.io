---
title: Valid Palindrome
author: Haijun (Navy) Su
layout: page
---
### Question
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
 Have you consider that the string might be empty? This is a good question to ask during an interview.
 For the purpose of this problem, we define empty string as valid palindrome.
{: .note}

**Example**
<font style="color: #C72541; background: #F9F2F4;">"A man, a plan, a canal: Panama" </font>is a palindrome.
<font style="color: #C72541; background: #F9F2F4;">"race a car" </font>is not a palindrome.

### Thinking
Checking not valid characters is not very clear.
Another solution is build new string with valid characters only.

### Solution
#### Java (remove invalid characters first)
~~~ java
public class Solution {
    /**
     * @param s A string
     * @return Whether the string is a valid palindrome
     */
    public boolean isPalindrome(String s) {
        // Write your code here
        if (s == null || s.length() < 2) {
            return true;
        }
        String str = s.toLowerCase();
        StringBuilder sb =  new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char current = str.charAt(i);
            if (isValid(current)) {
                sb.append(current);
            }
        }
        str = sb.toString();
        int start = 0;
        int end = str.length() - 1;
        while (start < end) {
            char c1 = str.charAt(start++);
            char c2 = str.charAt(end--);
            if (c1 != c2) {
                return false;
            }
        }
        return true;
    }
    
    private boolean isValid(char c) {
        return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
    }
}
~~~
#### Java (keep invalid characters)
~~~ java
public class Solution {
    /**
     * @param s A string
     * @return Whether the string is a valid palindrome
     */
    public boolean isPalindrome(String s) {
        // Write your code here
        if (s == null || s.length() < 2) {
            return true;
        }
        String str = s.toLowerCase();
        int start = 0;
        int end = str.length() - 1;
        while (start < end) {
            char c1 = str.charAt(start++);
            while (!isValid(c1) && (start <= end)) {
                c1 = str.charAt(start++);
            }
            char c2 = str.charAt(end--);
            while (!isValid(c2) && (end >= 0)) {
                c2 = str.charAt(end--);
            }
            if (c1 != c2 && isValid(c1) && isValid(c2)) {
                return false;
            }
        }
        return true;
    }
    
    private boolean isValid(char c) {
        return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
    }
}
~~~

