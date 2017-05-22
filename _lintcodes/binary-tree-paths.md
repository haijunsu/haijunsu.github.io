---
title: Binary Tree Paths
author: Haijun (Navy) Su
layout: page
---
### Question
Given a binary tree, return all root-to-leaf paths.

**Example**
Given the following binary tree:
~~~
   1
 /   \
2     3
 \
  5
~~~
All root-to-leaf paths are:
~~~
[
  "1->2->5",
  "1->3"
]
~~~

### Solution
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
     * @param root the root of the binary tree
     * @return all root-to-leaf paths
     */
    public List<String> binaryTreePaths(TreeNode root) {
        // Write your code here
        List<String> paths = new ArrayList<String>();
        if (root == null) {
            return paths;
        }
        if (root.left == null && root.right == null) {
            paths.add(String.valueOf(root.val));
        }
        List<String> lpaths = binaryTreePaths(root.left);
        for (String path : lpaths) {
            paths.add(root.val + "->" + path);
        }
        List<String> rpaths = binaryTreePaths(root.right);
        for (String path : rpaths) {
            paths.add(root.val + "->" + path);
        }
        return paths;
    }
}
~~~
