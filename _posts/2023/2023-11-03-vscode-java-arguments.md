---
title: Vscode Java / Springboot Arguments
author: Haijun (Navy) Su
layout: post
tags: [vscode, java, springboot]
---

Click the `Debug` icon on left (shortcut is `Ctrl+Shift+D`) and choose *create a launch.json file*. It only shows if the *launch.json* doesn't exist.

Example of `launch.json`.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Current File",
            "request": "launch",
            "mainClass": "${file}"
        },
        {
            "type": "java",
            "name": "PlaySpringbootApplication",
            "request": "launch",
            "mainClass": "com.navysu.playspringboot.PlaySpringbootApplication",
            "projectName": "play-springboot",
            "vmArgs": "-Dproperty1=overridden -Dspring.main.banner-mode=off",
            "args": "'test1' 'test2'"
        }
    ]
}
```

## Application arguments via `mvn` command for springboot.

```shell
mvn spring-boot:run -Dspring-boot.run.arguments="'sdf' 'ccd=dds'"  -Dspring-boot.run.jvmArguments="-Dproperty1=overridden"
```

