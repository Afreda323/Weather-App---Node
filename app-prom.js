//PROMISE VERSION
const axios = require('axios');
const yargs = require('yargs');
//declare Yargs based input
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to search for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

//Encode User input
var encoded = encodeURIComponent(argv.address);
//GOOGLE API
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`;

axios.get(url).then( (res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address');
  }
  var addr = res.data.results[0].formatted_address;
  var lat = res.data.results[0].geometry.location.lat;
  var lon = res.data.results[0].geometry.location.lng;
  //LOG ADDRESS
  console.log('--------------------------------');
  console.log("Displaying Results for:");
  console.log(addr);
  //WEATHER API DETAILS
  const key = '3496823cb356bd6f2a98de794ace27d3'
  var weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lon}`;
  //MAKE CALL TO WEATHER API
  return axios.get(weatherUrl);
}).then( (res) => {
  //ON SUCCESS
  var temp = res.data.currently.temperature;
  var feels = res.data.currently.apparentTemperature;
  console.log(`It is currently ${temp}F, but feels like ${feels}F`);
  console.log('--------------------------------');
}).catch( (err) => {
  //ON FAIL
  if (err.code === "ECONNREFUSED") {
    console.log('There was a problem with your connection');
  }else{
    console.log(err.message);
  }
});
