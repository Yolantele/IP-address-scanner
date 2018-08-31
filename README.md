to run network scan for devices (trackerjacker) on rPI:
1. run with root priveleges: 
```sudo su``` (run raspberryPi with root privileges )

2. activate python environment:
```source trackerjacker_env/bin/activate```

3. run script to launch trackerjacker scan networks for devices :
```python3 localContral.py```

4. run script to parse network .yaml map/maps into sanitized JSONs: 
``` node ParseTrackerJackerWifiMap.js ```


-  standalone command to map all the networks and decives on specified interface ( -i (in this case  it was wlan1))
```trackerjacker --interface INTERFACE --map``` ( looks up local INTERFACE (wlan address) by ```Ifconfig -a ``` ))



Other Useful:

- trackerjacker documentation:
https://github.com/calebmadrigal/trackerjacker

- commandline:

```--access-points APS_TO_WATCH```(Specified by BSSID separated by commas)

```--plugin-config PLUGIN_CONF_JSON``` (config to pass to python trigger plugin)

```--map-file MAP_FILE```  (File path to witch to output WiFi map (default is WiFi_map.yaml file) 





