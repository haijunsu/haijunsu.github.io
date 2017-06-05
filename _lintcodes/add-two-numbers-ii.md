---
title: Add Two Numbers II
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/add-two-numbers-ii/
leetcode_link: https://leetcode.com/problems/add-two-numbers-ii/#/description
difficulty: Medium
tags: [Linked List, High Precision]
---
## Question
You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in <font style="color: #C72541; background: #F9F2F4;">forward </font>order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">6->1->7 + 2->9->5 </font>. That is, <font style="color: #C72541; background: #F9F2F4;">617 + 295 </font>.
Return <font style="color: #C72541; background: #F9F2F4;">9->1->2 </font>. That is, <font style="color: #C72541; background: #F9F2F4;">912 </font>.

**Follow up:**
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

## Thinking
Similar question: [Add Tow Numbers](/lintcodes/add-two-numbers/);

## Review
We can refer to [Add Tow Numbers](/lintcodes/add-two-numbers/) but the challenge is reversing the lists or using stack.
On leetcode, reversing is not allowed. We can use offset variable help to add two different length lists and recursive method.

## Solution
### Java
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
    public ListNode addLists2(ListNode l1, ListNode l2) {
        // write your code here
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        
        String result = addNumStrings(listToNumStr(l1), listToNumStr(l2));
        return numStrToList(result);
    }  
    
    private String listToNumStr(ListNode node) {
        if (node == null) {
            return null;
        }
        StringBuffer sb = new StringBuffer();
        sb.append(node.val);
        ListNode next = node.next;
        while (next != null) {
            sb.append(next.val);
            next = next.next;
        }
        return sb.toString();
    }
    
    private ListNode numStrToList(String num) {
        if (num == null || num.length() == 0) {
            return null;
        }
        ListNode node = new ListNode(Character.getNumericValue(num.charAt(0)));
        ListNode tmp = node;
        for (int i = 1; i < num.length(); i++) {
            ListNode next = new ListNode(Character.getNumericValue(num.charAt(i)));
            tmp.next = next;
            tmp = next;
        }
        return node;
    }
    
    private String addNumStrings(String num1, String num2) {
        if (num1 == null) {
            return num2;
        }
        if (num2 == null) {
            return num1;
        }
        StringBuffer sb = new StringBuffer();
        int index1 = num1.length() - 1;
        int index2 = num2.length() - 1;
        int carry = 0;
        int value = 0;
        while (index1 >= 0 || index2 >= 0) {
            if (index1 >= 0 && index2 >= 0) {
                value = Character.getNumericValue(num1.charAt(index1))
                            + Character.getNumericValue(num2.charAt(index2));
            } else if (index1 >= 0 && index2 < 0) {
                 value = Character.getNumericValue(num1.charAt(index1));
            } else if (index1 < 0 && index2 >= 0) {
                 value = Character.getNumericValue(num2.charAt(index2));
            }
            value = carry + value;
            sb.insert(0, value % 10);
            carry = value / 10;
            --index1;
            --index2;
        }
        if (carry != 0) {
            sb.insert(0, carry);
        }
        return sb.toString();
    }
}
~~~
