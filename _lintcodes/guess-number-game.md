---
title: Guess Number Game
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/guess-number-game/
difficulty: Easy
tags: [Binary Search,Google]
---
## Question
We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I'll tell you whether the number is higher or lower.
You call a pre-defined API <font style="color: #C72541; background: #F9F2F4;">guess(int num)</font> which returns 3 possible results (-1, 1, or 0):

**Example**
n = 10, I pick 4 (but you don't know)
Return 4. Correct !

## Thinking
Recursion causes overflow.
Binary search is not good for long array. Timeout for this question.
Interpolation search is difficulty since we don't know the value we are looking for. Guess position is (key - low)/(high - low). [mid] = [low] + (key - low)/(high - low) * ([high] - [low]). [low] means position in an array. If we know the key, the key will be the position in this problem.
Fibonacci search also ran timeout.

<https://en.wikipedia.org/wiki/Binary_search_algorithm>
<http://www.geeksforgeeks.org/fibonacci-search/>

## Solution
#### Java (Binary Search)

<i class="fa fa-info-circle" aria-hidden="true"></i> Note: This is not a solution. It runs timeout for input (2147483647, 2147483647) 
**Workaround:** check guess(n) first and then the timeout is gone.
{: .note}

~~~ java
/* The guess API is defined in the parent class GuessGame.
   @param num, your guess
   @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
      int guess(int num); */

public class Solution extends GuessGame {
    /**
     * @param n an integer
     * @return the number you guess
     */
    public int guessNumber(int n) {
        // Write your code here
        if (guess(n) == 0) { // fix timeout for 2147483647
            return n;
        }
        int start  = 1;
        int end = n;
        int mid = 0; // guess number
        int result = -2; // guess result
        while (start <= end) {
            mid = start + (end - start) / 2;
            result = guess(mid);
            if (result == 1) {
                start = mid + 1;
            } else if (result == -1) {
                end = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
}
~~~

#### Java (Fibonacci Search)

<i class="fa fa-info-circle" aria-hidden="true"></i> Note: This is not a solution. It runs timeout for input (2147483647, 2147483647) 
{: .note}

~~~ java
/* The guess API is defined in the parent class GuessGame.
   @param num, your guess
   @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
      int guess(int num); */

public class Solution extends GuessGame {
    /**
     * @param n an integer
     * @return the number you guess
     */
    public int guessNumber(int n) {
        // Write your code here
        int low  = 0;
        int high = n;
        int mid = 0; // guess number
        int fiba = 0;
        int fibb = 1;
        int fib = fiba + fibb;
        while (fib <= n) {
            fiba = fibb;
            fibb = fib;
            fib = fiba + fibb;
        }
        int result = -2; // guess result
        while (fib > 1) {
            mid = Math.min(low + fiba, n - 1);
//            System.out.println(fiba + ", " + fibb + ", " + fib + ", " + low + ", " + mid);
            result = guess(mid);
            if (result == 1) {
                fib = fibb;
                fibb = fiba;
                fiba = fib - fiba;
                low = mid;
            } else if (result == -1) {
                fib = fiba;
                fibb = fibb - fiba;
                fiba = fib - fibb;
            } else {
                return mid;
            }
        }
//        System.out.println("here");
        if (fibb == 1 && guess(mid + 1) == 0) {
            return mid + 1;
        }
        return -1;
    }
}
~~~
