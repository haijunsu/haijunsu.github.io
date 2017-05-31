---
title: Flatten Binary Tree to Linked List
author: Haijun (Navy) Su
layout: page
---
## Question
Flatten a binary tree to a fake "linked list" in pre-order traversal.
Here we use the *right* pointer in TreeNode as the *next* pointer in ListNode.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
Don't forget to mark the left child of each node to null. Or you will get Time Limit Exceeded or Memory Limit Exceeded.
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

## Thinking
Use a variable to trace current node

## Solution
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

