---
title: Set-Up-Multiple-Github-accounts
author: Haijun (Navy) Su
layout: post
tags: [git, key]
---

## Easy way

Checkout the repository and alias `ssh` command in `.git/config` file. Example:

```
# ~/git repository folder/.git/config

...

[core]
  ...
  sshCommand = ssh -o IdentitiesOnly=yes -i ~/.ssh/<my-repo-key>

...
```


## By workspace structure

### Customize workspace structure as below

```
~/projects/
  |__ my/
    |__ .gitconfig.my
    |__ my project1/
    |__ my project2/
    |__ ...
  |__ work/
    |__ .gitconfig.work
    |__ work project1/
    |__ work project2/
    |__ ...
  
```

### Tell Git with key to use with the SSH command

```
# ~/projects/my/.gitconfig.my
  email = my_personal_email@example.com
  name = My Name

[github]
  user = "mynickname"

[core]
  sshCommand = ssh -o IdentitiesOnly=yes -i ~/.ssh/my-personal-key

```


```
# ~/projects/work/.gitconfig.work
  email = my_work_email@example.com
  name = My Name

[github]
  user = "work_name"

[core]
  sshCommand = ssh -o IdentitiesOnly=yes -i ~/.ssh/my-work-key

```

### Update git config file to match key by workspace structure

```
# ~/.gitconfig
 
[includeIf "gitdir:~/my/"] # include for all .git projects under personnal/ 
path = ~/my/.gitconfig.my
 
[includeIf "gitdir:~/work/"]
path = ~/work/.gitconfig.work
 
[core]
excludesfile = ~/.gitignore      # valid everywhere

```

Reference:

<https://blog.gitguardian.com/8-easy-steps-to-set-up-multiple-git-accounts/>
