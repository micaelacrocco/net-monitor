import paramiko
import sys

def capture_traffic(device_ip, interface, duration, output_file):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(device_ip, username='admin')

    remote_pcap = f"/tmp/{output_file}"

    # Comando tcpdump para capturar tráfico
    cmd = f"sudo timeout {duration} tcpdump -i {interface} -w {remote_pcap}"

    print(f"Iniciando captura en {device_ip} en interfaz {interface} por {duration} segundos...")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    exit_status = stdout.channel.recv_exit_status()
    if exit_status == 0:
        print("Captura finalizada, descargando archivo...")
    else:
        print("Error al ejecutar tcpdump:", stderr.read().decode())
        ssh.close()
        return

    # Descargar archivo pcap
    sftp = ssh.open_sftp()
    sftp.get(remote_pcap, output_file)
    sftp.remove(remote_pcap)
    sftp.close()
    ssh.close()

    print(f"Archivo {output_file} descargado con éxito.")

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Uso: python capture_traffic.py <dispositivo_ip> <interfaz> <duracion_segundos> <archivo_salida.pcap>")
        sys.exit(1)

    device_ip = sys.argv[1]
    interface = sys.argv[2]
    duration = sys.argv[3]
    output_file = sys.argv[4]

    capture_traffic(device_ip, interface, duration, output_file)
