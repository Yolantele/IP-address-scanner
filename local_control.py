import os
import datetime, time
import requests
import yaml
import schedule
import functools

local = 'http://localhost:3001'
deployed = 'https://still-temple-26174.herokuapp.com'
BASE_URL = deployed 
MAP_FILE = "wifi_map.yaml"

def open_and_convert_file(yaml_file):
  with open(yaml_file, 'r') as network_map:
    try:
      network_map = dict(yaml.load(network_map))
      return network_map
    except yaml.YAMLError as exc:
      print(exc)



def sanitize_network_map(json_file):
  dictionary = dict(json_file)
  network_map = None
  sanitized_data = {}

  for network_name, network_value in dictionary.items():
    if network_value is not None and type(network_value) is dict:
      for ssid, data in network_value.items():
        if data is not None and type(data) is dict:   
          if 'devices' in data.keys():
            number_of_devices = len(data["devices"])
            if number_of_devices is not 0:
              sanitized_data[str(network_name)] = str(number_of_devices)
  return sanitized_data


def post_network_map(sanitized_json):
  post_to_url = BASE_URL + "/api/scan"
  requests.post(post_to_url, json=sanitized_json)
  print(sanitized_json, ' was posted to scanner-network server, ', time.time())
  

def catch_exceptions(job_func, cancel_on_failure=False):
  @functools.wraps(job_func)
  def wrapper(*args, **kwargs):
      try:
          return job_func(*args, **kwargs)
      except:
          import traceback
          print(traceback.format_exc())
          if cancel_on_failure:
              return schedule.CancelJob
  return wrapper



@catch_exceptions
def this_job():
  network_json = open_and_convert_file(MAP_FILE)
  if type(network_json) is dict:
    sanitized_net_json = sanitize_network_map(network_json)
    if type(sanitized_net_json) is dict:
      post_network_map(sanitized_net_json)


schedule.every(40).to(59).seconds.do(this_job)

while True:
  schedule.run_pending()
  time.sleep(1)

