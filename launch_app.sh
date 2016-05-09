#/bin/bash

# Disable DPMS / Screen blanking
xset dpms 120 240 280
xset s off
xset s noblank

modprobe bcm2835-v4l2

mkdir /root/.config
sudo matchbox-window-manager -use_titlebar no
