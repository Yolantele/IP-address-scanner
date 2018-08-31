import os
from subprocess import call
import datetime
import time

#  map name:
date = str(datetime.datetime.now().strftime("%d%b%y-%I%p"))
building = '_JigsawBuilding' # insert building name 
file_type = '.yaml' 

# configurations:
map_name = 'wifi_map_' + date + building + file_type
maps_directory = ' ./maps/' 
provide_map = ' --map-file' + maps_directory + map_name

# interface: (to find your local device wlan address, lookup for device in temrinal: ifconfig -a)
interface_name = 'wlan1'
provide_interface = ' --interface ' + interface_name

# run_root = "sudo su"
# activate_pyenv = "source trackerjacker_env/bin/activate"
run_trackerjacker = 'trackerjacker --map ' + provide_map + provide_interface


def scan_network(seconds=10):

  start = time.time()
  print(start)
  end = start + interval #seconds
  print(end)
  interval = min(seconds /1000.0, .25)
  print(interval)

  while True:
    if time.time() < end:
      # calls commands inside shell's location (can provide directory):
      call([run_trackerjacker], shell=True)
    if time.time() >= end:
      call(["^C"])
    time.sleep(interval)

scan_network()