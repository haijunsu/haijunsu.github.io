---
title: Change Snaps Installation and Data Directories
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, snap, snaps]
---

The problem is snaps packages is using the folders `/var/lib/snapd` and `/var/snap` by default. It may eat root space if we install too many packages. We can use `mount --bind` to move them to a big disk or partition.
The original script is from <https://askubuntu.com/questions/1029562/move-snap-packages-to-another-location-directory>


```
##############################################################################
# Take Care this section may break the System !!!
##############################################################################
##Move snap folder to /big-disk/snap instead of root. It requires reboot machinei
# after done.
#Create the directory : you can change the location
sudo mkdir -p /big-disk/snap/snapd
sudo mkdir -p /big-disk/snap/data

#Copy the data
sudo rsync -avzP /var/lib/snapd/  /big-disk/snap/snapd/
sudo rsync -avzP /var/snap/  /big-disk/snap/data/

#Do backups
sudo mv /var/lib/snapd /var/lib/snapd.bak
sudo mv /var/snap /var/snap.bak
sudo cp /etc/fstab /etc/fstab.bak

#Change fstab (Change $USER with your name or change the path totally)
echo "/big-disk/snap/snapd /var/lib/snapd none bind 0 0" | sudo tee -a /etc/fstab
echo "/big-disk/snap/data /var/snap none bind 0 0" | sudo tee -a /etc/fstab

#remount fstab Or reboot.
sudo mkdir /var/lib/snapd
sudo mkdir /var/snap
sudo mount -a

if ls  /var/lib/snapd/ | grep snaps
then
    echo "Re-mounting snapd folder is done successfully. !!!!"
#    sudo rm -rf /var/lib/snapd.bak
#    sudo rm -rf /var/snap.bak
#    sudo rm -rf /etc/fstab.bak
else
    echo "WARNING : Re-mounting snapd folder failed, please revert !!!!! "
    echo "WARNING : Re-mounting snapd folder failed, please revert !!!!! "
    echo "WARNING : Re-mounting snapd folder failed, please revert !!!!! "
    echo "WARNING : Re-mounting snapd folder failed, please revert !!!!! "
    echo "WARNING : Re-mounting snapd folder failed, please revert !!!!! "

    # Trying to revert automatically
    sudo cp /etc/fstab.bak /etc/fstab

    sudo mount -a
    sudo umount /var/lib/snapd
    sudo umount /var/snap

    sudo mv /var/lib/snapd.bak /var/lib/snapd
    sudo mv /var/snap.bak /var/snap

    echo "Files located at ~/snap/snapd should be removed, but are kept for
    recovery until you, manually reboot the system and make sure the service
    is running correctly. Then you can manually remove the folder ~/snap/snapd
    !!!!!!!!!!!!!!, you should do that manually."

fi
##############################################################################
# Take care the previous section may break the System !!!
##############################################################################

```

