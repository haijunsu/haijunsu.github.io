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

* Heap Sort begins by building a heap out of the data set, and then removing the largest item and placing it at the end of the partially sorted array.
  * After removeing the largest item, it reconstructs the heap, removes the largest remaining item, and places it in the next open position from the end of the partially sorted array. This is repeaded until there are no items left in the heap and the sorted array is full.
  * Elementary implementations require two arrays - one to hold the heap and the
    other to hold the sorted elements.
  * The heap sort algorithm consists of two primary steps:
    * First, we construct a heap from the elements.
    * Second, we repeatedly take the largest element of the heap and swap it
      with the end until we fully sort the array
[Heap Sort example](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/code/Heap.java)<`3`>



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

### Java (Heap Sort)
~~~ java
public class Solution {
    /**
     * @param A an integer array
     * @return void
     */
    public void sortIntegers2(int[] A) {
        // Write your code here
        if (A == null || A.length < 2) {
            return;
        }
        int size = A.length;
        int index = 0;
        int[] heap = buildHeap(A);
        for (int i = size; i > 0; i--) {
            A[index++] = heap[1];
            heap[1] = heap[i];
            precolatingDown(heap, 1, --size);
        }
     }
    
    // An array is already a heap. For node i, the left node is i * 2 and 
    // the right node is i * 2 + 1
    private int[] buildHeap(int[] A) {
        int[] heap = new int[A.length + 1]; // heap start at index 1 instead of 0
        System.arraycopy(A, 0, heap, 1, A.length);
        for (int i = heap.length / 2; i > 0; i--) { // from the last one node
            precolatingDown(heap, i, A.length);
        }
        return heap;
    }
    
    private void precolatingDown(int[] heap, int index, int size) {
        int value = heap[index];
        int child = 0;
        while (2 * index <= size) {
            child = 2 * index;
            if (child != size && heap[child] > heap[child + 1]) {
                ++child;
            }
            if (value > heap[child]) {
                heap[index] = heap[child];
                index = child;
            } else {
                break;
            }
        }
        heap[index] = value;
    }
    
}
~~~

### Heap sort example source code
~~~ java
/****************************************************************************
 *       This demonstrates binary heap operations along with the heapSort.
 *
 *****************************************************************************/
import java.util.*;

@SuppressWarnings("unchecked")
public class Heap<AnyType extends Comparable<AnyType>>
{
   private static final int CAPACITY = 2;

   private int size;            // Number of elements in heap
   private AnyType[] heap;     // The heap array

   public Heap()
   {
      size = 0;
      heap = (AnyType[]) new Comparable[CAPACITY];
   }

 /**
  * Construct the binary heap given an array of items.
  */
   public Heap(AnyType[] array)
   {
      size = array.length;
      heap = (AnyType[]) new Comparable[array.length+1];

      System.arraycopy(array, 0, heap, 1, array.length);//we do not use 0 index

      buildHeap();
   }
 /**
  *   runs at O(size)
  */
   private void buildHeap()
   {
      for (int k = size/2; k > 0; k--)
      {
         percolatingDown(k);
      }
   }
   private void percolatingDown(int k)
   {
      AnyType tmp = heap[k];
      int child;

      for(; 2*k <= size; k = child)
      {
         child = 2*k;

         if(child != size &&
            heap[child].compareTo(heap[child + 1]) > 0) child++;

         if(tmp.compareTo(heap[child]) > 0)  heap[k] = heap[child];
         else
                break;
      }
      heap[k] = tmp;
   }

 /**
  *  Sorts a given array of items.
  */
   public void heapSort(AnyType[] array)
   {
      size = array.length;
      heap = (AnyType[]) new Comparable[size+1];
      System.arraycopy(array, 0, heap, 1, size);
      buildHeap();

      for (int i = size; i > 0; i--)
      {
         AnyType tmp = heap[i]; //move top item to the end of the heap array
         heap[i] = heap[1];
         heap[1] = tmp;
         size--;
         percolatingDown(1);
      }
      for(int k = 0; k < heap.length-1; k++)
         array[k] = heap[heap.length - 1 - k];
   }

 /**
  * Deletes the top item
  */
   public AnyType deleteMin() throws RuntimeException
   {
      if (size == 0) throw new RuntimeException();
      AnyType min = heap[1];
      heap[1] = heap[size--];
      percolatingDown(1);
      return min;
	}

 /**
  * Inserts a new item
  */
   public void insert(AnyType x)
   {
      if(size == heap.length - 1) doubleSize();

      //Insert a new item to the end of the array
      int pos = ++size;

      //Percolate up
      for(; pos > 1 && x.compareTo(heap[pos/2]) < 0; pos = pos/2 )
         heap[pos] = heap[pos/2];

      heap[pos] = x;
   }
   private void doubleSize()
   {
      AnyType [] old = heap;
      heap = (AnyType []) new Comparable[heap.length * 2];
      System.arraycopy(old, 1, heap, 1, size);
   }

   public String toString()
   {
      String out = "";
      for(int k = 1; k <= size; k++) out += heap[k]+" ";
      return out;
   }

   public static void main(String[] args)
   {
      Heap<String> h = new Heap<String>();

      h.insert("p");
      h.insert("r");
      h.insert("i");
      h.insert("o");
      System.out.println(h);
      h.deleteMin();
      System.out.println(h);


      Heap<Integer> tmp = new Heap<Integer>();
      Integer[] a = {4,7,7,7,5,0,2,3,5,1};
      tmp.heapSort(a);
      System.out.println(Arrays.toString(a));
   }
}
~~~
