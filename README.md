to run TRACKER JACKER on rPI:
1. run tracker jacker with root priveleges: 
sudo su (run raspberryPi with root privileges )

2. activate python environment:
source trackerjacker/bin/activate

3. if you need to look up what is the device interface for tracker jacker to map all the networks use:
Ifconfig -a (looks up local wlan address and other device interface info)

4. mapp all the networks and decives on specified interface ( -i (in this case  it was wlan1))
trackerjacker -i wlan1 --map



Other Useful:

- trackerjacker documentation:
https://github.com/calebmadrigal/trackerjacker

- commandline:

```--access-points APS_TO_WATCH```(Specified by BSSID separated by commas)

```--plugin-config PLUGIN_CONF_JSON``` (config to pass to python trigger plugin)

```--map-file MAP_FILE```  (File path to witch to output WiFi map (default is WiFi_map.yaml file) 

```--print-default-config```

```--config CONFIG``` (path to config json file to run trackerjacke on non-default settings)






