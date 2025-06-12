#!/bin/bash

# Uso: ./block_ip.sh <dispositivo_ip> <ip_a_bloquear>
DEVICE_IP=$1
IP_TO_BLOCK=$2

ssh admin@"$DEVICE_IP" "sudo iptables -A INPUT -s $IP_TO_BLOCK -j DROP && sudo iptables -A OUTPUT -d $IP_TO_BLOCK -j DROP"
