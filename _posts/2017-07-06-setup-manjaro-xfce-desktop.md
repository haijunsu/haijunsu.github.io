---
title: Setup Manjaro Xfce Desktop
author: Haijun (Navy) Su
layout: post
tags: [linux,manjaro]
---
### Enable touchpad tap to click
1. Install *xorg-xinput* via Package Manager
2. Query touchpad device id
~~~
xinput list
~~~
Output example:
~~~
⎡ Virtual core pointer                    	id=2	[master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer              	id=4	[slave  pointer  (2)]
⎜   ↳ Sony Vaio Jogdial                       	id=7	[slave  pointer  (2)]
⎜   ↳ SynPS/2 Synaptics TouchPad              	id=14	[slave  pointer  (2)]
⎜   ↳ Logitech USB Receiver                   	id=12	[slave  pointer  (2)]
⎜   ↳ Logitech USB Receiver                   	id=11	[slave  pointer  (2)]
⎣ Virtual core keyboard                   	id=3	[master keyboard (2)]
    ↳ Virtual core XTEST keyboard             	id=5	[slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard            	id=13	[slave  keyboard (3)]
    ↳ Video Bus                               	id=8	[slave  keyboard (3)]
    ↳ Sony Vaio Jogdial                       	id=15	[slave  keyboard (3)]
    ↳ Sony Vaio Keys                          	id=6	[slave  keyboard (3)]
    ↳ Power Button                            	id=9	[slave  keyboard (3)]
    ↳ Logitech USB Receiver                   	id=16	[slave  keyboard (3)]
    ↳ UVC Camera (05ca:18b5)                  	id=10	[slave  keyboard (3)]
~~~
3. List TouchPad properties
~~~
xinput list-props 14
~~~
Output example:
~~~
Device 'SynPS/2 Synaptics TouchPad':
	Device Enabled (142):	1
	Coordinate Transformation Matrix (144):	1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000
	libinput Tapping Enabled (295):	0
	libinput Tapping Enabled Default (296):	0
	libinput Tapping Drag Enabled (297):	1
	libinput Tapping Drag Enabled Default (298):	1
	libinput Tapping Drag Lock Enabled (299):	0
	libinput Tapping Drag Lock Enabled Default (300):	0
	libinput Tapping Button Mapping Enabled (301):	1, 0
	libinput Tapping Button Mapping Default (302):	1, 0
	libinput Accel Speed (281):	0.000000
	libinput Accel Speed Default (282):	0.000000
	libinput Natural Scrolling Enabled (277):	0
	libinput Natural Scrolling Enabled Default (278):	0
	libinput Send Events Modes Available (262):	1, 1
	libinput Send Events Mode Enabled (263):	0, 0
	libinput Send Events Mode Enabled Default (264):	0, 0
	libinput Left Handed Enabled (286):	0
	libinput Left Handed Enabled Default (287):	0
......
~~~
4. Enable tap to click
~~~
xinput set-prop 14 295 1
~~~
5. Add command in step 4 to *.xsession* file to make sure enable tape to click after reboot

### Setup powerline bash and vim
1. Clone resources from github
~~~
git clone https://github.com/powerline/fonts.git
git clone git@github.com:haijunsu/mydotfiles.github
~~~
2. Install powerline fonts
~~~
cd fonts
./install.sh
rm -rf fonts
~~~
3. Config bash
~~~
cd mydotfiles
./config-bash.sh
~~~
4. Install and config Vim
  * Install *Vim* via Package Manager
~~~
./config-vim.sh
~~~

### Install google chrome and foxit reader
1. Install *yaourt-gui-manjaro*
2. Run *Yaourt-Gui* and search/install *google-chrome*
3. Run *Yaourt-Gui* and search/install foxitreader

### Create and update *locate* database
~~~
sudo updatedb
~~~
or better
~~~
sudo ionice -c3 updatedb
~~~

### Chinese pinyin input method
Install *ibus-googlepinyin* via Package Manager


### Reference:
<https://wiki.archlinux.org/index.php/Libinput#Configuration>
<https://unix.stackexchange.com/questions/26188/how-do-i-enable-locate-and-queue-the-database-to-be-built>

