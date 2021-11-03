---
title: Python OS Functions
author: Haijun (Navy) Su
layout: post
tags: [python, os]
---
The OS module in Python provides functions to using operating system dependent functionality.
To use it, import the OS module "*import os*"

Function Name | Description
--- | ---
os.system()	 | Executing a shell command
os.stat()	 | Get the status of a file
os.environ()    | Get the users environment
os.chdir()   	 | Move focus to a different directory
os.getcwd()    	 | Returns the current working directory
os.getgid()    	 | Return the real group id of the current process
os.getuid()    	 | Return the current process’s user id
os.getpid()     | Returns the real process ID of the current process
os.getlogin()   | Return the name of the user logged
os.access()   	 | Check read permissions
os.chmod()    	 | Change the mode of path to the numeric mode
os.chown()   	 | Change the owner and group id
os.umask(mask)  | Set the current numeric umask
os.getsize()   	 | Get the size of a file
os.environ()    | Get the users environment
os.uname()   	 | Return information about the current operating system
os.chroot(path) | Change the root directory of the current process to path
os.listdir(path) | List of the entries in the directory given by path
os.getloadavg() | Show queue averaged over the last 1, 5, and 15 minutes
os.path.exists() | Check if a path exists
os.walk()   	 | Print out all directories, sub-directories and files
os.mkdir(path)	 | Create a directory named path with numeric mode mode
os.remove(path)	 | Remove (delete) the file path
os.rmdir(path)  | Remove (delete) the directory path
os.makedirs(path) | Recursive directory creation function
os.removedirs(path) | Remove directories recursively
os.rename(src, dst) | Rename the file or directory src to dst


Reference: <http://www.pythonforbeginners.com/os/python-system-administration>

