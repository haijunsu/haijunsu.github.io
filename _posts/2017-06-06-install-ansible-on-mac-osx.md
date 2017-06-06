---
title: Install Ansible on Mac OSX
author: Haijun (Navy) Su
layout: post
---
## Brew Install
* Install Homebrew if there is no brew.
~~~
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
~~~
* Install Ansible
~~~
brew install ansible
~~~

## Native Python Install
* Install Xcode
Check if your already have the developer tools:
~~~
pkgutil --pkg-info=com.apple.pkg.CLTools_Executables
~~~
Before OSX mavericks, the package name was com.apple.pkg.DeveloperToolsCLI.
~~~
pkgutil --pkg-info=com.apple.pkg.DeveloperToolsCLI
~~~
If the tools are not installed, you will see this output:
~~~
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
~~~
In that case, download and install Xcode form [apple website](https://developer.apple.com/xcode/).
If the tools are installed, you should see output similar to this:
~~~
package-id: com.apple.pkg.CLTools_Executables
version: 5.1.0.0.1.1396320587
volume: /
location: /
install-time: 1397415256
groups: com.apple.FindSystemFiles.pkg-group com.apple.DevToolsBoth.pkg-group com.apple.DevToolsNonRelocatableShared.pkg-group
~~~
* Install pip
~~~
sudo easy_install pip
~~~
* Install Ansible
~~~
sudo pip install ansible
~~~
* Upgrade Ansible
~~~
sudo pip install ansible --upgrade
~~~

* Inventory hosts filename
The default inventory hosts file is */etc/ansible/hosts*. There are two ways to change the defualt file:
  * Set environment variable:
~~~
export ANSIBLE_HOSTS=/root/ansible_hosts
~~~
  * Specify the Ansible hosts location with the *--inventory-file=* (or *-i*) flag:
~~~
ansible all --inventory-file=/root/ansible_hosts -m ping
~~~


Source: <https://valdhaus.co/writings/ansible-mac-osx/>
<https://valdhaus.co/writings/ansible-post-install/>
