---
title: Length of Last Word
author: Haijun (Navy) Su
layout: page
---
### Question
Given a string s consists of upper/lower-case alphabets and empty space characters <font style="color: #C72541; background: #F9F2F4;">' ' </font>, return the length of last word in the string.

If the last word does not exist, return <font style="color: #C72541; background: #F9F2F4;">0 </font>.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
A word is defined as a character sequence consists of non-space characters only.
{: .note}

**Example**
Given s = <font style="color: #C72541; background: #F9F2F4;">"Hello World" </font>, return <font style="color: #C72541; background: #F9F2F4;">5 </font>.

### Solution
#### Java
~~~ java
public class Solution {
    /**
     * @param s A string
     * @return the length of last word
     */
    public int lengthOfLastWord(String s) {
        // Write your code here
        if (s == null) {
            return 0;
        }
        int length = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            char cter = s.charAt(i);
            if (length == 0 && cter == ' ') {
                continue;
            }
            if (length > 0 && cter == ' ') {
                break;
            }
            ++length;
        }
        return length;
    }
}
~~~
