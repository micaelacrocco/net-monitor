#!/bin/bash

# Uso: ./traceroute.sh <dispositivo_ip> <host_objetivo>
DEVICE_IP=$1
TARGET_HOST=$2

ssh admin@"$DEVICE_IP" "traceroute $TARGET_HOST"
