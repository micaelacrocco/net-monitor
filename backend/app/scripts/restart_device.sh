#!/bin/bash

# Uso: ./restart_device.sh <dispositivo_ip>
DEVICE_IP=$1

ssh admin@"$DEVICE_IP" "sudo reboot"
