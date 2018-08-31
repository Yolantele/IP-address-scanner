import os
from subprocess import call
import datetime

# build map name:
in_format = "%d%b%y-%I%p"
date = str(datetime.datetime.now().strftime(in_format))
building = '_JigsawBuilding'
file_type = '.yaml'

# configure trackerjacker:
# - provide map:
map_name = 'wifi_map_' + date + building + file_type
maps_directory = ' ./maps/' 
provide_map = ' --map-file' + maps_directory + map_name

# provide interface (wlan address, lookup for device in temrinal: ifconfig -a)
interface_name = 'wlan1'
provide_interface = ' --interface ' + interface_name


# run_root = "sudo su"
# activate_pyenv = "source trackerjacker_env/bin/activate"
run_trackerjacker = 'trackerjacker --map ' + provide_map + provide_interface


# calls commands inside shell's location (can provide directory):
call([run_trackerjacker], shell=True)


# if you want to pass some variable in the script:

# a = a.c
# call(["vim", a])