---
title: Anagrams
author: Haijun (Navy) Su
layout: page
lintcode_link: https://www.lintcode.com/en/problem/anagrams/
leetcode_link: https://leetcode.com/problems/group-anagrams/#/description
difficulty: Medium
tags: [Hash Table,String,Facebook,Uber,Anagrams]
---
## Question
Given an array of strings, return all groups of strings that are anagrams.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
All inputs will be in lower-case
{: .note}

**Example (Lintcode)**
Given <font style="color: #C72541; background: #F9F2F4;">["lint", "intl", "inlt", "code"] </font>, return <font style="color: #C72541; background: #F9F2F4;">["lint", "inlt", "intl"] </font>.
Given <font style="color: #C72541; background: #F9F2F4;">["ab", "ba", "cd", "dc", "e"] </font>, return <font style="color: #C72541; background: #F9F2F4;">["ab", "ba", "cd", "dc"] </font>.

**Example (Leetcode)**
Given: <font style="color: #C72541; background: #F9F2F4;">["eat", "tea", "tan", "ate", "nat", "bat"] </font>, return
~~~
[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]
~~~

## Challenge
What is Anagram?
- Two strings are anagram if they can be the same after change the order of characters.

## Thinking
* Are there some duplicate items in the array?
* Create a method to check whether two strings are anagram.
* Using map to reduce time complexity.

## Review
On leetcode, somebody gave solution that converting sting to array and using Arrays.soft(cha[]) method. This is a solution but the time complexity is n * n (log(n). My first solution works but not fancy. Using method in [Substring anagrams](/lintcodes/substring-anagrams/) is a good solution. We can create an int[26] array to count characters and converting it to string. This string is the key in map. So we don't need to sort char[] array.

## Solution
#### Java (best solution on leetcode)
~~~ java
public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> groups = new ArrayList<List<String>>();
        if (strs == null || strs.length == 0) {
            return groups;
        }
        Map<String, List<String>> grpMap = new HashMap<String, List<String>>();
        for (String str : strs) {
            int[] charCounts = new int[26];
            for(int i = 0; i < str.length(); i++) {
                charCounts[str.charAt(i) - 'a'] ++;
            }
            String key = "key";
            for (int i = 0; i < charCounts.length; i++) {
                key = key + charCounts[i];
            }
            List<String> values = grpMap.get(key);
            if (values == null) {
                values = new ArrayList<String>();
            }
            values.add(str);
            grpMap.put(key, values);
        }
        for (List<String> value : grpMap.values()) {
            groups.add(value);
        }
        return groups;
    }
}
~~~
#### Java (best solution on lintcode)
~~~ java
public class Solution {
    /**
     * @param strs: A list of strings
     * @return: A list of strings
     */
    public List<String> anagrams(String[] strs) {
        // write your code here
        List<String> groups = new ArrayList<String>();
        if (strs == null || strs.length == 0) {
            return groups;
        }
        Map<String, List<String>> grpMap = new HashMap<String, List<String>>();
        for (String str : strs) {
            int[] counts = new int[26];
            for (int i = 0; i < str.length(); i++) {
                counts[str.charAt(i) - 'a'] ++;
            }
            String key = "";
            for (int i = 0; i < counts.length; i++) {
                key = key + counts[i];
            }
            List<String> values = grpMap.get(key);
            if (values == null) {
                values = new ArrayList<String>();
            }
            values.add(str);
            grpMap.put(key, values);
        }
        for (List<String> value : grpMap.values()) {
            if (value.size() > 1) {
                groups.addAll(value);
            }
        }
        return groups;
    }
}
~~~
#### Java (Array.sort solution on lintcode)
~~~ java
public class Solution {
    /**
     * @param strs: A list of strings
     * @return: A list of strings
     */
    public List<String> anagrams(String[] strs) {
        // write your code here
        List<String> groups = new ArrayList<String>();
        if (strs == null || strs.length == 0) {
            return groups;
        }
        Map<String, List<String>> grpMap = new HashMap<String, List<String>>();
        for (String str : strs) {
            char[] charStr = str.toCharArray();
            Arrays.sort(charStr);
            String key = String.valueOf(charStr);
            List<String> values = grpMap.get(key);
            if (values == null) {
                values = new ArrayList<String>();
                values.add(str);
                grpMap.put(key, values);
            } else {
                values.add(str);
                grpMap.put(key, values);
            }
        }
        for (List<String> value : grpMap.values()) {
            if (value.size() > 1) {
                groups.addAll(value);
            }
        }
        return groups;
    }
}
~~~

#### Java (first solution on lintcode)
~~~ java
public class Solution {
    /**
     * @param strs: A list of strings
     * @return: A list of strings
     */
    public List<String> anagrams(String[] strs) {
        // write your code here
        List<String> words = new ArrayList<String>();
        if (strs == null) {
            return words;
        }
        Map<String, Boolean> wordsMap = new HashMap<String, Boolean>();
        
        for (int i = 0; i < strs.length; i++) {
            String key = strs[i];
            Set<String> keywords = wordsMap.keySet();
            if (keywords.size() == 0) {
                wordsMap.put(key, false);
            } else {
                boolean matched = false;
                for (String word : keywords) {
                    if (isAnagrams(key, word)) {
                        if (wordsMap.get(word) == false) {
                            wordsMap.put(word, true);
                            words.add(word);
                        }
                        words.add(key);
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    wordsMap.put(key, false);
                }
            }
        }
        return words;
    }
    
    private boolean isAnagrams(String first, String second) {
        if (first == null && second == null) {
            return true;
        }
        if (first == null || second == null || first.length() != second.length()) {
            return false;
        }
        Map<Character, Integer> countMap = new HashMap<Character, Integer>(); 
        for (int i = 0; i < first.length(); i++) {
            char key1 = first.charAt(i);
            char key2 = second.charAt(i);
            if (countMap.get(key1) == null) {
                countMap.put(key1, 1);
            } else {
                countMap.put(key1, countMap.get(key1) + 1);
            }
            if (countMap.get(key2) == null) {
                countMap.put(key2, -1);
            } else {
                countMap.put(key2, countMap.get(key2) - 1);
            }
        }
        
        Set<Character> keyset = countMap.keySet();
        for (Character ch : keyset) {
            if (countMap.get(ch) != 0) {
                return false;
            }
        }
        return true;
    }
}
~~~
