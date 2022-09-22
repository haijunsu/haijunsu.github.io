---
title: Attacks Threads and Vulnerabilities Notes
author: Haijun (Navy) Su
layout: post
tags: [security]
---
## Analyzing Malware and other attacks

### Indicators of Compromise (IOC)

* Unusual *outbound* network triffic
* *DNS* request anomalies
* Mismatch *port-application* traffic
* Anomalies in *privileged user account* activity

### Virus

Malicious code that *requires user interaction* to install and replicate.

### Crypto-malware / Ransomware

Malicious applications that *scare* or *scam* users into taking some type of *action*.

* WannaCry Attack (Wcrypt)

### Trojan

Seemingly friendly software that contains *hidden* malicious software

Common Remote Access Tools (RAT)
  - Project BioNET
  - NetBUS
  - Sub7
  - Back Orifice
  - BO2k (Back Orifice 2k)
  - Beast
  - Lost Door

### Worms

  - Self-replicating program that is usually self-contained and can execute and spread *without user interaction*

Tow main type of worms
  - Network Service Worms
    - Exploits network vulnerability to propagate and infect others
  - Mass Mailing Worms
    - Exploits email systems to spread and infect others

### Potentially Unwanted Program (PUP)

Applications that are typically downloaded as part of another program (adware, spyware, etc...)

- Malwarebytes premium


### Fileless Virus

Malware that operate in memory

- Not stored in a file nor installed on a victim's machine
- Typically hooks into a Windows PC via PowerShell or WMI
- 2017 Ponemon Institute study estimates that 77 percent of detected attacks were fileless

Common Fileless Virus/Malware Tools

 - Empire
 - PowerSploit
 - MetaSploit
 - CobaltStrike

 
### Botnets

Malicious code that infects *large numbers* of hosts for the purpose of launching *large scale attacks* on *specific targets*

- Attacker can be located *anywhere* in the world
- Control one or more Command and Control (C&C) Servers
- C&C servers can control *thousands* of bots (zombies) for massive DDoS attacks

### Logic Bomb

Malicious code that *triggers* after a period of time based on some *date* or *specific activity*

### Spyware

Malicious software that captures *user activity* and reports back (keystrokes, web browsing activity, etc)


### Keylogger

Malicious application that once installed on a host can capture all keystrokes

- Usernames/Passwords
- Sensitive information
- Emails / chats / instant messages

Captured files can be uploaded to a remote location, emailed, or store locally for later retrieval

### Rootkits

Malicious code that installs itself at the *OS* or *Kernel* level to avoid detection

Rootkits are very diffcult to get ride of

- Load before the OS loads
- Can disable anti-virus and anti-malware

### Backdoors

Software that installs for the purpose of opening ports and installing *additional software*

- Backdoor can phone home, steal credentials, keylogger, etc
- Applications, executables, even images
- Download additional software or allow remote access

### Spraying

- Feed a large number of usernames into program that loops through passwords
- Brute force type of attack that can be used with dictionary attacks or a database of compromised passwords

Can be mitigated by using two-factor authentication (2FA)

### Brute Force Attack

  - Systematic approach trying every possible combination of passwords or passphrases
    - Time consuming
    - Resource intensive

  - Mitigations
    - Most accounts will lock out after "x" number of attempts
    - Length of password increases time to crack

### Dictionary

Using known words to try and defeat a cipher

- Using words in a dictionary or a pre-defined set of possible words
- Faster than brute force in that only words that are likely to succeed are used

Common Tools

- Brutus
- Cain and Abel
- Aircrack-ng
- John the Ripper
- Airodump-ng
- LOphtCrack
- Metasploit Project
- Ophcrack

Hybrid Attack combines dictionary attack along with word variations

- Used prior to restorting to plain brute-force attack

### Rainbow Tables

Precomputed table to *reversing* cryptographic hashes
  - Reduces time to brute-force a password
  - Increase amount of storage necessary to storage rainbow tables
  - Rainbow table needed for each has type (MD5, SHA1, etc)

Can be mitigated using "Password Salting"

  - Adding random data to the hashing algorithm so that each users hash is *unique* even if both have the same password
    - Larger salts increase security

### Know Plain Text / CipherText

Access to both the plaintext and the encrypted output (ciphertext)
  - The attack can be used to reveal further information such as secret keys or code books used to encrypt subsequent messages

Advanced Encryption Standard (AES) cipher is not vulnerable to this type of attack

### Birthday Attack

Brute-force attack that works on the cryptographic phenomenon of hash collisions

- Give enough time, two independent sources could yield the same hash
  - Rate of occurence varies depending on hash algorithm

### Downgrade Attack

Attack that forces a system to negotiate down to a lower-quality method of communication

  - Allows an attacker to force a lower-grade, less secure method of communication
  - Typically allowed to enable communication with legacy systems
  - Often used with MiTM attacks

### Physical Attacks, Malicious USB/Flash Drive, and Skimming

Skimming techniques

- Card reader used at checkout counter that scans magnetic strip
- Duplicate card reader that slips over ATM card reader and downloads magnetic strip info

### Adversarial Artificial Intelligence (AI)

Tainted training data for ML

- Technique to fool models by supplying deceptive (tainted) input

Security of ML algorithms

- Threat modeling
- Attack simulations
- Countermeasure simulations
- Secure learning algorithms

### Supply Chain Attacks

Attack on an organization by targeting less-secure elements in a supply network

- Advanced Persistent Threats (typically)
- Targets victims further down the supply chain network

Examples:
- POS malware / Infected USB sticks
- Malware (or hardware) installed on computer equipment or network gear before it reaches target company

### Cloud-Based vs. On-Premises Attacks

- Effectiveness of security depends on many factors

  - Type of company / datacenter(s)
  - Industry (regulations, compliance)

- Costs, expertise, data-mobility
- Infrastructure refreshes
- Frequency of data access

- Cloud Provider Security
  - Large security staff
  - Deep expertise across a wide range of industries
  - 24 x 7 monitoring
  - Compliance and regulatory expertise



## Recognizing Application Attacks

### Privilege Escalation

- Obtaining elevated priviledges (i.e. Administrator or Root) on the target
  - Dump the SAM (local accounts file)
  - Rerieve /etc/passwd file
  - Look for insecure file shares
  - DLL pre-loading
  - Insecure or weak security on processes

- Many vulnerabilities enable an attacker to gain system-level permission

### Cross Site Scripting (XSS)

- Techniques used to hijack sssions
  - Can be non-persistent (email, blog posts, etc)
  - Persistent (server based) where an attacker doesn't need to actively target a user
    - Non-Persistent: Specially crafted URLs sent in an email, instant message, blog posts, etc
    - DOM based: Can be non-persistent and be used to hijack sessions, etc
    - Persistent: Server based and can execute on a victim's PC by visiting an infected site

Coress-Site Scripting via Email
  
  - User is sent an *email* containing a *malicious link* and is convinced to click on the link
  - The URL is sent to the *legitimate site*, along with the malicious code which then executes in the *victim's web browser*
  - The attacker could then issue *additional requests* to the legitimate server, post data to ohter parts of the site, etc

### SQL Injection

SQL (Structured Query Language)
  - Modifying the SQL query that's *passed to web application*, SQL server, etc
  
Adding *code* into a *data stream*
  - Bypass login screens
  - Vulnerable websites return usernames, passwords, etc., with the right SQL injection
  - Cause the application to "throw" an error and crash (allowing an attacker remote access)

### DLL Injection

DLL Injection is a process of inserting code into a running process

Four basic steps:
  - Attach to the process
  - Allocate Memory within the process
  - Copy the DLL or the DLL Path into the processes memory and determine appropriate memory addresses
  - Instruct the process to Execute your DLL

DLL injection attacks can be created manually or pen testing tools like *Metasploit* can automate the process

### LDAP Injection

LDAP = Lightweight Directory Access Protocol

  - "Address Book" of user accounts used to authenticate users
  - Identifies level of access, group memberships, etc

*Similar to SQL injection attacks in that the query that is passed to the web server is modified to include malicious query statements or codes*


### XML Injection

Attack technique that *manipulates the logic* of an XML application or service
  - Could be used to inject XML into a statement that alters a path to a file to disclose sensitive information

### Pointer Dereference

Vulnerability that can cause an application to throw an exception error, which typically results in the application crashing
  - Can be leveraged for a DoS attack against the entire system
  - Remote code execution

*C/C++, Assembly or any other language that uses pointers is potentially vulneralbe to this type of attack*

### Directory Traversal/Command Injection

- Attack that *maniplates user input* to cause the application to traverse a directory structure and *access files* not intended to be visible.
  - Known as the ../ or "dot slash" attack
  - DIrectory climbing
  - Backtracking

### Buffer Overflow

Attack that causes a system or app to crash or behave unexpectedly
  - Writing *more data* than the *buffer can handle*
  - Data is written to adjacent memory

Calls or pointers to jump to a *different address* that what was intended
  - Can contain user executable code which could allow *remote code execution*

### Race Conditions

A race condition occurs when a pair of *routine programming calls* in an application do not perform in the *sequential manner* that was intended
  - Potential security vulnerability if the calls are not performed in the correct order

Potential Vulnerabilities
  - *Authentication*: Trust may be assigned to an entity who is not who it claims to be
  - *Integrity*: Data from an untrusted (and possibly malicious) source may be integrated
  - *Confidentiality*: Data may be disclosed to an entity impersonating a trusted entity, resulting in information disclosure

### Time of Check

Type of race condition

  - Attacker is able to gain access *prior* to an authentication check
  - Insert code or alters authentication to disrupt normal authentication processes
  - Administrator see the intrusion, reset passwords, etc., but the attacker may *still* have access
    - Attacker could *remain logged in* with old credentials
    - Also referred to as *Time of Check to Time of Use (TOCTTOU)

### Secure Coding Concepts

Application development is often a *balancing act* between time to market and security
  - Building for security *adds* to development time
    - Critical - If *you don't have time* to find the vnlnerabilities, the *bad guys will*
    - Error and exception handling
      - What does the application do when it encounters an error?
        - Does it continue running, restart a process or module, or completely crash?
      - If it crashes, does it give an attacker elevated privileges?
        - Keys to the castle?
    - Input Validation
      - Validate/sanitize what is entered at the client side and/or server side before it's processed
      - Mitigate attacks such as Cross Site Scripting (XSS)
      - SQL Injection attacks
    - OWASP(Open Web Application Security Project)
    - CERT ([www.cert.org/secure-coding](www.cert.org/secure-coding))

### Replay Attacks

Sniffing the wired or wireless network, a replay attack *captures packets* and puts them back on the wire
  -Packets can potentially be modified and *retransmitted* to look like legitimate packets
*Sequencing* helps mitigate the effectiveness of this type of attack

### Integer Overflow

Integer overflow condition occurs when the result of an arithmetic operation exceeds the maximum size of integer type used to store it.

*When the overflow occurs, the interpreted value appears to "wrap around" the max value and start at the min value*
  - Could allow transactions to be reversed (i.e. money sent instead of received)

### Cross Site Request Forgery (XSRF)

Exploiting a website's trust in a user (application, IP address, etc)

Often referred to as one-click attack or session riding

  - CSRF or "See-Surf"

Requires victim to have recently visited the target website and have a valid cookie (not expired)

**XSS and XSRF Distinction**
  - In an XSS attack, the **browser** runs *malicious code* because it was served from a *site it trusts*
  - In an XSRF attack, the **server** *performs an action* because it was sent a request from a *client it trusts*

### Application Programming Interface (API) Attacks

Gartner states that By 2022, API abuses will move from an *infrequent* to the *most-frequent attack vector*, resulting in data breaches for enterprise web applications.

  - Hostile usage of an API
    - Injection attacks
    - DoS/DDoS Attacks
    - Authentication hijacking
    - Data exposure
    - MitM attacks

  - Traditional methods of protection don't work
    - WAF and simple port blocking
    - Continuously evolving APIs

### Resource Exhaustion

Attack whereby a malicious user *executes code or processes* on a machine over and over until all resources are exhausted.

Denial of Service (DoS) or Distributed Denial of Service (DDoS) are examples of this type of attack.

### Memory Leak

A memeory leak is typically an *unintentional* consumption of memory. THe application *fails to release* the memory once it's no longer needed

This consumption of resources can over time lead to a variety of issues:
  - Degraded system performance
  - Abnormal system behavior
  - System crashes
  - Denial of Service (DoS)

Threat actors can use those vulnerability to try and crash a system to gain elevated privileges or take a system offline via a Denial of Service (DoS) attack.

### SSL Stripping

MitM type of attack that strips away SSL encryption

  - Enables an attacker to intercept traffic between victim and target
  - ENterprise users, wired or Wi-Fi hotspots, etc.

Victim -- (HTTP) --> Man in the middle (attacker) -- (HTTPS) --> SSL Encrypted Website

**SSL Stripping Mitigations**

  - Use SSL everywhere
    - Not just on pages that contain sensitive data
  - Use HSTS
    - HTTP Strict Transport Security
    - Forces clients/browsers to connect over HTTPS

### Shimming

Shim databases are part of Microsoft Window's Application Compatibility Infrastructure

  - Used to maintain compatibility with legacy applications.
  - Can be used for malicious purposes by custom shim databases to install code, patches, etc.

### Refactoring

Modifying an application's source code without changing the underlying functionality.

Purpose is to fix bugs, patch code and tighten up security without changing or adversely affecting the underlying functionality.

### Path the Hash

Harvesting a user's password hash to authenticate to a remote server of service

Example (Normal process):
  - User wants to access remote resource
  - Server sends authentication challenge
  - User enters their credentials (username/password)
  - Password in converted to a hash value
  - Hash value is sent to the server
  - Server checks the has value against the expected value
  - Access is granted to resource (assuming hash values match)

Example (Attacker process):
  - Attacker wants to access remote resource
  - Server sends authentication challenge
  - Attacker enters username and *stolen hash value*
  - Hash value is sent to the server
  - Server checks the has value against the expected value
  - Access is granted to resource (assuming hash values match)
  




