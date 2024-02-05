---
pubDatetime: 2020-11-20T05:35:07.322Z
title: Switching from Ubuntu to Manjaro Linux
description: I've been an Ubuntu user for a long time. During this time I've
  been tempted to change to other distributions, and I did it a couple of times,
  but I ended up sticking with Ubuntu due to its simplicity, stability and
  community support.
tags:
  - Manjaro
  - Linux
author: Josep Monjo
---

I've been an Ubuntu user for a long time. During this time I've been tempted to change to other distributions, and I did it a couple of times, but I ended up sticking with Ubuntu due to its simplicity, stability and community support.

But I was pissed by the last Canonical movements to **force you to use their snap packages**. Mainly because:

- They add unnecessary weight to the apps
- The apps can't access the host api directly
- They last forever to start

But Canonical is pushing it even if you install an app through the command line.

That made me try alternatives. First I tried Fedora. I was a Fedora user long time ago. I have to admit that it was very good, but I felt a little bit limited due to most of the software is Ubuntu/debian packaged.

I was about to try Debian when a trendy distribution hit my face. Manjaro.

## Manjaro linux

Manjaro is a rolling release distribution based on Arch. Si it has the freedom of Arch but the easy approach of a standard distribution. And I have to say that I'm very impressed. For now it has exceeded all my expectations.

I'm used to Gnome. I've tried kde so many times but I always come back to the simplicity of Gnome. And I have to say that the Manjaro Gnome flavor is awesome. The apps and extensions packed by default are perfect. I haven't needed to install a bunch of them by hand as I usually do on each fresh install.

And the official repos combined with the gigantic AUR repo, makes it so easy to find and install any package you can imagin.

I'm definitely sticking to Manjaro as my main distribution for a while.

## Manjaro KDE on Macbook Air

My laptop is a 2017 MacBook Air. Manjaro installed without problems to it. But as usual, I had to install a couple of drivers.

### Wifi drivers

To make the wifi drivers work I just had to update the system and install `broadcom-wl` selecting the one corresponding to my kernel version.

And that was really all.

### Webcam

To make the webcam work I usually have to compile the drivers from source, but this time I could do it automatically from the install process. I just needed to install `bcwc-pcie-git`.

### Import GPG keys

Sometimes when building a package you can recieve a GPG import key error. You need to manually import it with:
`gpg --keyserver pool.sks-keyservers.net --recv-key <YOUR KEY>`

### Automatic keyboard and screen light

You can use [lightum](https://github.com/poliva/lightum), although I still have some issues with the keyboard adjustments.

### Wake up after suspend

I was havving issues with the laptop not suspending after closing the laptop. In the [arch wiki](https://wiki.archlinux.org/index.php/Mac#Wake_Up_After_Suspend) suggests:

Add this file:

`sudo nano /etc/systemd/system/suspend-fix.service`

With this conent:

```text{codeTitle: "suspend-fix.service"}
[Unit]
Description=Fix for the suspend issue
[Service]
Type=oneshot
ExecStart=/bin/sh -c "echo XHC1 > /proc/acpi/wakeup && echo LID0 > /proc/acpi/wakeup"
[Install]
WantedBy=multi-user.target
```

And then run the following:

`systemctl enable suspend-fix.service`

`systemctl start suspend-fix.service`

After that you no longer can wake the computer by opening the laptop. You'll have to press the power button. But the proble would have disapeared.

### Fix funky buttons on GTK apps after restart

You need to remove these files and folders from `~/.config/gtk-3.0`:

- assets/ - folder for the buttons to integrate with the Breeze theme
- colors.css - to match the colors of the color-scheme used in KDE Plasma
- window_decorations.css - to decorate the windows according to Breeze

An keep just:

- gtk.css
- settings.ini

Found [here](https://forum.manjaro.org/t/how-to-restore-default-style-of-windows-buttons-in-gnome-shell/34414/4).

### AMD GPU Drivers

I have an RX 5700XT so I need a NAVI driver. In the [arch wiki](https://wiki.archlinux.org/index.php/AMDGPU) suggests to install mesa-git driver (expermental) to enable 3D acceleration for NAVI GPUs.
