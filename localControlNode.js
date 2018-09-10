const yaml = require('yamljs');
const fs = require('fs');
const cron = require('node-cron');
const moment = require('moment')

const localSave = '/Users/jolanta/Projects/2018/network-scanner/saved_map/'
const local = '/Users/jolanta/Projects/2018/network-scanner/maps/'
const piSave = `/home/pi/trackerjacker/`
const rPi = `/home/pi/trackerjacker/maps/saved_map/`;


const PATH = local
const PARSED_MAP = "wifi_map_parsed.json"
const SAVE_TO_PATH = localSave

// converts YAML to stringified JSON:
const yamlToJson = mapName => {
    try {
        return yaml.parse(fs.readFileSync(PATH + mapName, 'utf8'));
    } catch (e) {
        console.log(e)
    }
}

//parses stgringified JSON into sanitized JSON obj:
const parseNetworkData = mapName => {

    let parsedData = {}
    var jsonMap = yamlToJson(mapName)
    
    Object.entries(jsonMap).forEach(([network, networkValue]) => {
        let devicesAccrossNetworks = 0
        let devices = 0
        Object.entries(networkValue).forEach(([ssid, values]) => {
            if (typeof values['devices'] === 'object') {
                devices += Object.keys(values['devices']).length
            }
        })
        if (devices === 0) {
            null
        } else {
            devicesAccrossNetworks += devices
            parsedData[network] = devicesAccrossNetworks
        }

    })
    return parsedData
}

const writeParsedObject = obj => {
    fs.writeFileS(SAVE_TO_PATH, JSON.stringify(obj, undefined, 2 ), (err) => {
        if (err) console.log(err)
    })
}

function writeConfig(obj) {
    fs.writeFile('./config.json', JSON.stringify(obj, undefined, 2), function (err) {
        if (err) console.log(err);
    });
}

const readForParsing = fs.readdirSync(PATH).map(file => {
    var parsedMap = parseNetworkData(String(file));
    console.log(parsedMap)
    writeParsedObject(String(parsedMap))
    
})


// periodically runs these commands:
cron.schedule('* * * * *', () => { // saves every minute
    readForParsing
    console.log(`-----------> PARSED THE MAP, `, moment.now())
});



module.exports = {
    yamlToJson,
    parseNetworkData,
    readForParsing,
}