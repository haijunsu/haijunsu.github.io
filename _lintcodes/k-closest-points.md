---
title: K Closest Points
author: Haijun (Navy) Su
layout: page
difficulty: Medium
lintcode_link: http://www.lintcode.com/en/problem/k-closest-points/
tags: [LinkedIn,Heap,Amazon]
---
## Question
Given some <font style="color: #C72541; background: #F9F2F4;">points </font>and a point <font style="color: #C72541; background: #F9F2F4;">origin </font>in two dimensional space, find k points out of the some points which are nearest to <font style="color: #C72541; background: #F9F2F4;">origin </font>.
Return these points sorted by distance, if they are same with distance, sorted by x-axis, otherwise sorted by y-axis.

**Example**
Given points = <font style="color: #C72541; background: #F9F2F4;">[[4,6],[4,7],[4,4],[2,5],[1,1]] </font>, origin = <font style="color: #C72541; background: #F9F2F4;">[0, 0] </font>, k = <font style="color: #C72541; background: #F9F2F4;">3 </font>
return <font style="color: #C72541; background: #F9F2F4;">[[1,1],[2,5],[4,4]] </font>

## Thinking
* Using Treeset or PriorityQueue to implement it. Need to create a Comparator.

## Solution
#### Java
~~~ java
 * Definition for a point.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */
public class Solution {
    /**
     * @param points a list of points
     * @param origin a point
     * @param k an integer
     * @return the k closest points
     */
    public Point[] kClosest(Point[] points, Point origin, int k) {
        // Write your code here
        final Point fpt = origin;
        PriorityQueue<Point> pq = new PriorityQueue<Point>(k, new Comparator<Point>() {
            public int compare(Point p1, Point p2) {
                int x = p1.x - fpt.x;
                int y = p1.y - fpt.y;
                double dist1 = Math.sqrt(x * x + y * y);
                x = p2.x - fpt.x;
                y = p2.y - fpt.y;
                double dist2 = Math.sqrt(x * x + y * y);
                if (dist1 == dist2) {
                    if (p1.x == p2.x) {
                        return p1.y <= p2.y ? -1 : 1;
                    } else if (p1.x < p2.x) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else if (dist1 < dist2) {
                    return -1;
                } else {
                    return 1;
                }
            }   
        });
        for (Point pt : points) {
            if (!pq.offer(pt)) {
                pq.poll();
                pq.offer(pt);
            }
        }
        Point[] results = new Point[k];
        for (int i = 0; i < k; i++) {
            results[i] = pq.poll();
        }
        return results;
    }
}
~~~
