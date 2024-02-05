---
pubDatetime: 2020-12-31T05:35:07.322Z
title: Fixing 2 minutes shutdown issue
description: I've recently updated my Manjaro system and I've noticed an
  unusually slow shutdown process, around 2 minutes.
tags:
  - Manjaro
  - Linux
author: Josep Monjo
---

I've recently updated my Manjaro system and I've noticed an unusually slow shutdown process, around 2 minutes.

I've found out that it is an issue of systemd update. To workaround it just add this:

`Slice=-.slice`

To the end of this file:

`sudo nano /usr/lib/systemd/user/gnome-session-restart-dbus.service`

Credit: <https://forum.manjaro.org/t/pretty-slow-shutdown/41785/2>
