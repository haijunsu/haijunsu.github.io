---
title: JavaFx VM Parameters
author: Haijun (Navy) Su
layout: post
tags: [javafx, java]
---

Java FX is a standalone package after Java 8. To run Java FX application, we must add VM parameters as below.

```
--module-path "<javafx-lib-path>" --add-modules=javafx.controls,javafx.fxml --add-exports  javafx.graphics/com.sun.javafx.application=ALL-UNNAMED
```

For example:

```
--module-path "C:\Users\donotguessme\Documents\javafx-sdk-11.0.2\lib" --add-modules=javafx.controls,javafx.fxml --add-exports  javafx.graphics/com.sun.javafx.application=ALL-UNNAMED
```
