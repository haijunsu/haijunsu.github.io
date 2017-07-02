---
title: Minimum Depth of Binary Tree
author: Haijun (Navy) Su
layout: page
difficulty: Easy
lintcode_link: http://www.lintcode.com/en/problem/minimum-depth-of-binary-tree/
leetcode_link: https://leetcode.com/problems/minimum-depth-of-binary-tree/#/description
tags: [Binary Tree,Depth First Search]
---
## Question
Given a binary tree, find its minimum depth.
The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Example**
Given a binary tree as follow:
~~~ 
  1
 / \ 
2   3
   / \
  4   5
~~~
mum depth is <font style="color: #C72541; background: #F9F2F4;">2 </font>.

## Thinking
* Using recursion DFS find the minimum depth leaf. To save time, we can use a varibale to trace minimum depth value. If the depth of node is greater than minimum depth value, return minimum depth value directly.
* Using BFS search. We can use two queues to do it. One queue saves nodes and another queue saves nodes depth value.

## Solution
#### Java (Recursion)
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
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int minDepth = Integer.MAX_VALUE;
        minDepth = findMinDepth(root, 1, minDepth);
        return minDepth;
    }
    
    private int findMinDepth(TreeNode root, int currDepth, int minDepth) {
        if (currDepth > minDepth) {
            return minDepth;
        }
        if (root.left == null && root.right == null) {
            return currDepth;
        }
        ++currDepth;
        if (root.left != null) {
            minDepth = findMinDepth(root.left, currDepth, minDepth);
        }
        if (root.right != null) {
            minDepth = findMinDepth(root.right, currDepth, minDepth);
        }
        return minDepth;
    }
}
~~~

#### Java (BFS)
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
     * @return: An integer.
     */
    public int minDepth(TreeNode root) {
        // write your code here
        if(root == null) {
            return 0;
        }
        Queue<TreeNode> nodeQueue = new LinkedList<TreeNode>();
        Queue<Integer> depQueue = new LinkedList<Integer>();
        nodeQueue.add(root);
        depQueue.add(1);
        int minDepth = 1;
        while (!nodeQueue.isEmpty()) {
            TreeNode node = nodeQueue.poll();
            minDepth = depQueue.poll();
            if (node.left == null && node.right == null) {
                break;
            }
            if (node.left != null) {
                nodeQueue.add(node.left);
                depQueue.add(minDepth + 1);
            }
            if (node.right != null) {
                nodeQueue.add(node.right);
                depQueue.add(minDepth + 1);
            }
        }
        return minDepth;
    }
}
~~~
