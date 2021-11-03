---
title: Setting up locally Jekyll Serve (Ubuntu)
author: Haijun (Navy) Su
layout: post
---
* Requirements: 
~~~shell
sudo apt install ruby ruby2.3-dev zlib1g-dev build-essential
sudo gem install bundler
~~~

* Edit Gemfile
~~~
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
gem 'execjs'
gem 'therubyracer', :platforms => :ruby
~~~

* Installing
~~~shell
sudo bundle install
~~~

* Runing server (default host is 127.0.0.1)
~~~shell
bundle exec jekyll serve --host=0.0.0.0
~~~
