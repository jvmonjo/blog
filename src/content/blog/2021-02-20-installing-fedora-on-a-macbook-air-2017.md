---
pubDatetime: 2021-02-20T05:35:07.322Z
title: Installing Fedora on a MacBook Air (2017)
description: Yes, I know. DistroHopping, but I can't help it. I like to try as
  many different distros and Desktop environments as I can.
tags:
  - Fedora
  - Linux
author: Josep Monjo
---

Yes, I know. DistroHopping, but I can't help it. I like to try as many different distros and Desktop environments as I can.

Fedora is one of my favorites and one of the best ways to have a vanilla experience with the latest and greatest Gnome version.

Fedora works pretty well out of the box on my macBook air (2017), although theres a couple of issues here and there the main headache is (as always) the wifi.

## Install broadcom-wl driver

The proprietary broadcom-wl driver can be installed from the [rpmfusion](https://docs.fedoraproject.org/en-US/quick-docs/setup_rpmfusion/) repo.

```bash

sudo dnf install \
  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm

```

```bash

sudo dnf install \
  https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

```

And then we can install it.

`sudo dnf install broadcom-wl`

But...there's a but.

## Fixing issues with broadcom-wl and wpa-supplicant on Fedora

TL/DR:

`sudo dnf copr enable dcaratti/wpa_supplicant`

And then `sudo dnf update`, and reboot.

This is extracted from [Fedora project](https://fedoraproject.org/wiki/Common_F30_bugs#broadcom-wl-mesh) wiki:

> Multiple users of wireless network adapters supported by the proprietary broadcom-wl driver have reported that it does not work reliably in Fedora 30. PLEASE NOTE that Fedora does not provide or support this proprietary driver; we are providing this note only as a courtesy as we are aware that many people acquire the driver from a third party and use it on Fedora.
> The problem seems to be that a new feature in Package-x-generic-16.pngwpa_supplicant that was enabled in Fedora 30 confuses the broadcom-wl driver. As the driver is not open source we cannot provide a fixed version of it, and we will not disable a useful Package-x-generic-16.pngwpa-supplicant feature just to make a proprietary driver work correctly.
> To help out folks with affected devices, Davide Caratti is providing unofficial rebuilds of Package-x-generic-16.pngwpa_supplicant with the feature in question disabled. You can enable his COPR repository by running sudo dnf copr enable dcaratti/wpa_supplicant, and then updating your system should install his rebuild, if it is currently up-to-date compared to the version in the official repositories. With this rebuild installed, the wireless adapter should work reliably.
