---
title: Bash
author: Haijun (Navy) Su
layout: page
---

### IF/ELIF/ELSE/FI
~~~ bash
if [ "$animal" == "penguin" ]; then
  echo "Hmmmmmm fish... Tux happy!"
elif [ "$animal" == "dolphin" ]; then
  echo "Pweetpeettreetppeterdepweet!"
else
  echo "*prrrrrrrt*"
fi
~~~

### Check comand return value
~~~ bash
/pagh/script.sh
case $? in
  1)
    echo "return 1"
    ;;
  2)
    echo "return 2"
    ;;
  *)
    echo "return $?"
    ;;
esac
~~~
