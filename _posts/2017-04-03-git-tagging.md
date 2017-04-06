---
id: 466
title: Git tagging
date: 2017-04-03T14:41:18+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=466
permalink: /2017/04/03/git-tagging/
categories:
  - develop tools
  - git
tags:
  - git
  - tag
---
List available tags:

<pre class="prettyprint">$ git tag
$ git tag -l &lt;tag name&gt;</pre>

Creating tags:

<pre class="prettyprint">$ git tag -a &lt;tag name&gt; -m &lt;comment&gt;</pre>

Show tag data:

<pre class="prettyprint">$ git show &lt;tab name&gt;</pre>

Sharing Tags:
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ git push origin &lt;tag name&gt;
$ git push origin --tags  // share all tags</pre>

Checking out tags:

<pre class="prettyprint">$ git checkout -b &lt;branchname&gt; &lt;tag name&gt;</pre>