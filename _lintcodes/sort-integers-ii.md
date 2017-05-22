---
title: Sort Integers II
author: Haijun (Navy) Su
layout: page
---
### Question
Given an integer array, sort it in ascending order. Use quick sort, merge sort, heap sort or any O(nlogn) algorithm.

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">[3, 2, 1, 4, 5] </font>, return <font style="color: #C72541; background: #F9F2F4;">[1, 2, 3, 4, 5] </font>.

### Thinking
<https://www.slideshare.net/MohammedHussein8/quick-sort-merge-sort-heap-sort>
* Quick sort is a divide and conquer algorithm. Quick soft first divides a large list into two smaller sub-lists: the low elements and the high elements.
  * Select an element, called a *pivot*, from the list.
  * The *partition step* is a process that divides an *unsorted array* of elements into two smaller arrays and the pivot element. The elements to the left of the pivot are al smaller than the pivot and the elements to the right of the pivot are all larger than the pivot. After this partitioning, the pivot is in its final position.
  * Recursively sort the sub-list of lesser elements and the sub-list of greater elements.
  * The base case of the recursion are lists of size zero or one, which never need to be sorted.

* Merge Sort
  * To merge two sorted arrays, we index both arrays starting at zero, where the smallest element is located.
  * Comparing the elements at each index, we choose the smaller element, put it into the array that we are merging into.
  * Increment the index of the smaller element.
  * By this method, we continually select the next smallest element from the two arrays and merge the into sorted array.


