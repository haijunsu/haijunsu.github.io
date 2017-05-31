---
title: Longest Words
author: Haijun (Navy) Su
layout: page
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

## Solution
### Java
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
};
~~~
