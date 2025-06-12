#!/bin/bash

# Uso: ./unblock_ip.sh <dispositivo_ip> <ip_a_desbloquear>
DEVICE_IP=$1
IP_TO_UNBLOCK=$2

ssh admin@"$DEVICE_IP" "sudo iptables -D INPUT -s $IP_TO_UNBLOCK -j DROP && sudo iptables -D OUTPUT -d $IP_TO_UNBLOCK -j DROP"
