---
title: Bash
author: Haijun (Navy) Su
layout: page
---
### Some useful terminal commands

| Command/Key | Description |
| --- | --- |
| grep -i | Case insensitive search |
| grep -r | Recursive search |
| grep -v | Inverted search |
| grep -C &lt;num&gt; | print &lt;num&gt; lines before and after the match line |
| cmd 1>&2 | stdout to same place as stderr |
| cmd 2>&1 | stderr to same place as stdout |
| !! | Repeat last command |
| !abc | Run last command starting with *abc* |
| head -n1 /etc/issue | Show distribution |
| CTRL-a | Go to the start of line |
| CTRL-e | Go the the end of line |
| CTRL-u | Cut from start of line |
| CTRL-k | Cut to end of line |
| Ctrl + w | delete from cursor to start of word (i.e. delete backwards one word)|
| Ctrl + y | paste word or text that was cut using one of the deletion shortcuts (such as the one above) after the cursor|
| Ctrl + xx | move between start of command line and current cursor position (and back again)|
| Ctrl + r | search the history backwards|
| Ctrl + g | escape from history searching mode|
| Ctrl + p | previous command in history (i.e. walk back through the command history)|
| Ctrl + n | next command in history (i.e. walk forward through the command history)|
| CTRL-d | Log out from a shell (similar to **exit**). **EOF** (end-of-file). This also terminates input form **stdin**.|
| CTRL-l | clear the terminal screen |
| CTRL-z | Sleep program |
| bg | Run the sleep program at background |
| fg | Bring the program from background to foreground |
! ! | run last command|
| !blah | run the most recent command that starts with ‘blah’ (e.g. !ls)|
| !blah:p | print out the command that !blah would run (also adds it as the latest command in the command history)|
| !$ | the last word of the previous command (same as Alt + .)|
| !$:p | print out the word that !$ would substitute|
| !* | the previous command except for the last word (e.g. if you type ‘find some_file.txt /‘, then !* would give you ‘find some_file.txt‘)|
| !*:p | print out what !* would substitute|

Remove bed file name: *rm -- -badfilename*

[Reference Cards](http://tldp.org/LDP/abs/html/refcards.html)

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

### Integer comparison

Operator | Description | Example & comments
--- | --- | ---
-eq | is equal to | *if [ "$a" -eq "$b" ]*
-ne | is not equal to | *if [ "$a" -ne "$b" ]*
-gt | is greater than | *if [ "$a" -gt "$b" ]*
-ge | is greater than or equal to | *if [ "$a" -ge "$b" ]*
-lt | is less than | *if [ "$a" -lt "$b" ]*
-le | is less than or equal to | *if [ "$a" -le "$b" ]*
< | is less than (within double parentheses) | *(("$a" < "$b"))*
<= | is less than or equal to (within double parentheses) | *(("$a" <= "$b"))*
> |is greater than (within double parentheses| *(("$a" > "$b"))*
>= | is greater than or equal to (within double parentheses) | *(("$a" >= "$b"))*

### String comparison

Operator | Description | Example & comments
---| --- | ---
= | is equal to | *if [ "$a" = "$b" ]*<br /><i class="fa fa-info-circle" aria-hidden="true"></i> Note the **whitespace** framing the **=**.<br/> **if [ "$a"="$b" ]** is **NOT** equivalent to the above.
== | is equal to | *if [ "$a" == "$b" ]* <br />There is a synonym for **=**. <br /><i class="fa fa-info-circle" aria-hidden="true"></i> The **==** comparison operator behaves differently within a **double-brackets** test than with in single brackets. <br/>[[ $a == z* ]]    # True if $a starts with an "z" (pattern matching) <br />[[ $a == "z\*" ]]    # True if $a is equal to z\* (literal matching) <br />[ $a == z* ]    # File globbing and word splitting take place. <br />[ "$a" == "$z" ]  # True if $a is equal to z* (literal matching)
!= | is not equal to | *if[ "$a" != "$b" ]* <br/> This operator uses pattern matching with in a [[ ... ]] construct.
< | is less than, in ASCII alphabetical order | *if [[ "$a" < "$b" ]]* <br/>*if [ "$a" \< "$b" ]* <br/><i class="fa fa-info-circle" aria-hidden="true"></i> Note that the "<" needs to be **escaped** within a [ ... ] construct.
> | is great than, in ASCII alphabetical order | *if [[ "$a" > "$b" ]]* <br/>*if [ "$a" \> "$b" ]* <br/><i class="fa fa-info-circle" aria-hidden="true"></i> Note that the ">" needs to be **escaped** within a [ ... ] construct.
-z | string is **null**, that is, has zero length | *String=''*   # Zero-length ("null") string variable. <br/>*if [ -z "$String" ]*
-n | strint is not null |

### Special Shell Variable

Variable |	Meaning
--- | ---
$0 |	Filename of script
$1 |	Positional parameter #1
$2 - $9	| Positional parameters #2 - #9
${10} |	Positional parameter #10
$# |	Number of positional parameters
"$\*" |	All the positional parameters (as a single word) \*
"$@" |	All the positional parameters (as separate strings)
${#\*} |	Number of positional parameters
${#@} |	Number of positional parameters
$? |	Return value
$$ |	Process ID (PID) of script
$- |	Flags passed to script (using set)
$_ |	Last argument of previous command
$! |	Process ID (PID) of last job run in background

### Files test operators

Operator |	Tests Whether |	----- |	Operator |	Tests Whether
--- | --- | --- | --- | ---
-e |	File exists	| |	-s |	File is not zero size
-f |	File is a regular file	| | |
-d |	File is a directory	 | |	-r |	File has read permission
-h |	File is a symbolic link	| |	-w |	File has write permission
-L |	File is a symbolic link	| |	-x |	File has execute permission
-b |	File is a block device	| | |
-c |	File is a character device	| | 	-g |	sgid flag set
-p |	File is a pipe	| |	-u |	suid flag set
-S |	File is a socket |	| 	-k |	"sticky bit" set
-t |	File is associated with a terminal	| | |
 	| | | |
-N |	File modified since it was last read |	| 	F1 -nt F2 |	File F1 is newer than F2
-O |	You own the file |	| 	F1 -ot F2 |	File F1 is older than F2
-G |	Group id of file same as yours	| |	F1 -ef F2 |	Files F1 and F2 are hard links to the same file
 	| | | |
! |	NOT (inverts sense of above tests) | | |

Reference: <http://tldp.org/LDP/abs/html/>
