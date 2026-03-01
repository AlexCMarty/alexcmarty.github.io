---
title: How to Get the Camera Working for the Lenovo Thinkpad X9 15 Gen 1 (Ubuntu, KDE Neon)
date: 2026-03-01 11:15:00 -0500
categories: [Tutorial]
tags: [tutorial, linux, thinkpad, lenovo]
---

## Context

The Lenovo Thinkpad X9 15 Gen 1 came out in 2025, and has been [certified](https://ubuntu.com/certified/202411-35966) to support Ubuntu. I've tried both Linux Mint and KDE Neon on this laptop. Both are derived from Ubuntu, and the camera works well for both. Fingerprint scanner also works well and integrates with PAM. I recently switched to KDE Neon because I wanted the better Wayland support. I'm writing this article because it took me far too much searching and digging through lengthy Lenovo forums to find the right answer. 

The camera doesn't work out of the box because it's a special "MIPI" camera, as opposed to a USB camera. Your laptop needs the OEM kernel. Right now if I run `uname -r` I get `6.17.0-1012-oem`. Note that it doesn't end in `-generic`. The following instructions will install the OEM kernel by Lenovo with the needed binary blob for the camera to work.

> At the time of writing, this won't work on Fedora, Arch, or other distros not derived from Ubuntu 😔. The blob is specific to Ubuntu derived distros.
{: .prompt-warning }

## Procedure

> KDE Neon users: remember to replace any `apt update` or `apt upgrade` in this guide with `pkcon refresh` or `pkcon update`.
{: .prompt-info }

### 1. Update (duh)

If you're lucky with your Ubuntu flavor, an update will automatically pull the kernel you need. This didn't work for me on KDE Neon.

```bash
sudo apt update && sudo apt upgrade -y
sudo reboot 
```
If that didn't work, proceed to the next step.

### 2. Commands

First, list all drivers needed
```bash
ubuntu-drivers list
```

This should output something like `oem-sutton-dana-meta`. Install it.
```bash
sudo apt install oem-sutton-dana-meta # (or whatever driver was listed)
```

Next add the apt repo and pull new updates.
```bash
sudo add-apt-repository "deb http://lenovo.archive.canonical.com/ noble sutton"
sudo apt update
```

Make sure the OEM keyring is installed. It was installed for me already, but be sure.
```bash
sudo apt install ubuntu-oem-keyring
```

Next, list the drivers again. There should be the camera driver. Ignore any notes of deprecated software.
```bash
$ ubuntu-drivers list
udevadm hwdb is deprecated. Use systemd-hwdb instead.
oem-sutton-dana-meta
libcamhal-ipu7x
```

Install it and update again. There should be a lot of updates.
```bash
sudo apt install libcamhal-ipu7x # (or whatever ipu7 you got)
sudo apt update
sudo apt upgrade -y
```

If all went well, it should prompt you that the updates require a reboot! Then the camera will work.

## Only if this didn't work

These steps might change in the future or become obselete. For up to date info check the [Ubuntu wiki for Lenovo](https://wiki.ubuntu.com/Lenovo), although it doesn't mention this specific laptop model. Also consider looking at this [insanely long Lenovo thread](https://forums.lenovo.com/t5/Ubuntu/Any-luck-with-the-Thinkpad-X9-Gen-1/m-p/5363867?page=36) where I originally found this solution.
