#include <WiFiNINA.h>

#include <OneWire.h>
#include <DallasTemperature.h>

#include <PubSubClient.h>

#define ONE_WIRE_BUS 5
#define PH_SENSOR_PIN A0
#define SOIL_MOISTURE_PIN A1

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DeviceAddress thermometer;

float soilMoisture = 0.0;
float pHValue = 0.0;

  const char* ssid = "Redmi";
   const char* password = "65101234";
 const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(9600);
  sensors.begin();
  sensors.getAddress(thermometer, 0);
  WiFi.begin((char*)ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
     Serial.println("Connecting to WiFi...");
    
  }
 
  Serial.println("Connected to WiFi");
  client.setServer(mqtt_server, 8884);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  sensors.requestTemperatures();
  float temp = sensors.getTempC(thermometer);

  int soilMoistureRaw = analogRead(SOIL_MOISTURE_PIN);
  soilMoisture = map(soilMoistureRaw, 0, 1023, 0, 100);

  int phSensorRaw = analogRead(PH_SENSOR_PIN);
  float phSensorVoltage = (float) phSensorRaw / 1023.0 * 5.0;
  pHValue = 7 - 5 * phSensorVoltage;

  // Publish sensor readings to MQTT topic
 char message[100];
  sprintf(message + strlen(message), "{\"temperature\"}", temp);
  client.publish("/sensor/1", message);
//  char message[100];
  sprintf(message + strlen(message), "{\"soil_moisture\"}", soilMoisture);
  client.publish("/sensor/2", message);
//  char message[100];
 sprintf(message + strlen(message), "{\"ph\"}",pHValue );
  client.publish("/sensor/3", message);
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.print(" *C, Soil Moisture: ");
  Serial.print(soilMoisture);
  Serial.print(" %, pH: ");
  Serial.println(pHValue);

  delay(1000);
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    String clientId = "clientId-v0zEA48kuB";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
}
