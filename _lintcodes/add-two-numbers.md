---
title: Add Two Numbers
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://www.lintcode.com/en/problem/add-two-numbers/
leetcode_link: https://leetcode.com/problems/add-two-numbers/#/description
tags: [racking The Coding Interview, Linked List, High Precision, Math]
---
## Question
You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in <font style="color: #C72541; background: #F9F2F4;">reverse </font> order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">7->1->6 + 5->9->2 </font>. That is, <font style="color: #C72541; background: #F9F2F4;">617 + 295 </font>.
Return <font style="color: #C72541; background: #F9F2F4;">2->1->9 </font>. That is <font style="color: #C72541; background: #F9F2F4;">912 </font>.
Given <font style="color: #C72541; background: #F9F2F4;">3->1->5 </font> and <font style="color: #C72541; background: #F9F2F4;">5->9->2 </font>, return <font style="color: #C72541; background: #F9F2F4;">8->0->8 </font>.

## Thinking
This question should test knowledge of linked list. But it also need to consider BigInteger. If we can use BigInteger, it is easy. If we cannot use it, it is hard because we neeed to implement addition of two BigInteger.
Before coding, we need clearfy the following things:
* Is the result list reversed too?
* Is the integer longer enough to represent the result?
* If previous question is no, is the long longer enough to represent the result?
* If previous question is also no, can we use BigInteger?

## Review
The thinking is not good. We can just add first node first and handle carry value. There is NO BigInteger issue.

## Solution

#### Java (Review Solution)
~~~ java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    /**
     * @param l1: the first list
     * @param l2: the second list
     * @return: the sum list of l1 and l2
     */
    public ListNode addLists(ListNode l1, ListNode l2) {
        // write your code here
        if (l1 == null && l2 == null) {
            return null;
        }
        // short return if one parameter is null.
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        ListNode sumList = null;
        ListNode tmpList = null;
        int carry = 0;
        int sum  = 0;
        while (l1 != null || l2 != null) {
            int val1 = 0;
            int val2 = 0;
            if (l1 != null) {
                val1 = l1.val;
            }
            if (l2 != null) {
                val2 = l2.val;
            }
            sum = carry + val1 + val2;
            if (sumList == null) {
                sumList = new ListNode(sum % 10);
                tmpList = sumList;
            } else {
                tmpList.next = new ListNode(sum % 10);
                tmpList = tmpList.next;
            }
            carry = sum / 10;
            if (l1 != null) {
                l1 = l1.next;
            }
            if (l2 != null) {
                l2 = l2.next;
            }
        }
        if (carry > 0) {
            tmpList.next = new ListNode(carry);
        }
        return sumList;
    }
}
~~~

### Java (Add big integer by my own method)
~~~ java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
import java.math.BigInteger;
public class Solution {
    /**
     * @param l1: the first list
     * @param l2: the second list
     * @return: the sum list of l1 and l2
     */
    public ListNode addLists(ListNode l1, ListNode l2) {
        // write your code here
        if (l1 == null && l2 == null) {
            return null;
        }
        String sum = addNumStrings(listToNumStr(l1), listToNumStr(l2));
        return numStrToList(sum);
    }

    private String listToNumStr(ListNode list) {
        if (list == null) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(list.val);
        ListNode next = list.next;
        while (next != null) {
            sb.insert(0, next.val);
            next = next.next;
        }
        return sb.toString();
    }

    private ListNode numStrToList(String num) {
//        System.out.println(num);
        if (num == null) {
            return null;
        }
        ListNode node = new ListNode(Character.getNumericValue(num.charAt(num.length() - 1)));
        ListNode child = null;
        ListNode tmp = node;
        for (int i = num.length() - 2; i >= 0; i--) {
            child = new ListNode(Character.getNumericValue(num.charAt(i)));
            tmp.next = child;
            tmp = child;
        }
        return node;
    }
    
    private String addNumStrings(String num1, String num2) {
        if (num1 == null && num2 == null) {
            return null;
        }
        if (num1 == null) {
            return num2;
        }
        if (num2 == null) {
            return num1;
        }
        StringBuilder sb = new StringBuilder();
        int index1 = num1.length() - 1;
        int index2 = num2.length() - 1;
        int carry = 0;
        int value = 0;
        while (index1 >= 0 || index2 >= 0) {
            if (index1 >= 0 && index2 >=0) {
                value = carry + Character.getNumericValue(num1.charAt(index1)) 
                            + Character.getNumericValue(num2.charAt(index2));
            } else if (index1 >= 0 && index2 < 0) {
                value = carry + Character.getNumericValue(num1.charAt(index1));
            } else if (index1 < 0 && index2 >= 0) {
                value = carry + Character.getNumericValue(num2.charAt(index2));
            } else {
                // noop
            }
            carry = value / 10;
            sb.insert(0, value % 10);
            --index1;
            --index2;
        }
        if (carry > 0) {
            sb.insert(0, carry);
        }
        return sb.toString();
    }
}
~~~
### Java (BigInteger)
~~~ java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;      
 *     }
 * }
 */
import java.math.BigInteger;
public class Solution {
    /**
     * @param l1: the first list
     * @param l2: the second list
     * @return: the sum list of l1 and l2 
     */
    public ListNode addLists(ListNode l1, ListNode l2) {
        // write your code here
        if (l1 == null && l2 == null) {
            return null;
        }
        BigInteger sum = listToNum(l1).add(listToNum(l2));
        return numToList(sum);
    }
    
    private BigInteger listToNum(ListNode list) {
        if (list == null) {
            return new BigInteger("0");
        }
        StringBuilder sb = new StringBuilder();
        sb.append(list.val);
        ListNode next = list.next;
        while (next != null) {
            sb.insert(0, next.val);
            next = next.next;
        }
        return new BigInteger(sb.toString());
    }
    
    private ListNode numToList(BigInteger num) {
//        System.out.println(num);
        String value = num.toString();
        ListNode node = new ListNode(Character.getNumericValue(value.charAt(value.length() - 1)));
        ListNode child = null;
        ListNode tmp = node;
        for (int i = value.length() - 2; i >= 0; i--) {
            child = new ListNode(Character.getNumericValue(value.charAt(i)));
            tmp.next = child;
            tmp = child;
        }
        return node;
    }
}
~~~

### Java (long)

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
This is not a solution. It just demonstrates another way to solve the problem.
{: .note}

~~~ java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;      
 *     }
 * }
 */
public class Solution {
    /**
     * @param l1: the first list
     * @param l2: the second list
     * @return: the sum list of l1 and l2 
     */
    public ListNode addLists(ListNode l1, ListNode l2) {
        // write your code here
        if (l1 == null && l2 == null) {
            return null;
        }
        long sum = listToNum(l1) + listToNum(l2);
        return numToList(sum);
    }
    
    private long listToNum(ListNode list) {
        if (list == null) {
            return 0;
        }
        long num = (long)list.val;
        num = num + 10 * listToNum(list.next);
//        System.out.println(num);
        return num;
    }
    
    private ListNode numToList(long num) {
//        System.out.println(num);
        long val = num % 10;
        ListNode node = new ListNode((int) val);
        ListNode child = null;
        ListNode tmpNode = node;
        num = num / 10;
        while (num != 0) {
            child = new ListNode((int) (num % 10));
            tmpNode.next = child;
            tmpNode = child;
            num = num / 10;
        }
        return node;
    }
}
~~~
