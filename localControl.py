import os
from subprocess import call

# run_root = "sudo su"
# activate_pyenv = "source trackerjacker_env/bin/activate"
run_trackerjacker = "trackerjacker -i wlan1 --map --map-file ./maps/wifi_map_31Aug_12pm_JigsawBuilding.yaml"


# call(["ls", "-l"])
call([run_trackerjacker])


# if you want to pass some variable in the script:

# a = a.c
# call(["vim", a])