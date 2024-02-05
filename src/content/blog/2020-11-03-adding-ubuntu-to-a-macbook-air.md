---
pubDatetime: 2020-11-03T05:35:07.322Z
title: Adding Ubuntu to a MacBook Air
description: I've been setting up a bunch of Ubuntu servers lately and that
  probably has awakened my Linux desire again.
tags:
  - Ubuntu
  - Linux
author: Josep Monjo
---

I've been setting up a bunch of Ubuntu servers lately and that probably has awakened my Linux desire again. I've been using MacOS as my primary development environment for the past years, after being a Linux user for so many years. That was because I was missing a good Linux hardware and the MacBook Air was just a very good fit for a Unix based development environment.

I already installed Windows using Bootcamp and now my goal was to install Ubuntu to have a triple boot system. That way I'll be able to develop apps for the 3 platforms and I'll be using my beloved Linux more.

### Boot manager

To manage our third OS we'll need a boot manager due to Bootcamp only allows one operating system at a time. So lets install Refind.

I have followed this instructions:

We first need to boot MacOs in recovery mode by pressing Command-R (⌘R) while booting.

Once in recovery mode go to utilities/terminal, navigate to your pen drive where you have downloaded refind folder. Type

`./refind-install`

### Adding MacOs keybindings

I'm used to MacOs keybindings, and since we're talking about using a Mac keyboard it makes sense to keep the same key bindings.

To accomplish that we're going to use this project: [https://github.com/petrstepanov/gnome-macos-remap](https://github.com/petrstepanov/gnome-macos-remap)

And to emulate CMD+space spotlight, we have [Ulauncher](https://ulauncher.io/).

### Drivers

Pretty much everything works out of the box.

I had only to install the webcam drivers from here:

```bash
    cd ~/src
    git clone https://github.com/patjak/bcwc_pcie.git
    cd bcwc_pcie/firmware
    git clone https://github.com/patjak/facetimehd-firmware
    cd facetimehd-firmware
    sudo make
    sudo make install
    cd ../..
    sudo make
    sudo make install   # (Update with make install for 18.04)
    sudo depmod
    sudo modprobe -r bdc_pci # this one fails to me :( but it works ok
    sudo modprobe facetimehd
```

`sudo nano /etc/modules **add line "facetimehd", write out (ctl+o) & close**`

Some other interesting tweaks can be extracted from here: <https://medium.com/@racter/how-to-install-ubuntu-16-04-on-a-retina-macbook-11-2-74e7779c0e47>

### Issues

You may run into some issues. One of them is that after booting Ubuntu, **refind may disappear**. You can solve it like [this](https://askubuntu.com/a/936459).
