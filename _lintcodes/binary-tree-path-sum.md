---
title: Binary Tree Path Sum
author: Haijun (Navy) Su
layout: page
---
### Question
Given a binary tree, find all paths that sum of the nodes in the path equals to a given number **target**.
A valid path is **from root node to any of the leaf nodes**.

**Example**
Given a binary tree, and target = **5**:
~~~
     1
    / \
   2   4
  / \
 2   3
~~~
Expected result
~~~
[
  [1, 2, 2],
  [1, 4]
]
~~~

### Thinking
Binary tree has three traversal methods.(refer: <http://javabeat.net/binary-search-tree-traversal-java/>) 
* Inorder Traversal
* Preorder Traversal
* Postorder Traversal

**Path definition:** root to leaf
**Accepted path:** Summary all node values in the path equals the given number
**Path:** root is a leaf and root.val equals the given number
**Other:** set left or right node as root and target as target - root.val. call method again

**Note:** Don't forget checking null node value

### Java
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
     * @param target an integer
     * @return all valid paths
     */
    public List<List<Integer>> binaryTreePathSum(TreeNode root, int target) {
        // Write your code here
        List<List<Integer>> sumPaths = new ArrayList<List<Integer>>();
        if (root == null) {
            return sumPaths;
        } else if (root.val == target && isLeaf(root)) {
            List<Integer> path = new ArrayList<Integer>();
            path.add(root.val);
            sumPaths.add(path);
        } else {
            if (root.left != null) {
            // left node
                List<List<Integer>> childPaths = binaryTreePathSum(root.left, target - root.val);
                if (childPaths.size() > 0) {
                    for (List<Integer> path : childPaths) {
                        List<Integer> leftPath = new ArrayList<Integer>();
                        leftPath.add(root.val);
                        leftPath.addAll(path);
                        sumPaths.add(leftPath);
                    }
                }
            }
            if (root.right != null) {
            // right node
                List<List<Integer>> childPaths = binaryTreePathSum(root.right, target - root.val);
                if (childPaths.size() > 0) {
                    for (List<Integer> path : childPaths) {
                        List<Integer> rightPath = new ArrayList<Integer>();
                        rightPath.add(root.val);
                        rightPath.addAll(path);
                        sumPaths.add(rightPath);
                    }
                }
            }
        }
        return sumPaths;
    }
    
    private boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }
}
~~~  
