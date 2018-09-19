// API docs: https://eds3.modcam.io/doc

const axios =  require('axios');

const BASE_URL = "https://eds2.modcam.io/v1/"
const CLIENT_ID = "Savvy_demo"
const API_KEY = "a0297d1f3d621c52a28d19f33d210a9d"
const APPLICATION = "peoplecounter"

const HEADERS = {
    "Content-Type": "application/json",
    "x-client-id": CLIENT_ID,
    "x-api-key": API_KEY
  }

// new access token required every 1 hour:
getAPIaccessToken = async () => {
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      "clientId": CLIENT_ID,
      "apiKey": API_KEY,
    },
    url: `${BASE_URL}auth`,
    method: "post",
  }
  return axios(params)
  .then( res => {
    return res.data
  })
  .catch((err) => console.log('-------err', err))
}


getInstallations = () => {
  const params ={
    headers: HEADERS,
    url: `${BASE_URL}${APPLICATION}/installations`,
    method: "get",
  }

  return axios(params)
    .then( res => {
      
      return res.data
    })
    .catch((err) => console.log('-------err', err))

}

getPeopleCounter = (installID, ) => {

  const params = {
    headers: HEADERS,
    url: `${BASE_URL}${APPLICATION}/peoplecounter/installation/${}`,
    method: "get",
  }

  return axios(params)
    .then(res => {

      return res.data
    })
    .catch((err) => console.log('-------err', err))

}



module.exports = {
  getAPIaccessToken,
  getInstallations,
  getPeopleCounter,
}


// getAPIaccessToken()
var data = async () => {
  let result = {}
  result.getInstallations = await getInstallations()
  console.log('------->  result', result)
  return result
}

data()
