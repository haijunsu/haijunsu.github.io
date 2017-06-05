---
title: Reverse Linked List II
author: Haijun (Navy) Su
layout: page
leetcode_link: https://leetcode.com/problems/reverse-linked-list-ii/#/description
lintcode_link: http://www.lintcode.com/en/problem/reverse-linked-list-ii/
difficulty: Medium
tags: [Linked List]
---
## Question
Reverse a linked list from position m to n.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
Given m, n satisfy the following condition: 1 ≤ m ≤ n ≤ length of list.
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">1->2->3->4->5->NULL </font>, m = <font style="color: #C72541; background: #F9F2F4;">2 </font>and n = <font style="color: #C72541; background: #F9F2F4;">4 </font>, return <font style="color: #C72541; background: #F9F2F4;">1->4->3->2->5->NULL </font>.

## Challenge
Reverse it in-place and in one-pass

## Thinking
Did question [Reverse Linked List](/lintcodes/reverse-linked-list) before. Tried to use reverse2 solution but it confused me. So reverse1 is the best one for me.
Just need skip m nodes and start to reverse element till position n.

## Solution
#### Java
~~~ java
/**
 * Definition for ListNode
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
     * @param ListNode head is the head of the linked list 
     * @oaram m and n
     * @return: The head of the reversed ListNode
     */
    public ListNode reverseBetween(ListNode head, int m , int n) {
        // write your code
        if (head == null || head.next == null || n <= m) {
            return head;
        }
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode prev = dummy;
        int index = 1;
        while (index < m && prev != null) {
            prev = prev.next;
            ++index;
        }
        if (index < m || prev == null) {
            return head;
        }
        ListNode curr = prev.next;
        while (index < n && curr != null) {
            ListNode tmpNode = curr.next;
            curr.next = tmpNode.next;
            tmpNode.next = prev.next;
            prev.next = tmpNode;
            ++index;
        }
        return dummy.next;
    }
}
~~~
