---
title: Binary Tree Level Order Traversal
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/binary-tree-level-order-traversal/
leetcode_link: https://leetcode.com/problems/binary-tree-level-order-traversal/#/description
tags: [Queue,Binary Tree,Breadth First Search,Binary Tree Traversal,Uber,LinkedIn,Facebook]
---
## Question
Given a binary tree, return the *level order* traversal of its nodes' values. (ie, from left to right, level by level).

**Example**
Given binary tree <font style="color: #C72541; background: #F9F2F4;">{3,9,20,#,#,15,7} </font>,
~~~
    3
   / \
  9  20
    /  \
   15   7
~~~
return its level order traversal as:
~~~
[
  [3],
  [9,20],
  [15,7]
]
~~~

**Challenge**
Challenge 1: Using only 1 queue to implement it.
Challenge 2: Use DFS algorithm to do it.


## Solution
#### Java (Queue)
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
     * @param root: The root of binary tree.
     * @return: Level order a list of lists of integer
     */
    public ArrayList<ArrayList<Integer>> levelOrder(TreeNode root) {
        // write your code here
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        ArrayList<ArrayList<Integer>> totalList = new ArrayList<ArrayList<Integer>>();
        if (root == null) {
            return totalList;
        }
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelsize = queue.size();
            ArrayList<Integer> list = new ArrayList<Integer>();
            for (int i = 0; i < levelsize; i++) {
                TreeNode node = queue.poll();
                list.add(node.val);
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            totalList.add(list);
        }
        return totalList;
    }
}
~~~
