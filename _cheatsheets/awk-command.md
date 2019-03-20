---
title: Awk Command
author: Haijun (Navy) Su
layout: page
tags: [awk, Linux]
---
Source: <https://likegeeks.com/awk-command/>

[Gawk User Manual](https://www.gnu.org/software/gawk/manual/html_node/index.html)

### Awk Options
Awk can take the following options:
**-F fs** To specify a file separator
**-f file** To specify a file that contains awk script
**-v var=value** To declare a variable

### Read AWK Scripts
To define an awk script, use braces surrounded by single quotation marks like this:
```shell
$ awk '{print "Welcome to awk command tutorial "}'
```
If you type anything, it returns the same welcome string we provide.
To terminate the program, press the CTRL+D.

### Using variables
With awk, you can process text files. Awk assigns some variables for each data field found:
* $0 - for the whole line.
* $1 - for the first field.
* $2 - for the second field.
* $n - for the nth field.

The whitespace character like space or tab is the default separator between fields in awk.

Example file we are using in this article.
File name: myfile
Content:
```
This is a test
This is the second test
This is the third test
This is the fourth test
```

```shell
$ awk '{print $1}' myfile
This
This
This
This
```
The above example prints the first word of each line.

Some times the separator in some files is not space nor tab but somethin else. You can specify it using -F option:
```shell
$ awk -F: '{print $1}' /etc/passwd
root
daemon
bin
sys
...
```
This command prints the first field in the passwd file. We use the colon as a separator because the passwd file uses it.

### Using Multiple Commands
To run multiple commands, separate them with a semicolon like this:
```shell
$ echo "Hello Tom" | awk '{$2="Adam"; print $0}'
Hello Adam
```
The first command makes the $2 field equals Adam. The second command prints the entire line.

### Reading The Script From a File
You can type your awk script in a file and specify that file using the -f option
Our file contains this script:
```
{print $1 " home at " $6}
```
```shell
$ awk -F: -f testfile /etc/passwd
root home at /root
daemon home at /usr/sbin
bin home at /bin
sys home at /dev
sync home at /bin
...
```
Here we print the username and his home path from /etc/passwd, and surely the separator is specified with capital -F which is the colon.
You also can edit your awk script file like this and get same output:
```
{
    text = " home at "
    print $1 text $6
}
```

### Awk Preprocessing
If you need to create a title or a header for your result or so. You can use the *BEGIN* keyword to achieve this.
It runs before processing the data:
```shell
$ awk 'BEGIN {print "The File Contents:"} {print $0}' myfile
The File Contents:
This is a test
This is the second test
This is the third test
This is the fourth test
```

### Awk Postprocessing
To run a script after processing the data, use the *END* keyword:
```shell
$ awk 'BEGIN {print "The file Contents:"}
{print $0}
END {print "File footer"}' myfile
```
Output:
```
The File Contents:
This is a test
This is the second test
This is the third test
This is the fourth test
File footer
```
This is useful, you can use it to add a footer for example.
Let's combine them together in a script file:
```
BEGIN {
    print "Users and thier corresponding home"
    print " UserName \t HomePath"
    print "___________ \t __________"
    FS=":"
}
{
    print $1 "  \t  " $6
}
END {
    print "The end"
}
```
First, the top section is created using *BEGIN* keyword. The we define the *FS* and print the footer at the end.
```shell
$ awk -f myscript /etc/passwd
Users and thier corresponding home
 UserName        HomePath
___________      __________
root      /root
daemon            /usr/sbin
bin       /bin
sys       /dev
sync      /bin<Paste>
...
sshd      /var/run/sshd
The end
```

### Built-in Variables
We saw the data field variables $1, $2, $3, etc are used to extract data fields, we also deal with the field separator FS.
But these are not the only variables, there are more built-in variables.
The following list shows some of the built-in variables:

Option | Description
--- | ---
FIELDWIDTHS | Specifies the field width
RS | Specifies the record separator
FS | Specifies the field separator
OFS | Specifies the Output separator
ORS | Specifies the Output separator

By default, the *OFS* variable is the space, you can set the *OFS* variable to specify the separator you need:
```shell
$ awk 'BEGIN {FS=":"; OFS="-"} {print $1, $6, $7}' /etc/passwd
root-/root-/bin/bash
daemon-/usr/sbin-/usr/sbin/nologin
bin-/bin-/usr/sbin/nologin
sys-/dev-/usr/sbin/nologin
sync-/bin-/bin/sync
...
```

Sometimes, the fields are distributed without a fixed separator. In these cases, *FIELDWIDTHS* variable solves the problem.
Suppose we have this content in testfile:
```
1235.96521
927-8.3652
36257.8157
```
```
$ awk 'BEGIN {FIELDWIDTHS="3 4 3"} {print $1,$2,$3}' testfile
123 5.96 521
927 -8.3 652
362 57.8 157
```
Look at the output. The output fields are 3 pre line and each field length is based on what we asssigned by *FIELDWIDTHS* exactly.

Suppose that your data distributed on different lines like the following:
```
Person Name
123 High Street
(222) 466-1234

Another person
487 High Street
(523) 643-8754
```
In the above example, awk fails to process fields properly because the fields are separated by new lines and not spaces.
You need to set the FS to the newline(\n) and the RS to a blank text, so empty lines will be considered separators.
```shell
$ awk 'BEGIN {FS="\n"; RS=""} {print $1, $2, $3}' addresses
Person Name 123 High Street (222) 466-1234
Another person 487 High Street (523) 643-8754
```
Awesome! we can read the records and fields properly.

### More Variables
There are some other variables that help you to get more information:

Option | Description
--- | ---
ARGC | Retrieves the number of passed parameters
ARGV | Retrieves the command line parameters
ENVIRON | Array of the shell environment variables and corresponding values
FILENAME | The file name that is processed by awk
NF | Field count of the line being processed
NR | Retrieves total count of processed records
FNR | The record which is processed
IGNORECASE | To ignore the character case

Let's test them.
```shell
$ awk 'BEGIN {print ARGC, ARGV[1]}' myfile
2 myfile
```

The *ENVIRON* variable retreves the shell environment variables like this:
```shell
$ awk 'BEGIN {print ENVIRON["PATH"]}'
/home/testuser/bin:/home/testuser/.local/bin:/home/testuser/bin:/home/testuser/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

### Remove duplicate lines

```shell
awk '!NF || !seen[$0]++'
```



