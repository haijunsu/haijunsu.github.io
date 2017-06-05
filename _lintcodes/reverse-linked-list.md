---
title: Reverse Linked List
author: Haijun (Navy) Su
layout: page
leetcode_link: https://leetcode.com/articles/reverse-linked-list/
lintcode_link: https://leetcode.com/articles/reverse-linked-list/
difficulty: Easy
tags: [Linked List, Facebook, Uber]
---
## Question
Reverse a Linked List

**Example**
For linked list <font style="color: #C72541; background: #F9F2F4;">1->2->3 </font>, the reversed linked list is <font style="color: #C72541; background: #F9F2F4;">3->2->1 </font>

## Challenge
Reverse it in-place and in one-pass
A linked list can be reversed either iteratively or recursively. Could you implement both?

## Thinking
For iteration, we can always pop the second item and make the pop item as head in new list. Another one is changing every node next to father (see iterative2);
For recursion, we need to make sure each item will be the next item of his own next item (reverse: child becomes father and father becomes child's child);

## Complexity analysis
Iterative: Time complexity: O(n), Space complexity: O(1);
Recursive: Time complexity: O(n), Space complexity: O(n);

## Solution
#### Java (iterative)
~~~ java
/**
 * Definition for ListNode.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) {
 *         this.val = val;
 *         this.next = null;
 *     }
 * }
 */ 
public class Solution {
    /**
     * @param head: The head of linked list.
     * @return: The new head of reversed linked list.
     */
    public ListNode reverse(ListNode head) {
        // write your code here
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newNode = new ListNode(-1);
        newNode.next = head;
        while (head.next != null) {
            ListNode popNode = head.next;
            head.next = popNode.next;
            popNode.next = newNode.next;
            newNode.next = popNode;
        }
        return newNode.next;
    }
}
~~~

#### Java (iterative2)
I think this one is better since we don't have to create a dummy node.
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
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode tmpNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmpNode;
        }
        return prev;
    }
}
~~~

#### Java (recursive)
~~~ java
/**
 * Definition for ListNode.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) {
 *         this.val = val;
 *         this.next = null;
 *     }
 * }
 */ 
public class Solution {
    /**
     * @param head: The head of linked list.
     * @return: The new head of reversed linked list.
     */
    public ListNode reverse(ListNode head) {
        // write your code here
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newNode = reverse(head.next);
        head.next.next = head;
        head.next = null;
        return newNode;
    }
}
~~~
