---
title: String Permutation
author: Haijun (Navy) Su
layout: page
---
### Question
Given two strings, write a method to decide if one is a permutation of the other.
**Example**
**abcd** is a permutation of *bcad*, but **abbe** is not a permutation of *abe*

### Thinking
What is permutation and combinatorics? <https://zh.wikipedia.org/wiki/%E7%BB%84%E5%90%88%E6%95%B0%E5%AD%A6>
Permutation considers orders of elements while Combinatorics does not.
![Permutation and Combinatorics](/images/Lintcode/string-permutation.png)

* null value doesnot meet requirement
* If A and B have different length, they don't meet the requirement.
* Check B elements and make sure A has them.
* Remove found charactors in A to avoid misjudge duplicate charactors

### Java
~~~ java
public class Solution {
    /**
     * @param A a string
     * @param B a string
     * @return a boolean
     */
    public boolean stringPermutation(String A, String B) {
        // Write your code here
        // check null value
        if (A == null || B == null) {
            return false;
        }
        // check length
        if (A.length() != B.length()) {
            return false;
        }
        // convert string to char array
        char[] aChars = A.toCharArray();
        char[] bChars = B.toCharArray();
        // compare element in bChars
        for (int i = 0; i < bChars.length; i++) {
            boolean isFound = false;
            for (int j = 0; j < aChars.length; j++) {
                if (bChars[i] == aChars[j]) {
                    // found 
                    aChars[j] = 0; // avoid duplicate chars
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                // not found
                return false;
            }
        }
        return true;
    }
}
~~~
