---
title: Attacks Threads and Vulnerabilities notes (3)
author: Haijun (Navy) Su
layout: post
tags: [security]
---

## Distinguishing Threat Actors, Vectors, and Intelligence Sources

* Actors and threats
    * Advanced persistent threat (APT)
    * Insider threats
    * State actors
    * Hacktivists
    * Script kiddies
    * Criminal syndicates
    * Hackers
        - White hat
        - Black hat
        - Gray hat
    * Shadow IT
    * Competitors
* Attributes of actors
    * Internal/external
    * Level of sophistication/capability
    * Resources/funding
    * Intent/motivation
* Vectors
    * Direct access
    * Wireless
    * Email
    * Supply chain
    * Social media
    * Cloud
* Threat intelligence sources
    * Open source intelligence (OSINT)
    * Closed/proprietary
    * Vulnerablility databases
    * Public/private information sharing centers
    * Dark web
    * Indicators of compromise
    * Automated indicator sharing (AIS)
    * Structured threat information exchange (STIX)/Trusted automated exchange of indicator information (TAXII)
    * Predictive analysis
    * Threat maps
    * File/Code repositories
* Research sources
    * Vendor websites
    * Vulnerability feeds
    * Conferences
    * Academic journals
    * Request for comments (RFC)
    * Local industry groups
    * Social media
    * Thread feeds
    * Adversary tactics, techniques, and procedures (TTP)

### Script Kiddies

* Hackers that are relatively new or unskilled
    - Typically looking to see what they can get into
    - The challenge is the attraction
    - Not typically associated with any organized hacking groups
    - Usually not well funded

### Hacktivists

* Hackers who are motivated by ideology or some social/political cause
    - Can be will funded and skilled
    - Usually deface websites
    - Steal information
        * Personal information and credentials
    - DDoS
    - Not particularly patient or stealthy

### Organized Crime

* Hackers who are motivated by financial gain
    - Deliberate with high technical capability
    - Well-funded
    - Patient and persistent
    - POS terminals, ATM machines, credit card numbers, etc
    - Steal personal information for sale on the dark web

### Nation States/APT

* Highly skilled hackers whose main goal is to penetrate government or commercial systems
    - Cyber espionage
    - Data/IP theft
    - Sabotage
    - Cyber warfare

Very stealthy and persistent, well funded and contected.

### Insiders

* Often motivated by financial gain
    - CERT advises that over 70% of IP theft cases involve insiders
    - Accidental exposure can occur from misuse or misconfigured systems
    - Data theft includes IP and company secrets

### Competitors

* Motivated by financial gain
    - Competitive advantage
    - Theft of IP or company secrets
    - Sabotage

Can be well funded and range from low to high skill.

### Threat Actor Attributes

| Actor Type | Internal / External | Level of Sophistication | Resources / Funding | Intent / Motivation |
|---|---|---|---|---|
| Script kiddies | External | Low | Low | Curiousity |
| Hacktivist | External | Medium to High | Medium to High | Ideological |
| Organized Crime | External | High | High | Financial Gain |
| Nation States / APT | External | High | High | Espionage |
| Insiders | Internal | Low to High | Low to High | Financial Gain |
| Competitors | External | Low to High | Low to High | Competitive Advantage, Financial Gain |


### Attack Vectors

* Direct Access
    - Physical Access
    - On-site
    - Theft / removal
    - Solutions
        - Physical security
        - User training & awareness

* Wireless
    - Captive portal
    - Evil twin
    - Network sniffing
    - Solutions
        - VPN / encryption
        - User training & awareness

* Email
    - Malware
    - Malicious links
    - Phishing / Whaling
    - Solutions
        - User training & awareness

* Supply Chain
    - Week link
    - Downstream attacks
    - Solutions
        - SLAs in place
        - Access links in the chain

* Social Media
    - Malicious links
    - Phishing
    - Social proof
    - Solutions
        - Group consensus
        - User training & awareness

* Removable Media
    - USB sticks
    - CF cards
    - CD/DVD
    - Malware/ransomware
    - Solutions
        - Group policy
        - Corporate policies
        - User training & awareness

* Cloud
    - Cloud provider vulnerabilities
    - DDoS
    - Multi-tenancy
    - Solutions
        - SLA in place
        - Access providers & 3rd party agreements


### User of Open Source Intelligence

There are *numerous* tools and websites available for *intelligence gathering* and *reconnaissance*. Open Source Intelligence (OSINT) tools exist as stand-alone applications, browser plugins and websites and can be *passive* or *active* in nature.

* Maltego
* Metagoofil
* Shodan
* Google Hacking Database (GHDB)
* FOCA
* EXIF Data Viewers
* BackTrack Linux
* Buscadr Linux
* Kali Linux
* Social Engineer Toolkit
* PeekYou
* Lullar
* Wayback Machine
* YouGetSignal
* Browser Plugins
* Metasploit
* Spokeo



