---
title: Identical Binary Tree
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: https://www.lintcode.com/en/problem/identical-binary-tree/
tags: [Binary Tree]
---
## Question
Check if two binary trees are identical. Identical means the two binary trees have the same structure and every identical position has the same value.

**Example**
~~~
    1             1
   / \           / \
  2   2   and   2   2
 /             /
4             4
~~~
are identical.
~~~
    1             1
   / \           / \
  2   3   and   2   3
 /               \
4                 4
~~~
are not identical.

## Thinking
Convert all node as string and compare string values.

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
     * @param a, b, the root of binary trees.
     * @return true if they are identical, or false.
     */
    public boolean isIdentical(TreeNode a, TreeNode b) {
        // Write your code here
        return treeString(a).equals(treeString(b));
    }
    private String treeString(TreeNode node) {
        if (node == null) {
            return "#";
        }
        String nodeString = String.valueOf(node.val);
        nodeString += treeString(node.left);
        nodeString += treeString(node.right);
        return nodeString;
    }
}
~~~
