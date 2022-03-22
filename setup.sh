#!/usr/bin/env bash

sudo apt install -y build-essential ruby-full ruby-bundler
if [ ! -f "Gemfile" ]; then
  ln -s Gemfile.linux Gemfile
fi
sudo bundle install
