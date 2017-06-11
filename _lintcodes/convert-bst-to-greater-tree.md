---
title: Convert BST to Greater Tree
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/convert-bst-to-greater-tree/
leetcode_link: https://leetcode.com/problems/convert-bst-to-greater-tree/#/description
difficulty: Easy
tags: [Tree,Binary Search Tree,Binary Tree,Amazon]
---
## Question
Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

**Example**
Given a binary search Tree <font style="color: #C72541; background: #F9F2F4;">｀{5,2,3}｀</font>:
~~~
              5
            /   \
           2     13
~~~
Return the root of new tree
~~~
             18
            /   \
          20     13
~~~

## Thinking
1. Each node new value is current value plus sum(other greater node values)
2. Right node is visited first
3. Current node value equals current node value plus right node value
4. Left node value is harder. Left node is not the next node to be added. It may has a lot of right children.
5. Make sure curent always get the sum of other greater node values (store the sum in a globe varilabe)

## Solution
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
    /**
     * @param root the root of binary tree
     * @return the new root
     */
    public TreeNode convertBST(TreeNode root) {
        // Write your code here
        if (root == null) {
            return null;
        }
        convertBST(root.right);
        sum = root.val + sum;
        root.val = sum;
        convertBST(root.left);
        return root;
    }
    private int sum = 0;
}
~~~
