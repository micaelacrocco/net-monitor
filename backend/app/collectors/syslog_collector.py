import socket

def start_syslog_server(host='0.0.0.0', port=514):

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((host, port))
    print(f"Syslog server listening on {host}:{port}")

    try:
        while True:
            data, addr = sock.recvfrom(4096) 
            message = data.decode('utf-8', errors='ignore').strip()
            print(f"Mensaje recibido de {addr}: {message}")
            # Aca hay que procesar el mensaje recibido, Guardar en base de datos y generar alertas si es necesario.
    except KeyboardInterrupt:
        print("Syslog server detenido.")
    finally:
        sock.close()

if __name__ == "__main__":
    start_syslog_server()
