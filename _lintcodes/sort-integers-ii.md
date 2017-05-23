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


### Solution
#### Java (Quick sort)

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice: Sometimes it may run time exceed limited because the worst case is O(n2).
{: .note}

~~~ java
public class Solution {
    /**
     * @param A an integer array
     * @return void
     */
    public void sortIntegers2(int[] A) {
        // Write your code here
        // quick sort
        if (A == null || A.length < 2) {
            return;
        }
        if (A.length == 2) {
            if (A[0] > A[1]) {
                int tmp = A[0];
                A[0] = A[1];
                A[1] = tmp;
            }
            return;
        }
        int pivot = (int) Math.floor(Math.random() * A.length);
        List<Integer> firstArray = new ArrayList<Integer>();
        List<Integer> secondArray = new ArrayList<Integer>();
        int pivotValue = A[pivot];
        for (int i = 0; i < A.length; i++) {
            if (i == pivot) {
                continue;
            }
            if (A[i] < pivotValue) {
                firstArray.add(A[i]);
            } else {
                secondArray.add(A[i]);
            }
        }
        int[] first = new int[firstArray.size()];
        int[] second = new int[secondArray.size()];
        for (int i = 0; i < first.length; i++) {
            first[i] = firstArray.get(i);
        }
        for (int i = 0; i < second.length; i++) {
            second[i] = secondArray.get(i);
        }
        sortIntegers2(first);
        sortIntegers2(second);
        for (int i = 0; i < first.length; i++) {
            A[i] = first[i];
        }
        A[first.length] = pivotValue;
        for (int i = 0; i < second.length; i++) {
            A[first.length + i + 1] = second[i];
        }
    }
}
~~~

#### Java (merge sort)

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice: Sometimes it may run time exceed limited because the worst case is O(nlogn). The verifing argrithem may be quick sort.
{: .note}

~~~ java
public class Solution {
    /**
     * @param A an integer array
     * @return void
     */
    public void sortIntegers2(int[] A) {
        // Write your code here
        // merge sort
        if (A == null || A.length < 2) {
            return;
        }
        if (A.length == 2) {
            if (A[0] > A[1]) {
                int tmp = A[0];
                A[0] = A[1];
                A[1] = tmp;
            }
            return;
        }
        int mid = A.length / 2;
        int[] firstArray = new int[mid];
        int[] secondArray = new int[A.length - mid];
        for (int i = 0; i < mid; i++) {
            firstArray[i] = A[i];
        }
        for (int i = mid; i < A.length; i++) {
            secondArray[i - mid] = A[i];
        }
        sortIntegers2(firstArray);
        sortIntegers2(secondArray);
        int index = 0;
        for (int i = 0, j = 0; i < firstArray.length || j < secondArray.length; ) {
            if (i >= firstArray.length) {
                A[index++] = secondArray[j++];
                continue;
            }
            if (j >= secondArray.length) {
                A[index++] = firstArray[i++];
                continue;
            }
            if (firstArray[i] < secondArray[j]) {
                A[index++] = firstArray[i++];
            } else {
                A[index++] = secondArray[j++];
            }
        }
    }
}
~~~
