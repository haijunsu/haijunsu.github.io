---
title: Longest Words
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/longest-words/
---
## Question
Given a dictionary, find all of the longest words in the dictionary.

**Example**
Given
~~~
{
  "dog",
  "google",
  "facebook",
  "internationalization",
  "blabla"
}
~~~
the longest words are(is) <font style="color: #C72541; background: #F9F2F4;"> ["internationalization"] </font>.

Given
~~~
{
  "like",
  "love",
  "hate",
  "yes"
}
~~~
the longest words are <font style="color: #C72541; background: #F9F2F4;">["like", "love", "hate"] </font>.

## Review
This question is easy. We can loop string twice to get result. First find the longest length value, the second is add all word which length equals the longest value.
Another solution is only one loop, if find greater length item and clear old list.

## Solution
#### Java (using two loops)
~~~ java
ass Solution {
    /**
     * @param dictionary: an array of strings
     * @return: an arraylist of strings
     */
    ArrayList<String> longestWords(String[] dictionary) {
        // write your code here
        ArrayList<String> longestList = new ArrayList<String>();
        if (dictionary == null || dictionary.length == 0) {
            return longestList;
        }
        int longest = 0;
        for (String str : dictionary) {
            if (longest < str.length()) {
                longest = str.length();
            }
        }
        for (String str : dictionary) {
            if (longest == str.length()) {
                longestList.add(str);
            }
        }
        return longestList;
    }
}
~~~

#### Java (add to list directly)
~~~ java
class Solution {
    /**
     * @param dictionary: an array of strings
     * @return: an arraylist of strings
     */
    ArrayList<String> longestWords(String[] dictionary) {
        // write your code here
        ArrayList<String> longests = new ArrayList<String>();
        if (dictionary == null || dictionary.length == 0) {
            return longests;
        }
        int length = 0;
        for (String el : dictionary) {
            if (el == null) {
                continue;
            }
            if (el.length() > length) {
                longests.clear();
                longests.add(el);
                length = el.length();
            } else if (el.length() == length) {
                longests.add(el);
            }
        }
        return longests;
    }
}
~~~
