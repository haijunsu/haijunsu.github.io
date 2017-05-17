---
title: Lintcode Singleton
author: Haijun (Navy) Su
layout: post
---
### Question
*Singleton* is a most widely used design pattern. If a class has and only has one instance at every moment, we call this design as singleton. For example, for class Mouse (not a animal mouse), we should design it in singleton.  
Your job is to implement a getInstance method for given class, return the same instance of this class every time you call this method.

**Example**
In Java
~~~ java
A a = A.getInstance();
A b = A.getInstance();
~~~
a should equal to b.

**Challenge**
If we call getInstance concurrently, can you make sure your code could run correctly?
(In java solution, it is thread safe. Other language solutions are not thread safe)

### Java
In java, class constructor method is private.
~~~ java
class Solution {
    private static Solution instance = new Solution();
    private Solution() {
        //noop
    }
   /**
     * @return: The same instance of this class every time
     */
    public static Solution getInstance() {
        // write your code here
        return instance;
    }
};
~~~
Another version (Using synchronized):
~~~ java
class Solution {
    private static Solution instance = null;
    private Solution() {
        //noop
    }
   /**
     * @return: The same instance of this class every time
     */
    public static Solution getInstance() {
        // write your code here
        if (instance == null) {
            synchronized (Solution.class) {
                // check instance again to make sure no instance is still null
                if (instance == null) {
                    instance = new Solution();
                }
            }
        }
        return instance;
    }
};
~~~

### Python
In python, we can use *\_\_new\_\_* method to customize creating new class instance. Singleton is not populor in python because a module with functions would serve well as a singleton.
see: <http://stackoverflow.com/questions/31875/is-there-a-simple-elegant-way-to-define-singletons/31887#31887>
<http://stackoverflow.com/questions/6841853/python-accessing-module-scope-vars/6842257#6842257>
~~~ python
class Solution(object):
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Solution, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    # @return: The same instance of this class every time
    @classmethod
    def getInstance(cls):
        # write your code here
        return Solution()
~~~

### C++
~~~ java 
class Solution {
    protected:
        static Solution *instance;
        Solution() {
            // noop
        }
    public:
        /**
         * @return: The same instance of this class every time
         */
        static Solution* getInstance() {
            // write your code here
            if (instance == 0) {
                instance = new Solution();
            }
            return instance;
        }
};
Solution *Solution::instance = 0; //Don't forget define the instance in global scope
~~~

### PHP
~~~ php
<?php
class Solution {
	private static $instance = NULL;
	
	private function __construct() {
		// noop
	}
	
	static function getInstance() {
		if (NULL == self::$instance) {
			self::$instance = new Solution();
		}
		return self::$instance;
	}
}
?>
~~~
