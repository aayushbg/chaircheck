"""
ChairCheck Haar Cascade Face Detector
------------------------------------
Captures video from phone camera or webcam.
Every 10 seconds:
  - Detects if a face is present using OpenCV Haar cascade.
  - Sends POST to OCCUPY_URL if face detected, VACATE_URL if not.

Requires: pip install opencv-python requests
"""

import cv2
import time
import sys
import traceback
import requests

# ========== CONFIGURATION ==========
VIDEO_SOURCE = "http://192.168.137.169:8080/video"   # <-- Replace with your phone's stream URL or 0 for webcam
OCCUPY_URL = "https://chaircheck-backend.onrender.com/occupy"
VACATE_URL  = "https://chaircheck-backend.onrender.com/vacate"

PAYLOAD = {"room_number": 1, "seat_number": 2}
INTERVAL_SECONDS = 10
HTTP_TIMEOUT = 8

# Load OpenCV's built-in Haar cascade model for face detection
HAAR_MODEL = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(HAAR_MODEL)
# ===================================


def send_post(url, payload):
    """Send POST request to given URL with payload."""
    try:
        r = requests.post(url, json=payload, timeout=HTTP_TIMEOUT)
        r.raise_for_status()
        print(f"[{time.strftime('%H:%M:%S')}] ✅ POST {url.split('/')[-1]} OK ({r.status_code})")
    except Exception as e:
        print(f"[{time.strftime('%H:%M:%S')}] ❌ POST failed: {e}")


def is_face_present(frame_bgr):
    """Detect if any face is present in the frame using Haar cascade."""
    try:
        gray = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2GRAY)
        # detectMultiScale returns a list of rectangles around detected faces
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.05,
            minNeighbors=3,
            minSize=(40, 40)
        )
        face_found = len(faces) > 0
        print(f"[{time.strftime('%H:%M:%S')}] Haar cascade detected {len(faces)} face(s)")
        return face_found
    except Exception as e:
        print("Face detection error:", e)
        traceback.print_exc()
        return False


def open_video_source(source):
    """Open webcam or IP camera stream."""
    try:
        source_idx = int(source)
        cap = cv2.VideoCapture(source_idx)
    except:
        cap = cv2.VideoCapture(source)
    return cap if cap.isOpened() else None


def main():
    print("📹 Starting ChairCheck Haar Cascade monitor...")
    cap = open_video_source(VIDEO_SOURCE)
    if cap is None:
        print("⚠️ Could not open video source.")
        sys.exit(1)

    try:
        while True:
            ret, frame = cap.read()
            if not ret or frame is None:
                print("⚠️ Frame read failed, retrying...")
                time.sleep(2)
                continue

            # Check for face
            face_found = is_face_present(frame)

            # Send corresponding POST request
            if face_found:
                send_post(OCCUPY_URL, PAYLOAD)
            else:
                send_post(VACATE_URL, PAYLOAD)

            time.sleep(INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\n🛑 Stopped by user.")
    finally:
        cap.release()


if __name__ == "__main__":
    main()
