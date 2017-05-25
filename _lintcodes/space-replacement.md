---
title: Space Replacement
author: Haijun (Navy) Su
layout: page
---

### Question
Write a method to replace all spaces in a string with <font style="color: #C72541; background: #F9F2F4;">%20 </font>. The string is given in a characters array, you can assume it has enough space for replacement and you are given the true length of the string.

You code should also return the new length of the string after replacement.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
If you are using Java or Python，please use characters array instead of string.
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">"Mr John Smith" </font>, length = <font style="color: #C72541; background: #F9F2F4;">13 </font>.

The string after replacement should be <font style="color: #C72541; background: #F9F2F4;">"Mr%20John%20Smith" </font>, you need to change the string in-place and return the new length <font style="color: #C72541; background: #F9F2F4;">17 </font>.

### Thinking
* The array length is not the string length.
* Create a new array and copy all emelments back to origin array.
* Using original array. (assume the array is long enought to shift all elements to right)

### Solution
#### Java (Shift elements)
~~~ java
public class Solution {
    /**
     * @param string: An array of Char
     * @param length: The true length of the string
     * @return: The true length of new string
     */
    public int replaceBlank(char[] string, int length) {
        // Write your code here
        if (string == null || string.length == 0) {
            return 0;
        }
        int index = 0;
        int newLen = length;
        while (true) {
            if (index >= newLen) {
                break;
            } 
            if (string[index] == ' ') {
                for (int i = (newLen - 1); i > index; i--) {
                    string[i + 2] = string[i];
                    string[i + 1] = string[i - 1];
                }
                string[index++] = '%';
                string[index++] = '2';
                string[index++] = '0';
                newLen += 2;
            } else {
                ++index;
            }
        }
        return newLen;
    }
}
~~~
#### Java (Creating a new array)

<i class="fa fa-info-circle" aria-hidden="true"></i> Note
Since the method has no return type, the input array length must be long enough for new string. Even though this solution works, it may not the right solution.
{: .note}
~~~ java
public class Solution {
    /**
     * @param string: An array of Char
     * @param length: The true length of the string
     * @return: The true length of new string
     */
    public int replaceBlank(char[] string, int length) {
        // Write your code here
        if (string == null) {
            return 0;
        }
        int spaceCount = 0;
        for (int i = 0; i < string.length; i++) {
            if (string[i] == ' ') {
                ++spaceCount;
            }
        }
        int newLen = length + spaceCount * 2;
        // temporary array length can be three times of length. 
        // we can omit the for loop above.
        char[] newString = new char[newLen];
        int index = 0;
        for (int i = 0; i < length; i++) {
            if (string[i] == ' ') {
                newString[index++] = '%';
                newString[index++] = '2';
                newString[index++] = '0';
            } else {
                newString[index++] = string[i];
            }
        }
        System.arraycopy(newString, 0, string, 0, newLen);
        return newLen;
    }
}
~~~

