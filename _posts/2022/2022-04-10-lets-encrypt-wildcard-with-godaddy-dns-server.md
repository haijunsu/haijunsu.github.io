---
title: Lets Encrypt Wildcard with Godaddy DNS Server
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, powershell, ssl, cert, lets encrypt]
---

First, it requires that a developer API key on godaddy at <https://developer.godaddy.com/keys>.

## Install powershell on Ubuntu20.04

```shell
# Update the list of packages
sudo apt-get update
# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https software-properties-common
# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb
# Update the list of packages after we added packages.microsoft.com
sudo apt-get update
# Install PowerShell
sudo apt-get install -y powershell
# Start PowerShell
sudo pwsh

```

## Install `Posh-ACME`

```bash
# if the scope is allusers, the pwsh need to be run with root
# PS> Install-Module -Name Posh-ACME -Scope AllUsers
PS> Install-Module -Name Posh-ACME
```

```
Untrusted repository
You are installing the modules from an untrusted repository. If you trust this repository, change its InstallationPolicy value by running the Set-PSRepository cmdlet. Are you
 sure you want to install the modules from 'PSGallery'?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): Y
```

## Enable `Posh-ACME`

```shell
PS> Import-Module Posh-ACME
PS>  Set-PAServer LE_PROD
```

```
Please review the Terms of Service here: https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf
```

## Use GoDaddy plugin

```shell
PS> Get-PAPlugin GoDaddy -Params
```

```
    Set Name: Secure (Default)


Parameter      Type            IsMandatory
---------      ----            -----------
GDKey          String          True
GDSecretSecure SecureString    True
GDUseOTE       SwitchParameter False

    Set Name: DeprecatedInsecure


Parameter Type            IsMandatory
--------- ----            -----------
GDKey     String          True
GDSecret  String          True
GDUseOTE  SwitchParameter False
```


```shell
# next will prompt a window to ask secret
PS> $pArgs = @{
    GDKey = 'xxxxxxxxxxxxxxxx'
    GDSecret = (Read-Host 'Please provide GoDaddy API Secret' -AsSecureString)
}

PS> New-PACertificate 'happynavy.tk','*.happynavy.tk','*.dev.happynavy.tk' -Plugin GoDaddy -PluginArgs $pArgs  -AcceptTOS -Contact 'web.info@happynavy.tk'
```

```
WARNING: Fewer Plugin values than names in the order. Using GoDaddy for the rest.

Subject      NotAfter            KeyLength Thumbprint                               AllSANs
-------      --------            --------- ----------                               -------
CN=happynavy.tk 7/6/2022 1:42:13 AM 2048      DFDCE9AEE9A162D1B5A7D23FB60FFFE68A8D95D1 {*.happynavy.tk, *.dev.happynavy.tk, happynavy.tk}


```

## View Certificate

```shell
PS> Get-PACertificate | Format-List
```

or

```shell
$ sudo pwsh Get-PACertificate | Format-List
```

```
Subject       : CN=happynavy.tk
NotBefore     : 4/7/2022 1:42:14 AM
NotAfter      : 7/6/2022 1:42:13 AM
KeyLength     : 2048
Thumbprint    : DFDCE9AEE9A162D1B5A7D23FB60FFFE68A8D95D1
AllSANs       : {*.happynavy.tk, *.dev.happynavy.tk, happynavy.tk}
CertFile      : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/cert.cer
KeyFile       : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/cert.key
ChainFile     : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/chain.cer
FullChainFile : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/fullchain.cer
PfxFile       : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/cert.pfx
PfxFullChain  : /root/.config/Posh-ACME/LE_PROD/486498330/happynavy.tk/fullchain.pfx
PfxPass       : System.Security.SecureString

```

## Renew Certificate

```shell
PS> Submit-Renewal -AllOrders
```

or

```shell
$ sudo pwsh Submit-Renewal -AllOrders
```


Reference:

<https://docs.microsoft.com/en-us/powershell/scripting/install/install-ubuntu?view=powershell-7.2>

<https://poshac.me/docs/v4/Tutorial/>

<https://letsencrypt.org/docs/challenge-types/>

<https://poshac.me/docs/v4/Plugins/GoDaddy/>


