On rPI packet:
run network scan for devices (trackerjacker) on rPI:
1. run with root priveleges: 
```sudo su``` (run raspberryPi with root privileges )

2. activate python environment:
```source trackerjacker_env/bin/activate```

3. start trackerjacker, standalone command to map all the networks and decives on specified interface
```trackerjacker --interface INTERFACE --map``` ( looks up local INTERFACE (wlan address) by ```Ifconfig -a ``` ))

4. run script to launch trackerjacker scanned networks posting to server :
```python3 localControl.py```


- On Heroku:
https://still-temple-26174.herokuapp.com/hello
