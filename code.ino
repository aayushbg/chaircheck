#include <WiFi.h>
#include <HTTPClient.h>

// ==== WiFi Credentials ====
const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

// ==== Force Sensor Pin ====
#define FORCE_SENSOR_PIN 36  // GPIO36 (ADC0)

// ==== Server URLs ====
const char* OCCUPY_URL = "https://chaircheck-backend.onrender.com/occupy";
const char* VACATE_URL = "https://chaircheck-backend.onrender.com/vacate";

// ==== Timing ====
unsigned long lastTime = 0;
unsigned long timerDelay = 10000;  // 10 seconds

// ==== Threshold ====
const int FORCE_THRESHOLD = 200;   // breakpoint for weight detection

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Initialize analog input
  analogSetAttenuation(ADC_11db);

  // ==== WiFi Connection ====
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Connected to WiFi!");
  Serial.print("📶 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    lastTime = millis();

    // Read the force sensor
    int analogReading = analogRead(FORCE_SENSOR_PIN);
    Serial.print("FSR Reading: ");
    Serial.println(analogReading);

    bool occupied = (analogReading >= FORCE_THRESHOLD);

    sendOccupancyData(occupied);
  }
}

// ==== Function to send POST ====
void sendOccupancyData(bool occupied) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    HTTPClient http;

    // Disable certificate verification (since using https)
    client.setInsecure();

    const char* url = occupied ? OCCUPY_URL : VACATE_URL;
    http.begin(client, url);

    http.addHeader("Content-Type", "application/json");

    String jsonBody = "{\"room_number\":1,\"seat_number\":1}";

    Serial.print("➡ Sending POST to: ");
    Serial.println(url);
    Serial.print("Body: ");
    Serial.println(jsonBody);

    int httpResponseCode = http.POST(jsonBody);

    if (httpResponseCode > 0) {
      Serial.print("✅ Response code: ");
      Serial.println(httpResponseCode);
      String response = http.getString();
      Serial.println("Server response: " + response);
    } else {
      Serial.print("❌ Error code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("⚠️ WiFi Disconnected! Reconnecting...");
    reconnectWiFi();
  }
}

// ==== Reconnect WiFi if needed ====
void reconnectWiFi() {
  WiFi.disconnect();
  WiFi.begin(ssid, password);
  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    Serial.print(".");
    retries++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ Reconnected to WiFi!");
  } else {
    Serial.println("\n❌ Failed to reconnect to WiFi.");
  }
}
