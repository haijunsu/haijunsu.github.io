---
title: Left Pad
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/left-pad/
difficulty: Easy
tags: [String]
---
## Question
You know what, left pad is javascript package and referenced by React: 
[Github link](https://github.com/azer/left-pad)

One day his author unpublished it, then a lot of javascript projects in the world broken.

You can see from github it's only 11 lines.

You job is to implement the left pad function. If you do not know what left pad does, see examples below and guess.

**Example**
~~~
leftpad("foo", 5)
>> "  foo"

leftpad("foobar", 6)
>> "foobar"

leftpad("1", 2, "0")
>> "01"
~~~

## Solution
### Java
~~~ java
public class StringUtils {
    /**
     * @param originalStr the string we want to append to with spaces
     * @param size the target length of the string
     * @return a string
     */
    static public String leftPad(String originalStr, int size) {
        // Write your code here
        return leftPad(originalStr, size, ' ');
    }

    /**
     * @param originalStr the string we want to append to
     * @param size the target length of the string
     * @param padChar the character to pad to the left side of the string
     * @return a string
     */
    static public String leftPad(String originalStr, int size, char padChar) {
        // Write your code here
        if (originalStr == null) {
            return null;
        }
        if (originalStr.length() >= size) {
            return originalStr;
        }
        String padStr = originalStr;
        for (int i = 0; i < (size - originalStr.length()); i++) {
            padStr = padChar + padStr;
        }
        return padStr;
    }
}
~~~
