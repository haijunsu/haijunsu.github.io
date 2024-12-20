---
title: Sequential Search TF-IDF
author: Haijun (Navy) Su
layout: post
tags: [java, tf-idf, search]
---

## Waht is TF-IDF?

TF-IDF, or Term Frequency-Inverse Document Frequency, is a way to evaluate how important a word is to a document within a collection of documents.

* **Term Frequency (TF)** counts how often a word appears in a document.
* **Inverse Document Frequency (IDF)** measures how important a term is. While computing TF, all terms are considered equally important. But in reality, some terms like "is", "of", and "that" appear a lot but may not carry significant meaning. Thus we need to weigh down the frequent term while scaling up the rare ones.

**TF-IDF** combines these two to give a balanced measure:

```math
TF-IDF(t, d) = TF(t, d) * IDF(t)
```

In essence, it helps identify the most relevant words in a document relative to the entire collection, making it useful for tasks like information retrieval and text mining.

Example:

```java
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Arrays;

public class SequentialSearchTFIDF {

    // Method to calculate term frequency
    public static Map<String, Integer> termFrequency(String[] document) {
        Map<String, Integer> tf = new HashMap<>();
        for (String term : document) {
            tf.put(term, tf.getOrDefault(term, 0) + 1);
        }
        return tf;
    }

    // Method to calculate inverse document frequency
    public static Map<String, Double> inverseDocumentFrequency(List<String[]> documents) {
        Map<String, Integer> docCount = new HashMap<>();
        for (String[] doc : documents) {
            for (String term : Arrays.stream(doc).distinct().toArray(String[]::new)) {
                docCount.put(term, docCount.getOrDefault(term, 0) + 1);
            }
        }
        Map<String, Double> idf = new HashMap<>();
        int totalDocuments = documents.size();
        for (String term : docCount.keySet()) {
            idf.put(term, Math.log(totalDocuments / (double) docCount.get(term)));
        }
        return idf;
    }

    // Method to calculate TF-IDF
    public static Map<String, Double> tfIdf(String[] document, List<String[]> documents) {
        Map<String, Integer> tf = termFrequency(document);
        Map<String, Double> idf = inverseDocumentFrequency(documents);
        Map<String, Double> tfIdf = new HashMap<>();
        for (String term : tf.keySet()) {
            tfIdf.put(term, tf.get(term) * idf.getOrDefault(term, 0.0));
        }
        return tfIdf;
    }

    public static void main(String[] args) {
        String[] doc1 = {"this", "is", "a", "sample", "document"};
        String[] doc2 = {"this", "document", "is", "another", "example", "document"};
        String[] doc3 = {"this", "example", "is", "a", "different", "document"};

        List<String[]> documents = new ArrayList<>();
        documents.add(doc1);
        documents.add(doc2);
        documents.add(doc3);

        Map<String, Double> tfIdf = tfIdf(doc1, documents);

        System.out.println("TF-IDF scores for doc1:");
        for (String term : tfIdf.keySet()) {
            System.out.println("Term: " + term + ", TF-IDF: " + tfIdf.get(term));
        }
    }
}
```
