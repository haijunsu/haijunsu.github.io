---
title: SSH Certificate Authentication
author: Haijun (Navy) Su
layout: post
tags: [ssh, certificate]
---
* Generate ssh certificate
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

* Install ssh-ident
```shell
mkdir -p ~/bin; wget -O ~/bin/ssh goo.gl/MoJuKB; chmod 0755 ~/bin/ssh
ln -s ~/bin/ssh ~/bin/scp
ln -s ~/bin/ssh ~/bin/sftp
echo 'export PATH=~/bin:$PATH' >> ~/.bashrc
```

* Enable ssh forwarding
```shell
alias ssh=~/bin/ssh -A
```

* Config file with multiple identities
1. Move you keyfile to ~/.ssh/identities/<profile>/
2. Create a ~/.ssh-ident file. **DONOT** add -A option for ssh because scp and sftp don't support it.
```
      # Specifies which identity to use depending on the path I'm running ssh
      # from.
      # For example: ("mod-xslt", "personal") means that for any path that
      # contains the word "mod-xslt", the "personal" identity should be used.
      # This is optional - don't include any MATCH_PATH if you don't need it.
      MATCH_PATH = [
        # (directory pattern, identity)
        (r"mod-xslt", "personal"),
        (r"ssh-ident", "personal"),
        (r"opt/work", "work"),
        (r"opt/private", "secret"),
      ]
    
      # If any of the ssh arguments have 'cweb' in it, the 'personal' identity
      # has to be used. For example: "ssh myhost.cweb.com" will have cweb in
      # argv, and the "personal" identity will be used.
      # This is optional - don't include any MATCH_ARGV if you don't
      # need it.
      MATCH_ARGV = [
        (r"cweb", "personal"),
        (r"corp", "work"),
      ]
    
      # Note that if no match is found, the DEFAULT_IDENTITY is used. This is
      # generally your loginname, no need to change it.
      # This is optional - don't include any DEFAULT_IDENTITY if you don't
      # need it.
      # DEFAULT_IDENTITY = "foo"
    
      # This is optional - don't include any SSH_ADD_OPTIONS if you don't
      # need it.
      SSH_ADD_OPTIONS = {
        # Regardless, ask for confirmation before using any of the
        # work keys.
        "work": "-c",
        # Forget about secret keys after ten minutes. ssh-ident will
        # automatically ask you your passphrase again if they are needed.
        "secret": "-t 600",
      }
    
      # This is optional - dont' include any SSH_OPTIONS if you don't
      # need it.
      # Otherwise, provides options to be passed to 'ssh' for specific
      # identities.
      SSH_OPTIONS = {
        # Disable forwarding of the agent, but enable X forwarding,
        # when using the work profile.
        "work": "-Xa",
    
        # Always forward the agent when using the secret identity.
        "secret": "-A",
      }
    
      # Options to pass to ssh by default.
      # If you don't specify anything, UserRoaming=no is passed, due
      # to CVE-2016-0777. Leave it empty to disable this.
      SSH_DEFAULT_OPTIONS = "-oUseRoaming=no"
    
      # Which options to use by default if no match with SSH_ADD_OPTIONS
      # was found. Note that ssh-ident hard codes -t 7200 to prevent your
      # keys from remaining in memory for too long.
      SSH_ADD_DEFAULT_OPTIONS = "-t 7200"
    
      # Output verbosity
      # valid values are: LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
      VERBOSITY = LOG_INFO
```

Reference:
<https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/>
<http://rabexc.org/posts/using-ssh-agent>
<https://github.com/ccontavalli/ssh-ident>

