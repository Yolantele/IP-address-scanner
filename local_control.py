import os
import subprocess
from subprocess import call
import datetime, time

#  map name:
date = str(datetime.datetime.now().strftime("%d%b%y-%I%p"))
building = '_Twickenham' # insert building name 
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

call([run_trackerjacker], shell=True)



# def save_network_map_test(seconds=5):
#   start = time.time()
#   end = start + seconds #seconds
#   interval = min(seconds /1000.0, .25)
  
  
#   while True:
#     if time.time() < end:
#       p = subprocess.Popen('whoami', shell=True)

#     if time.time() >= end:
#       p.kill()
#     time.sleep(interval)

# save_network_map_test()