import os
import subprocess
from subprocess import call
import datetime, time
import requests
import yaml
import schedule

local = 'http://localhost:3001'
deployed = 'https://still-temple-26174.herokuapp.com'
BASE_URL = deployed 

def job():
  with open("wifi_map.yaml", 'r') as network_map:
    try:
      data = { "data": yaml.load(network_map) }
      post_to_url = BASE_URL + "/api/scan"

      requests.post(post_to_url, json=data)

      print('posted wifi_map.yaml to network server')

    except yaml.YAMLError as exc:
      print(exc)


schedule.every(1).minutes.do(job)

while 1:
  schedule.run_pending()
  time.sleep(1)

# makes a post request to launch periodic saving of data:

# launcher = requests.post(scanner_switch_url, data={})

# print("calling " + scanner_switch_url)

# #  map name:
# date = str(datetime.datetime.now().strftime("%d%b%y")) # this format is  "03Sep18"; format2: "%d%b%y-%I%p" is "03Sep18-10AM"
# building = '_Twickenham' # insert building name 
# file_type = '.yaml' 

# # configurations:
# map_name = 'wifi_map_' + date + building + file_type
# maps_directory = ' ./maps/' 
# provide_map = ' --map-file' + maps_directory + map_name

# # interface: (to find your local device wlan address, lookup for device in temrinal: ifconfig -a)
# interface_name = 'wlan1'
# provide_interface = ' --interface ' + interface_name

# # run_root_priveledges = "sudo su"
# # activate_pyenv = "source trackerjacker_env/bin/activate"
# run_trackerjacker = 'trackerjacker --map ' + provide_map + provide_interface

# call([run_trackerjacker], shell=True)