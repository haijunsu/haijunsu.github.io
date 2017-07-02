---
title: LRU Cache
author: Haijun (Navy) Su
layout: page
difficulty: Hard
lintcode_link: http://www.lintcode.com/en/problem/lru-cache/
leetcode_link: https://leetcode.com/problems/lru-cache/#/description
tags: [Linked List,Google,Uber,Zenefits]
---
## Question
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: <font style="color: #C72541; background: #F9F2F4;">get </font>and <font style="color: #C72541; background: #F9F2F4;">set </font>.

<font style="color: #C72541; background: #F9F2F4;">get(key) </font> - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
<font style="color: #C72541; background: #F9F2F4;">set(key, value) </font> - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

**Example**
Input: 
~~~
2, [set(2,1),set(1,1),get(2),set(4,1),get(1),get(2)]
~~~
Expected output:
~~~
[1,-1,1]
~~~

**Challenge**
Could you do both operations in *O(1)* time complexity?


## Thinking
* Using Map<Integer, Integer> to store key, value
* Using a list to store keys ordered by access time
* To keep the keys order by access, the key should be always moved to the last position (remove object from list and add object again)
* The least recently used always be the first element in the list.

## Review
* Using a deLinkedList and a map to do it. It takes O(1) to get key from map and also only O(1) to move the object form begin to new position.
* Using LinkedHashMap to do it. But it may not be interviewers want.
* LintCode is not support DeLinkedList
* Create an empty deLinkedList first. Then use general methods to do add, move, and pop. At first I didn't create an empty deLinkedList and there are a lot of problem to check head and tail null values.

## Solution
#### Java (Map and DeLinkedList, passed on Leetcode. Lintcode cannot compile it)
~~~ java
public class LRUCache {

    class DeLinkedNode {
        int key;
        int value;
        DeLinkedNode next;
        DeLinkedNode pre;
        DeLinkedNode(int key, int value) {
            this.key = key;
            this.value = value;
            this.pre = null;
            this.next = null;
        }
    }
    
    class DeLinkedList {
        DeLinkedNode head = null;
        DeLinkedNode tail = null;
        DeLinkedList() {
            head = new DeLinkedNode(-1, -1);
            tail = new DeLinkedNode(-1, -1);
            head.next = tail;
            tail.pre = head;
        }
        
        void add(DeLinkedNode node) {
            node.next = head.next;
            node.pre = head;
            head.next.pre = node;
            head.next = node;
        }
        
        void remove(DeLinkedNode node) {
            node.pre.next = node.next;
            node.next.pre = node.pre;
        }
        
        void moveToFirst(DeLinkedNode node) {
            remove(node);
            add(node);
        }
        
        DeLinkedNode popLast() {
            DeLinkedNode last = tail.pre;
            remove(last);
            return last;
        }
        
    }

    Map<Integer, DeLinkedNode> map = null;
    DeLinkedList deList = null;
    int capacity = 0;
    int size  = 0;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<Integer, DeLinkedNode>();
        deList = new DeLinkedList();
    }
    
    public int get(int key) {
        DeLinkedNode node = map.get(key);
        if (node == null) {
            return -1;
        }
        
        deList.moveToFirst(node);
        
        return node.value;
    }
    
    public void put(int key, int value) {
        DeLinkedNode node = map.get(key);
        if (node == null) {
            if (size == capacity) {
                DeLinkedNode last = deList.popLast();
                map.remove(last.key);
                --size;
            }
            node = new DeLinkedNode(key, value);
            map.put(key, node);
            deList.add(node);
            ++size;
        } else {
            node.value = value;
            deList.moveToFirst(node);
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
~~~

#### Java (Map and arraylist. It is not O(1))
~~~ java
public class Solution {
    
    private Map<Integer, Integer> values = new HashMap<Integer, Integer>();
    private List<Integer> orderedKeys = new ArrayList<Integer>();
    private int capacity = 0;
    private int size = 0;

    // @param capacity, an integer
    public Solution(int capacity) {
        // write your code here
        this.capacity = capacity;
    }

    // @return an integer
    public int get(int key) {
        // write your code here
        Integer value = values.get(key);
        if (value == null) {
            return -1;
        }
        orderedKeys.remove(Integer.valueOf(key));
        orderedKeys.add(key);
        return value;
    }

    // @param key, an integer
    // @param value, an integer
    // @return nothing
    public void set(int key, int value) {
        // write your code here
        Integer val = values.get(key);
        if (val == null) {
            checkCapacity();
            values.put(key, value);
            orderedKeys.add(key);
            ++size;
        } else {
            values.put(key, value);
            orderedKeys.remove(Integer.valueOf(key));
            orderedKeys.add(key);
        }
    }
    
    private void checkCapacity() {
        if (size >= capacity) {
            values.remove(orderedKeys.remove(0));
            --size;
        }
    }
}
~~~
