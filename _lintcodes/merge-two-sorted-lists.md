---
title: Merge Two Sorted Lists
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/merge-two-sorted-lists/
leetcode_link: https://leetcode.com/problems/merge-two-sorted-lists/#/description
tags: [LinkedIn,Linked List]
---
## Question
Merge two sorted (ascending) linked lists and return it as a new sorted list. The new sorted list should be made by splicing together the nodes of the two lists and sorted in ascending order.

**Example**
Given <span style="color: #C72541; background: #F9F2F4;">1->3->8->11->15->null, 2->null </span>, return <span style="color: #C72541; background: #F9F2F4;">1->2->3->8->11->15->null </span>.

## Thinking
* One while loop to build a new list
* Some people consider about recursion, but I think the while loop is very straightforward.

## Solution
#### Java
~~~ java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        ListNode merged = new ListNode(0);
        ListNode tmp = merged;
        while (l1 != null && l2!= null) {
            if (l1.val < l2.val) {
                tmp.next = l1;
                l1 = l1.next;
            } else {
                tmp.next = l2;
                l2 = l2.next;
            }
            tmp = tmp.next;
        }
        if (l1 != null) {
            tmp.next = l1;
        } else {
            tmp.next = l2;
        }
        return merged.next;
    }
}
~~~

