---
title: Count and Say
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/count-and-say/
leetcode_link: https://leetcode.com/problems/count-and-say/#/description
difficulty: Easy
tags: [String,Facebook]
---
## Question
The count-and-say sequence is the sequence of integers beginning as follows:
<pre>
<font style="color: #C72541; background: #F9F2F4;">1, 11, 21, 1211, 111221, ... </font>

<font style="color: #C72541; background: #F9F2F4;">1 </font>is read off as <font style="color: #C72541; background: #F9F2F4;">"one 1" </font> or <font style="color: #C72541; background: #F9F2F4;">11 </font>.

<font style="color: #C72541; background: #F9F2F4;">11 </font>is read off as <font style="color: #C72541; background: #F9F2F4;">"two 1s" </font>or <font style="color: #C72541; background: #F9F2F4;">21 </font>.

<font style="color: #C72541; background: #F9F2F4;">21 </font>is read off as <font style="color: #C72541; background: #F9F2F4;">"one 2, then one 1" </font>or <font style="color: #C72541; background: #F9F2F4;">1211 </font>.

Given an integer <font style="color: #C72541; background: #F9F2F4;">n </font>, generate the <font style="color: #C72541; background: #F9F2F4;">nth </font>sequence.
</pre>
<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
The sequence of integers will be represented as a string.
{: .note}

**Example**
Given n = <font style="color: #C72541; background: #F9F2F4;">5 </font>, return <font style="color: #C72541; background: #F9F2F4;">"111221" </font>.

## Thinking
Tested on leetcode, error input (n < 1) always return "1".
![Count and Say](/images/Lintcode/count-and-say.png)
## Solution
#### Java (Passed on leetcode)
~~~ java
public class Solution {
    public String countAndSay(int n) {
        if (n < 1) {
            return "1";
        }
        String say = "1";
        int k = 2;
        while (k <= n) {
            String sayExtra = say + "$"; // add an extra char to help handle last char.
            char pre = say.charAt(0);
            int count = 1;
            String tmpStr = "";
            for (int i = 1; i < sayExtra.length(); i++) {
                if (pre == sayExtra.charAt(i)) {
                    ++count;
                } else {
                    tmpStr = tmpStr + count + pre;
                    count = 1;
                    pre = sayExtra.charAt(i);
                }
            }
            say = tmpStr;
            ++k;
        }
        return say;
    }
}
~~~
#### Java
~~~ java
public class Solution {
    /**
     * @param n the nth
     * @return the nth sequence
     */
    public String countAndSay(int n) {
        // Write your code here
        String cas = "1";
        for (int i = 2; i <= n; i++) {
            String cas2 = "";
            int count = 1;
            char pre = cas.charAt(0);
            for (int j = 1; j < cas.length(); j++) {
                if (pre == cas.charAt(j)) {
                    ++count;
                } else {
                    cas2 = cas2 + count + pre;
                    pre = cas.charAt(j);
                    count = 1;
                }
            }
            cas = cas2 + count + pre;
        }
        return cas;
    }
}
~~~
