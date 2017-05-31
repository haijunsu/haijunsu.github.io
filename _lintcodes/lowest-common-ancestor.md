---
title: Lowest Common Ancestor
author: Haijun (Navy) Su
layout: page
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

## Solution
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
