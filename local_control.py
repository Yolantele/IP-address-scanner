import os
import datetime, time
import requests
import yaml
import schedule

local = 'http://localhost:3001'
deployed = 'https://still-temple-26174.herokuapp.com'
BASE_URL = deployed 
MAP_FILE = "wifi_map.yaml"


def sanitize_and_post_network_map():
  network_map = None
  sanitized_data = {}
  with open(MAP_FILE, 'r') as network_map:
    try:
      network_map = yaml.load(network_map)
    except yaml.YAMLError as exc:
      print(exc)

  for network_name, network_value in network_map.items():
    if type(network_value) is dict:
      for ssid, data in network_value.items():
        if type(data) is dict:   
          if 'devices' in data.keys():
            number_of_devices = len(data["devices"])
            if number_of_devices is not 0:
              sanitized_data[str(network_name)] = str(number_of_devices)

  print(sanitized_data)

  post_to_url = BASE_URL + "/api/scan"
  requests.post(post_to_url, json=sanitized_data)
  print(MAP_FILE, ' was posted to scanner-network server, ', time.time())
  sanitized_data={}
  
          
schedule.every(1).minutes.do(sanitize_and_post_network_map)

while True:
  schedule.run_pending()
  time.sleep(1)
