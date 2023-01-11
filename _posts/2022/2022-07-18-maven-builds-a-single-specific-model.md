---
title: Maven Builds a Single Specific Model
author: Haijun (Navy) Su
layout: post
tags: [maven, mvn, java]
---

Maven options:

*-pl, --projects*: Build specified reactor project instead of all projects

*-am, --also-make*: If project list is specified, also build projects required by the list

Example (Build MyModule and the modules required by MyModule):

```

mvn install -pl MyModule -am
```

If you are referencing an `artifactId` which differs from the directory name, you need to use a colon


```

mvn install -pl :MyModule -am
```

TO skip test:

```

mvn -D skipTests install -pl :MyModume -am 
```

