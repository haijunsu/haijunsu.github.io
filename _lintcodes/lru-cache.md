---
title: LRU Cache
author: Haijun (Navy) Su
layout: page
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

## Thinking
* Using Map<Integer, Integer> to store key, value
* Using a list to store keys ordered by access time
* To keep the keys order by access, the key should be always moved to the last position (remove object from list and add object again)
* The least recently used always be the first element in the list.

## Solution
#### Java
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
