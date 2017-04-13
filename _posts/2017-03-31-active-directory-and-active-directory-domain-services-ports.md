---
id: 456
title: Active Directory and Active Directory Domain services ports
date: 2017-03-31T11:23:09+00:00
author: Navy Su
layout: post
---
&nbsp;

<table summary="table">
  <tr>
    <th scope="col">
      Protocol and Port
    </th>
    
    <th scope="col">
      AD and AD DS Usage
    </th>
    
    <th scope="col">
      Type of traffic
    </th>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP and UDP 389
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Directory, Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      LDAP
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 636
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Directory, Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      LDAP SSL
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 3268
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Directory, Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      LDAP GC
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 3269
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Directory, Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      LDAP GC SSL
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP and UDP 88
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      User and Computer Authentication, Forest Level Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      Kerberos
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP and UDP 53
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      User and Computer Authentication, Name Resolution, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      DNS
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP and UDP 445
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      SMB,CIFS,SMB2, DFSN, LSARPC, NbtSS, NetLogonR, SamR, SrvSvc
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 25
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Replication
    </td>
    
    <td data-th="
         Type of traffic
        ">
      SMTP
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 135
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Replication
    </td>
    
    <td data-th="
         Type of traffic
        ">
      RPC, EPM
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP Dynamic
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Replication, User and Computer Authentication, Group Policy, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      RPC, DCOM, EPM, DRSUAPI, NetLogonR, SamR, FRS
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 5722
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      File Replication
    </td>
    
    <td data-th="
         Type of traffic
        ">
      RPC, DFSR (SYSVOL)
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      UDP 123
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Windows Time, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      Windows Time
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP and UDP 464
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Replication, User and Computer Authentication, Trusts
    </td>
    
    <td data-th="
         Type of traffic
        ">
      Kerberos change/set password
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      UDP Dynamic
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      Group Policy
    </td>
    
    <td data-th="
         Type of traffic
        ">
      DCOM, RPC, EPM
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      UDP 138
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      DFS, Group Policy
    </td>
    
    <td data-th="
         Type of traffic
        ">
      DFSN, NetLogon, NetBIOS Datagram Service
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 9389
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      AD DS Web Services
    </td>
    
    <td data-th="
         Type of traffic
        ">
      SOAP
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      UDP 67 and UDP 2535
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      DHCP</p> 
      
      <div class="alert">
        <div class="contentTableWrapper">
          <table summary="table">
            <tr>
              <th scope="col" align="left">
                <img id="note" class="cl_IC101471" title="note" src="https://i2.wp.com/i-technet.sec.s-msft.com/areas/global/content/clear.gif?w=840&#038;ssl=1" alt="note" data-recalc-dims="1" />Note
              </th>
            </tr>
            
            <tr>
              <td>
                DHCP is not a core AD DS service but it is often present in many AD DS deployments.
              </td>
            </tr>
          </table>
        </div>
      </div>
    </td>
    
    <td data-th="
         Type of traffic
        ">
      DHCP, MADCAP
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      UDP 137
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      User and Computer Authentication,
    </td>
    
    <td data-th="
         Type of traffic
        ">
      NetLogon, NetBIOS Name Resolution
    </td>
  </tr>
  
  <tr>
    <td data-th="
         Protocol and Port
        ">
      TCP 139
    </td>
    
    <td data-th="
         AD and AD DS Usage
        ">
      User and Computer Authentication, Replication
    </td>
    
    <td data-th="
         Type of traffic
        ">
      DFSN, NetBIOS Session Service, NetLogon
    </td>
  </tr>
</table>

Source: https://technet.microsoft.com/en-us/library/dd772723(v=ws.10).aspx