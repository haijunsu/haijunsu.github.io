---
title: Anagrams
author: Haijun (Navy) Su
layout: page
---
## Question
Given an array of strings, return all groups of strings that are anagrams.

<i class="fa fa-info-circle" aria-hidden="true"></i> Notice
All inputs will be in lower-case
{: .note}

**Example**
Given <font style="color: #C72541; background: #F9F2F4;">["lint", "intl", "inlt", "code"] </font>, return <font style="color: #C72541; background: #F9F2F4;">["lint", "inlt", "intl"] </font>.
Given <font style="color: #C72541; background: #F9F2F4;">["ab", "ba", "cd", "dc", "e"] </font>, return <font style="color: #C72541; background: #F9F2F4;">["ab", "ba", "cd", "dc"] </font>.

## Challenge
What is Anagram?
- Two strings are anagram if they can be the same after change the order of characters.

## Thinking
* Are there some duplicate items in the array?
* Create a method to check whether two strings are anagram.
* Using map to reduce time complexity.

## Solution
### Java
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
