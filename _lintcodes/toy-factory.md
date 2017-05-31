---
title: Toy Factory
author: Haijun (Navy) Su
layout: page
---
## Question
Factory is a design pattern in common usage. Please implement a <font style="color: #C72541; background: #F9F2F4;">ToyFactory</font> which can generate proper toy based on the given type.

**Example**
~~~
ToyFactory tf = ToyFactory();
Toy toy = tf.getToy('Dog');
toy.talk(); 
>> Wow

toy = tf.getToy('Cat');
toy.talk();
>> Meow
~~~

## Solution
**Java**
~~~ java
/**
 * Your object will be instantiated and called as such:
 * ToyFactory tf = new ToyFactory();
 * Toy toy = tf.getToy(type);
 * toy.talk();
 */
interface Toy {
    void talk();
}

class Dog implements Toy {
    // Write your code here
    public void talk() {
        System.out.println("Wow");
    }
}

class Cat implements Toy {
    // Write your code here
    public void talk() {
        System.out.println("Meow");
    }
}

public class ToyFactory {
    /**
     * @param type a string
     * @return Get object of the type
     */
    public Toy getToy(String type) {
        // Write your code here
        if (type == null) {
            return null;
        }
        if (type.equals("Dog")) {
            Toy dog = new Dog();
            return dog;
        } else if (type.equals("Cat")) {
            Toy cat = new Cat();
            return cat;
        } else {
            return null;
        }
    }
}
~~~


