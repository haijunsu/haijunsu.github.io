---
title: Connecting Graph
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/connecting-graph/
difficulty: Medium
tags: [Union Find]
---
## Question
Given <font style="color: #C72541; background: #F9F2F4;">n </font> nodes in a graph labeled from <font style="color: #C72541; background: #F9F2F4;">1 </font>to <font style="color: #C72541; background: #F9F2F4;">n </font>. There is no edges in the graph at beginning.

You need to support the following method:
 1) <font style="color: #C72541; background: #F9F2F4;">connect(a, b)</font>, add an edge to connect node <font style="color: #C72541; background: #F9F2F4;">a </font>and node <font style="color: #C72541; background: #F9F2F4;">b </font>. 
 2) <font style="color: #C72541; background: #F9F2F4;">query(a, b)</font>, check if two nodes are connected

**Example**
~~~
5 // n = 5
query(1, 2) return false
connect(1, 2)
query(1, 3) return false
connect(2, 4)
query(1, 4) return true
~~~

## Thinking
<font style="color: #C72541; background: #F9F2F4;">Add an edge to connect node a and node b DOES NOT mean the edge from node a to node b. The edge maybe between some nodes which are A parent and B parent.</font>

## Review
Since n is known, we can use an array to store roots.

## Solution
In this solution, we use root of each nodes to connect two nodes.
#### Java (Review)
~~~ java
public class ConnectingGraph { 
    
    private int[] roots = null;

    public ConnectingGraph(int n) {
        // initialize your data structure here.
        roots = new int[n + 1]; // we don't use index 0
        for (int i = 1; i <= n; i++) {
            roots[i] = i;
        }
    }

    public void connect(int a, int b) {
        // Write your code here
        int rootA = getRoot(a);
        int rootB = getRoot(b);
        if (rootA != rootB) {
            roots[rootA] = rootB; // connect a and b by root
        }
    }
        
    public boolean  query(int a, int b) {
        // Write your code here
        return getRoot(a) == getRoot(b);
    }
    
    private int getRoot(int node) {
        if (roots[node] == node) {
            return node;
        }
        int root = getRoot(roots[node]);
        roots[node] = root;
        return root;
    }
}
~~~
#### Java
~~~ java
public class ConnectingGraph { 
    
    private Map<Integer, Integer> rootMap = new HashMap<Integer, Integer>();

    public ConnectingGraph(int n) {
        // initialize your data structure here.
        for (int i = 1; i <= n; i++) {
            rootMap.put(i, i);
        }
    }

    public void connect(int a, int b) {
        // Write your code here
        int rootA = getRoot(a);
        int rootB = getRoot(b);
        if (rootA != rootB) {
            rootMap.put(rootA, rootB);
        }
    }
        
    public boolean  query(int a, int b) {
        // Write your code here
        return getRoot(a) == getRoot(b);
    }
    
    private int getRoot(int node) {
        Integer root = rootMap.get(node);
        if (root == null) {
            rootMap.put(node, node);
            return node;
        }
        if (root == node) {
            return node;
        }
        root = getRoot(root);
        rootMap.put(node, root);
        return root;
    }
    
}
~~~
