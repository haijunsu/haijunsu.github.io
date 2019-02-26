---
title: Find Prime numbers
author: Haijun (Navy) Su
layout: page
difficulty: Easy
tags: []
---
## Question
Find a prime numbers between n and m

#### Python
~~~python
# n=4, m=25                                                                                                                                                                     
# output: all prime number between 4 to 25                                                                                                                                      
                                                                                                                                                                                
def findPrime(n, m):                                                                                                                                                          
    allPrimes = []                                                                                                                                                            
    for i in range(m):                                                                                                                                                        
        start = 2
        isPrime = True
        for j in range(2, int(i ** 0.5) + 1): # squre root is the max value
            if i % j == 0:
                isPrime = False
                break
        if isPrime:
            allPrimes.append(i)
    return [i for i in allPrimes if i >= n]  
~~~

