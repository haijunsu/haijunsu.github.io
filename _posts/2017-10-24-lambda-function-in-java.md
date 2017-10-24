---
title: Lambda Function in Java
author: Haijun (Navy) Su
layout: post
tags: [Java, lambda]
---
Lambda expression replaces anonymous classes and removes all boiler plate, enabling you to write code in functional style, which is some time more readable and expression.
## Lambda Expression vs Anonymous class
1. Keyword *this*. For anonymous class *this* keyword resolves to **anonymous** class, whereas for lambda expression *this* keyword resolves to **enclosing** class where lambda is written.
2. The compiled way. Java compiler compiles lambda expressions and convert them into private method of the class.

### Lambda expression format
```java
(params) -> expression
(params) -> statement
(params) -> { statements }
```
Example:
```java
() -> System.out.println("Hello Lambda.");
(int x, int y) -> x + y;
```

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
To keep lambda expression simple and shorter, the general practice is keeping variable name short inside lambda expressions. It is different with variable name in normal class.
{: .note}

## Lambda example codes
**Only predefined Functional interface using @Functional annotation or method with one abstract method or SAM (Single Abstract Method) type can be used inside lambda expressions. Example: Runnable, Comparable, Callable, Predicate, Function, Consumer, or Supplier.**

* Implementing Runnable using Lambda expression.

```java
//Before Java 8:
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Before Java8, too much code for too little to do");
        }
    }
).start();

//Java 8 way:
new Thread( () -> System.out.println("In Java8, Lambda expression rocks !!") ).start();
```
Output:
```
Before Java8, too much code for too little to do
In Java8, Lambda expression rocks !!
```

* Event handling using Java 8 Lambda expressions

```java
// Before Java 8:
JButton show = new JButton("Show");
show.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Event handling without lambda expression is boring");
        }
    }
);

// Java 8 way:
show.addActionListener((e) -> {
    System.out.println("Light, Camera, Action !! Lambda expressions Rocks");
    }
);
```

* Using Lambda expression and Functional interface Predicate

```java
public static void filter(List names, Predicate condition) {
    for (String name: names) {
        if (condition.test(name)) {
            System.out.println(name + " ");
        }
    }
}
// Even btter
public static void filter(List names, Predicate condition) {
    names.stream().filter(
        (name) -> (condition.test(name))).forEach(
            (name) -> { System.out.println(name + " "); }
        );
}

public static void main(args[]){
    List languages = Arrays.asList("Java", "Scala", "C++", "Haskell", "Lisp");
    System.out.println("Languages which starts with J :");
    filter(languages, (str)->str.startsWith("J"));
    System.out.println("Languages which ends with a ");
    filter(languages, (str)->str.endsWith("a"))
}
```

* How to combine Predicate in Lambda Expressions
```java
//We can even combine Predicate using and(), or() And xor() logical functions
// for example to find names, which starts with J and four letters long, you
// can pass combination of two Predicate
Predicate<String> startsWithJ = (n) -> n.startsWith("J");
Predicate<String> fourLetterLong = (n) -> n.length() == 4;
names.stream()
      .filter(startsWithJ.and(fourLetterLong))
      .forEach((n) -> System.out.print("\nName, which starts with 'J' and four letter long is : " + n));
```

**You can use method reference inside lambda expression if method is not modifying the parameter supplied by lambda expression.**

* Iterating over List using Lambda expressions
```java
//Prior Java 8 :
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
for (String feature : features) {
    System.out.println(feature);
}
//In Java 8:
List features = Arrays.asList("Lambdas", "Default Method", "Stream API", "Date and Time API");
features.forEach(n -> System.out.println(n));
// Even better use Method reference feature of Java 8 method reference is denoted by :: (double colon) operator
// looks similar to score resolution operator of C++
features.forEach(System.out::println);
```

* Map example using lambda expressions
Map allows you to transform your oublect.

```java
// applying 12% VAT on each purchase
// Without lambda expressions:
List costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
for (Integer cost : costBeforeTax) {
    double price = cost + .12*cost;
    System.out.println(price);
    }

// With Lambda expression:
List costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
costBeforeTax.stream().map((cost) -> cost + .12*cost).forEach(System.out::println);
```
Output
```
112.0
224.0
336.0
448.0
560.0
112.0
224.0
336.0
448.0
560.0
```
* Recude example using lambda expressions
Stream API defines reduce() function which can accept a lambda expression, and combine all values. Stream classes like IntStream has built-in methods like average(), count(), sum() to perform reduce operations and mapToLong(), mapToDouble() methods for transformations.
```java
// Applying 12% VAT on each purchase
// Old way:
List costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
double total = 0;
for (Integer cost : costBeforeTax) {
    double price = cost + .12*cost;
    total = total + price;
}
System.out.println("Total : " + total);
// New way:
List costBeforeTax = Arrays.asList(100, 200, 300, 400, 500);
double bill = costBeforeTax.stream().map((cost) -> cost + .12*cost)
                .reduce((sum, cost) -> sum + cost).get();
    System.out.println("Total : " + bill);
```
Output
```
Total : 1680.0
Total : 1680.0
```

* Creating a List of String by filtering
```java
// Create a List with String more than 2 characters
List strList = Arrays.asList("abc", "", "bcd", "", "defg", "jk");
List<String> filtered = strList.stream().filter(x -> x.length()> 2).collect(Collectors.toList());
System.out.printf("Original List : %s, filtered list : %s %n", strList, filtered);
```
Output :
```
Original List : [abc, , bcd, , defg, jk], filtered list : [abc, bcd, defg]
```
* Applying function on Each element of List
```java
// Convert String to Uppercase and join them using coma
List<String> G7 = Arrays.asList("USA", "Japan", "France", "Germany", "Italy", "U.K.","Canada");
String G7Countries = G7.stream().map(x -> x.toUpperCase()).collect(Collectors.joining(", "));
System.out.println(G7Countries);
```
Output:

```
USA, JAPAN, FRANCE, GERMANY, ITALY, U.K., CANADA
```

* Creating a Sub List by Copying distinct values
```java
// Create List of square of all distinct numbers
List<Integer> numbers = Arrays.asList(9, 10, 3, 4, 7, 3, 4);
List<Integer> distinct = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
System.out.printf("Original List : %s,  Square Without duplicates : %s %n", numbers, distinct);
```
Output :
```
Original List : [9, 10, 3, 4, 7, 3, 4],  Square Without duplicates : [81, 100, 9, 16, 49]
```
* Calculating Maximum, Minimum, Sum and Average of List elements
There is a very useful method called *summaryStattics()* in **stream** classes like *IntStream*, *LongStream* and *DoubleStream*. Which returns returns an *IntSummaryStatistics*, *LongSummaryStatistics* or *DoubleSummaryStatistics* describing various summary data about the elements of this stream.
```java
//Get count, min, max, sum, and average for numbers
List<Integer> primes = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29);
IntSummaryStatistics stats = primes.stream().mapToInt((x) -> x).summaryStatistics();
System.out.println("Highest prime number in List : " + stats.getMax());
System.out.println("Lowest prime number in List : " + stats.getMin());
System.out.println("Sum of all prime numbers : " + stats.getSum());
System.out.println("Average of all prime numbers : " + stats.getAverage());
```
Output:
```
Highest prime number in List : 29
Lowest prime number in List : 2
Sum of all prime numbers : 129
Average of all prime numbers : 12.9
```
## Other needs to know
* You can use both *static*, *non static* and *local* variable inside lambda, this is called capturing variables inside lambda
* One restriction with lambda expression is that, you can only reference either final or effectively final local variables, which means you cannot modified a variable declared in the outer scope inside a lambda.


Reference:
<http://javarevisited.blogspot.com/2014/02/10-example-of-lambda-expressions-in-java8.html>
