---
title: Invert Binary Tree
author: Haijun (Navy) Su
layout: page
difficulty: Easy
leetcode_link: https://leetcode.com/problems/invert-binary-tree/#/description
lintcode_link: https://www.lintcode.com/en/problem/invert-binary-tree/
tags: [Binary Tree]
---
## Question
Invert a binary tree.

**Example**
~~~
  1         1
 / \       / \
2   3  => 3   2
   /       \
  4         4
~~~

## Challenge
Do it in recursion is acceptable, can you do it without recursion?

## Review
[Recursive and iterative Solutions](https://leetcode.com/articles/invert-binary-tree/)
[Other solutions](http://www.cnblogs.com/grandyang/p/4572877.html)

## Solution
#### Java (Iterative, passed on leetcode)
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
    public TreeNode invertTree(TreeNode root) {
        if (root == null || (root.left == null && root.right == null)) {
            return root;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            TreeNode tmp = node.left;
            node.left = node.right;
            node.right = tmp;
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return root;
    }
}
~~~
#### Java (recursive, passed on lintcode)
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
    /**
     * @param root: a TreeNode, the root of the binary tree
     * @return: nothing
     */
    public void invertBinaryTree(TreeNode root) {
        // write your code here
        if (root == null) {
            return;
        }
        TreeNode tmp = root.left;
        root.left = root.right;
        root.right = tmp;
        invertBinaryTree(root.left);
        invertBinaryTree(root.right);
    }
}
~~~
