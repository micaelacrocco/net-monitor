#!/bin/bash

# Uso: ./restart_interface.sh <dispositivo_ip> <interfaz>
DEVICE_IP=$1
INTERFACE=$2

ssh admin@"$DEVICE_IP" "sudo ip link set $INTERFACE down && sudo ip link set $INTERFACE up"
