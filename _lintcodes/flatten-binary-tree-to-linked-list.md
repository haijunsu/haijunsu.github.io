---
title: Flatten Binary Tree to Linked List
author: Haijun (Navy) Su
layout: page
difficulty: Easy
leetcode_link: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/#/description
lintcode_link: https://www.lintcode.com/en/problem/flatten-binary-tree-to-linked-list/
tags: [Binary Tree,Depth First Search,Tree]
---
## Question
Flatten a binary tree to a fake "linked list" in pre-order traversal.
Here we use the *right* pointer in TreeNode as the *next* pointer in ListNode.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
Don't forget to mark the left child of each node to null. Or you will get Time Limit Exceeded or Memory Limit Exceeded.
If you notice carefully in the flattened tree, each node's right child points to the next node of a pre-order traversal.
{: .note}

**Example**
~~~
              1
               \
     1          2
    / \          \
   2   5    =>    3
  / \   \          \
 3   4   6          4
                     \
                      5
                       \
                        6
~~~

## Challenge
Do it in-place without any extra memory.

## Thinking
Use a variable to trace current node. Each call flatten method will change the variable value.
![Flat Binary Tree to Linked List](/images/Lintcodes/flat-binary-tree-to-list.png)
[Other solutions](http://www.cnblogs.com/grandyang/p/4293853.html)

## Solution
#### Java (Review, passed on leetcode)
~~~ java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    TreeNode curr = null;
    public void flatten(TreeNode root) {
        if (root == null) {
            return;
        }
        curr = root;
        if (root.left != null) {
            flatten(root.left);
            curr.right = root.right;
            root.right = root.left;
            root.left = null;
        }
        flatten(curr.right);
    }
}
~~~

#### Java
~~~ java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */
public class Solution {
    private TreeNode currentNode = null;
    /**
     * @param root: a TreeNode, the root of the binary tree
     * @return: nothing
     */
    public void flatten(TreeNode root) {
        // write your code here
        if (root == null) {
            return;
        }
        currentNode = root;
        TreeNode leftNode = root.left;
        TreeNode rightNode = root.right;
        currentNode.left = null;
        currentNode.right = leftNode;
        flatten(leftNode);
        currentNode.right = rightNode;
        flatten(rightNode);
    }
}
~~~

