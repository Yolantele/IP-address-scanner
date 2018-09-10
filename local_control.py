import os
import datetime, time
import requests
import yaml
import schedule
import functools
from time import sleep 
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


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
  sanitized_data = {}

  for network_name, network_value in dictionary.items():
    if network_value is not None and type(network_value) is dict:
      if 'unknown_ssid' not in network_name:
        for ssid, data in network_value.items():
          if data is not None and type(data) is dict:   
            if 'devices' in data.keys():
              number_of_devices = len(data["devices"])
              if number_of_devices is not 0:
                sanitized_data[str(network_name)] = str(number_of_devices)

  return sanitized_data


def post_network_map(sanitized_json):
  post_to_url = BASE_URL + "/api/scan"

  session = requests.Session()
  retry = Retry(connect=3, backoff_factor=0.5)
  adapter = HTTPAdapter(max_retries=retry)
  session.mount('http://', adapter)
  session.mount('https://', adapter)

  session.post(post_to_url, json=sanitized_json)
  

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

def with_logging(func):
  @functools.wraps(func)
  def wrapper(*args, **kwargs):
    print('LOG: Job "%s"' % func.__name__)
    result = func(*args, **kwargs)
    print('LOG: Job "%s" completed' % func.__name__)
    return result
  return wrapper


@with_logging
@catch_exceptions
def this_job():
  network_json = open_and_convert_file(MAP_FILE)
  if type(network_json) is dict:
    sanitized_net_json = sanitize_network_map(network_json)
    if type(sanitized_net_json) is dict:
      # post_network_map(sanitized_net_json)
      print(sanitized_net_json)


schedule.every(0.1).minutes.do(this_job)

while True:
  schedule.run_pending()
  time.sleep(1)

