---
title: Cosine Similarity
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/cosine-similarity/
difficulty: Easy
tags: [Mathematics]
---
## Question
Cosine similarity is a measure of similarity between two vectors of an inner product space that measures the cosine of the angle between them. The cosine of 0° is 1, and it is less than 1 for any other angle.

See wiki: [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity)

Here is the formula:
![Cosine similarity formula](/images/Lintcode/cosine-similarity.png)
Given two vectors A and B with the same size, calculate the cosine similarity.

Return <font style="color: #C72541; background: #F9F2F4;">2.0000 </font> if cosine similarity is invalid (for example A = [0] and B = [0]).

**Example**
Given A = <font style="color: #C72541; background: #F9F2F4;">[1, 2, 3] </font>, B = <font style="color: #C72541; background: #F9F2F4;">[2, 3 ,4] </font>.

Return <font style="color: #C72541; background: #F9F2F4;">0.9926 </font>.

Given A = <font style="color: #C72541; background: #F9F2F4;">[0] </font>, B = <font style="color: #C72541; background: #F9F2F4;">[0] </font>.

Return <font style="color: #C72541; background: #F9F2F4;">2.0000 </font>.

## Solution
#### Java
~~~ java
class Solution {
    /**
     * @param A: An integer array.
     * @param B: An integer array.
     * @return: Cosine similarity.
     */
    public double cosineSimilarity(int[] A, int[] B) {
        if (A.length == 0) { // invalid
            return 2d;
        }
        // write your code here
        int abSum = 0;
        int a2Sum = 0;
        int b2Sum = 0;
        for (int i = 0; i < A.length; i++) {
            abSum += A[i] * B[i];
            a2Sum += A[i] * A[i];
            b2Sum += B[i] * B[i];
        }
        if (a2Sum == 0 || b2Sum == 0) { // invalid
            return 2d;
        }
        return abSum / (Math.sqrt(a2Sum) * Math.sqrt(b2Sum));
    }
}

~~~
