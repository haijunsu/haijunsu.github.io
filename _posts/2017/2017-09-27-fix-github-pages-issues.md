---
title: Fix Github pages issues
author: Haijun (Navy) Su
layout: post
tags: [github,pages,blog,jekyll]
---
* Error: GitHub Metadata: No GitHub API authentication could be found. Some fields may be missing or have incorrect data.
    1. Create personal access token on Github
    2. Add the following code in .bash_profile
    ~~~
    export JEKYLL_GITHUB_TOKEN=<your token here>
    ~~~
    3. Run following commond or Logout and logon again.
    ~~~
    . ~/.bash_profile
    ~~~

* Error: Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
    * Edit _config.yml file and change 'gems:' to 'plugins'
