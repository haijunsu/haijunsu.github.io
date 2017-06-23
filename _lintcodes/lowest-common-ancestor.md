---
title: Lowest Common Ancestor
author: Haijun (Navy) Su
layout: page
lintcode_link: http://www.lintcode.com/en/problem/lowest-common-ancestor/
leetcode_link: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/#/description
difficulty: Medium
tags: [Tree,LinkedIn,Binary Tree,Facebook]
---
Given the root and two nodes in a Binary Tree. Find the lowest common ancestor(LCA) of the two nodes.

The lowest common ancestor is the node with largest depth which is the ancestor of both nodes.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
Assume two nodes are exist in tree.
{: .note}

**Example**
For the following binary tree:
~~~
  4
 / \
3   7
   / \
  5   6
~~~
LCA(3, 5) = <font style="color: #C72541; background: #F9F2F4;">4 </font>
LCA(5, 6) = <font style="color: #C72541; background: #F9F2F4;">7 </font>
LCA(6, 7) = <font style="color: #C72541; background: #F9F2F4;">7 </font>

## Thinking
* Find path for each node and save the path
* Compare those paths

## Review

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
According test result, we can just using *==* to check whether two nodes equals. If we use *node.val*, some results are wrong since there are some nodes have same val.
{: .note}

The previous Solution using two recursions to find all paths of both nodes. Is there a way to only using only one recursion?
Idea: 
Assume two nodes are exist in tree. Checking left and right recursion result (trying to find both node at same time. if find one, other one can be ignored in one side):
* if left != right, return current node
* if left but right is null, return left node
* if rigth but left is null, return right node

If nodes doesn't exist in tree (not implemented)
Actually, the previous implementation doesn't has this issue. For the using one recursion version, we need two helper methods: One run solution and another one is make sure a node exist. If the solution is equals A or B, it also needs to check another node using a recursion.
![lowest-common-ancestor](/images/Lintcode/lowest-common-ancestor.png)


## Solution
#### Java (Using one recursion, passed on lintcodes)
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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode A, TreeNode B) {
        if (root == null || A == null | B == null) {
            return null;
        }
        if (root == A || root == B) {
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, A, B);
        if (left != null && left != A && left != B) {
            return left; // left is already the LCA. No need to check right.
        }
        TreeNode right = lowestCommonAncestor(root.right, A, B);
        if (right != null && right != A && right != B) {
            return right; // right is already the LCA
        }
        if (left != null && right != null) {
            return root;
        } else if (left != null) {
            return left;
        } else {
            return right;
        }
    }
}
~~~

#### Java (Using two recursions)
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
     * @param root: The root of the binary search tree.
     * @param A and B: two nodes in a Binary.
     * @return: Return the least common ancestor(LCA) of the two nodes.
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode A, TreeNode B) {
        // write your code here
        if (root == null || A == null | B == null) {
            return null;
        }
        List<TreeNode> aAncenstors = new LinkedList<TreeNode>();
        List<TreeNode> bAncenstors = new LinkedList<TreeNode>();
        findLCA(root, A, aAncenstors);
        findLCA(root, B, bAncenstors);
        int len = Math.min(aAncenstors.size(), bAncenstors.size());
        TreeNode lca = null;
        for (int i = 0; i < len; i++) {
            if (aAncenstors.get(i).val == bAncenstors.get(i).val) {
                lca = aAncenstors.get(i);
            } else {
                break;
            }
        }
        return lca;
    }
    
    private boolean findLCA(TreeNode root, TreeNode node, List<TreeNode> result) {
        if (root == null) {
            return false;
        }
        result.add(root);
        if (root.val == node.val) {
            return true;
        }
        if (!findLCA(root.left, node, result) && !findLCA(root.right, node, result)) {
            result.remove(result.size() - 1);
            return false;
        }
        return true;
    }
    
}
~~~
