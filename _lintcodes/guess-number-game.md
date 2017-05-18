---
title: Guess Number Game
author: Haijun (Navy) Su
layout: page
---
### Question
We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I'll tell you whether the number is higher or lower.
You call a pre-defined API <font style="color: #C72541; background: #F9F2F4;">guess(int num)</font> which returns 3 possible results (-1, 1, or 0):

**Example**
n = 10, I pick 4 (but you don't know)
Return 4. Correct !

### Thinking
Recursion causes overflow.
Binary search is not good for long array. Timeout for this question.
Interpolation search is difficulty since we don't know the value we are looking for. Guess position is (key - low)/(high - low). [mid] = [low] + (key - low)/(high - low) * ([high] - [low]). [low] means position in an array. If we know the key, the key will be the position in this problem.

<https://en.wikipedia.org/wiki/Binary_search_algorithm>

### Java (Binary Search)

<i class="fa fa-info" aria-hidden="true"></i> Note: This is not a solution. It runs timeout for input (2147483647, 2147483647) 
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
        int low  = 1;
        int high = n;
        int mid = 0; // guess number
        int result = -2; // guess result
        while (low <= high) {
            mid = (low + high) / 2;
            result = guess(mid);
            switch (result) {
                case 0: // got it
                    return mid;
                case 1: // too low
                    low = mid + 1;
                    break;
                case -1: // too high
                    high = mid - 1;
                    break;
                default:
            }
        }
        return -1;
    }
}
~~~
