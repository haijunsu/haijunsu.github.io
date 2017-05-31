---
title: Swap Nodes in Pairs
author: Haijun (Navy) Su
layout: page
---
## Question
Given a linked list, swap every two adjacent nodes and return its head.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">1->2->3->4 </font>, you should return the list as <font style="color: #C72541; background: #F9F2F4;">2->1->4->3 </font>.

## Solution
### Java
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
    /**
     * @param head a ListNode
     * @return a ListNode
     */
    public ListNode swapPairs(ListNode head) {
        // Write your code here
        if (head == null || head.next == null) {
            return head;
        }
        ListNode next = head.next;
        head.next = swapPairs(head.next.next);
        next.next = head;
        return next;
    }
}
~~~
