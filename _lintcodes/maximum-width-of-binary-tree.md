---
title: Maximum Width of Binary Tree
author: Haijun (Navy) Su
layout: page
difficulty: Medium
leetcode_link: https://leetcode.com/contest/leetcode-weekly-contest-46/problems/maximum-width-of-binary-tree/
tags: [binary tree, BFS]
---
## Question
Given a binary tree, write a function to get the maximum width of the given tree. The width of a tree is the maximum width among all levels. The binary tree has the same structure as a ***full binary tree***, but some nodes are null.

The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the *null* nodes between the end-nodes are also counted into the length calculation.

**Example 1:**
Input:
~~~
           1
         /   \
        3     2
       / \     \
      5   3     9
~~~
Output: 4
Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).
**Example 2:**
Input:
~~~
          1
         /
        3
       / \
      5   3
~~~
Output: 2
Explanation: The maximum width existing in the third level with the length 2 (5,3).
**Example 3:**
Input:
~~~
          1
         / \
        3   2
       /
      5
~~~
Output: 2
Explanation: The maximum width existing in the second level with the length 2 (3,2).
**Example 4:**
Input:
~~~
          1
         / \
        3   2
       /     \
      5       9
     /         \
    6           7
~~~
Output: 8
Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).


<i class="fa fa-info-circle" aria-hidden="true"></i>Note: Answer will in the range of 32-bit signed integer.
{: .note}

## Thinking
1. Simlar question on GeeksforGreeks which doesn't count null value.<http://www.geeksforgeeks.org/maximum-width-of-a-binary-tree/>. My solution is <http://ide.geeksforgeeks.org/IagSO2>
2. Using two queues. One queue is for nodes, another is for node's positions. left is pos * 2 -1 and right is pos * 2
3. Width is the last value subtract the first value in queue

## Solution
### Java
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
class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        Queue<Integer> posQueue = new LinkedList<Integer>();
        int maxWidth = 0;
        queue.offer(root);
        posQueue.offer(1);
        while (!queue.isEmpty()) {
            int size  = queue.size();
            int start = 0;
            int end = 0;
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                Integer pos = posQueue.poll();
                if (i == 0) {
                    start = pos;
                }
                end = pos;
                if (node.left != null) {
                    queue.offer(node.left);
                    posQueue.offer(pos * 2- 1);
                } 
                if (node.right != null) {
                    queue.offer(node.right);
                    posQueue.offer(pos * 2);
                }
            }
            maxWidth = Math.max(maxWidth, end - start + 1);
        }
        return maxWidth;
    }
}
~~~
