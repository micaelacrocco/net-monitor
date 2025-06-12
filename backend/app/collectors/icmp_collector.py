from pythonping import ping

def icmp_collect(ip, count=4):
    response = ping(ip, count=count, timeout=2)
    avg_latency = response.rtt_avg_ms
    packet_loss = 100 - (response._responses_received / count * 100)
    is_up = response.success()
    return {
        "ip": ip,
        "avg_latency_ms": avg_latency,
        "packet_loss_percent": packet_loss,
        "is_up": is_up
    }
