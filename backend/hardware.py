import io
import socket
import struct
import picamera

# UDP 서버 설정
udp_ip = '124.62.127.24'
udp_port = 8282  # 포트 번호를 8282로 변경

# 카메라 설정
camera = picamera.PiCamera()
camera.resolution = (640, 480)
camera.framerate = 30

# UDP 소켓 생성
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    stream = io.BytesIO()
    for _ in camera.capture_continuous(stream, 'jpeg', use_video_port=True):
        stream.seek(0)
        data = stream.read()

        # 이미지 데이터 크기 전송
        udp_socket.sendto(struct.pack('<L', len(data)), (udp_ip, udp_port))
        # 이미지 데이터 전송
        udp_socket.sendto(data, (udp_ip, udp_port))
        
        stream.seek(0)
        stream.truncate()

finally:
    udp_socket.close()
    camera.close()
