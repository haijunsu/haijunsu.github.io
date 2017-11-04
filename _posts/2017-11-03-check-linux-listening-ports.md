---
title: Check Linux Listening Ports
author: Haijun (Navy) Su
layout: post
tags: [linux, port, security, network]
---
### ss comand
```bash
sudo ss -ltu
sudo ss -ltup  #show process
```

### netstat command
```bash
sudo netstat -l
sudo netstat -tulpn | grep LISTEN
```
Check active connections (-t TCP, -u UDP, -n Show IP)
```bash
sudo netstat -vantu  # show ip
sudo netstat -vant   # show FQDN
sudo netstat -vant   # TCP only
```

### lsof command
```bash
sudo lsof -i
sudo lsof -i -P -n | grep LISTEN
sudo lsof -i 4 -a
```

### nmap command
```bash
sudo nmap -sT -O localhost
sudo nmap -sU -O 192.168.1.20 ## list open UDP ports
sudo nmap -sT -O 192.168.1.20 ## list open TCP ports
```
