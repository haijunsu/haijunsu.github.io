---
id: 409
title: Correct way to move kvm vm
date: 2017-03-13T11:01:25+00:00
author: Navy Su
layout: post
---
I have a problem to do live migration between two host computers via virt manager. It is a permission issue but I don&#8217;t have time to fig it out. It is not a big deal. It is ok to move KVM vms offline.

  1. stop VM from gui or cli or guest console
  2. dump guest configuration as xml
    
```bash
virsh dumpxml VMNAME &gt; domxml.xml
```

  3. copy the guest images to another server with same path
  4. define a VM from the dump xml file
    
```bash
virsh define domxml.xml
```

  5. Check the configuration and start VM on new host. Usually need to check the network configuration, CPU, and memory.

source: <http://serverfault.com/questions/434064/correct-way-to-move-kvm-vm>