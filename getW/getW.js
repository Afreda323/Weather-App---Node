const request = require('request');

var getW = (lat, lon, callback) => {
  const key = '3496823cb356bd6f2a98de794ace27d3'
  var url = `https://api.darksky.net/forecast/${key}/${lat},${lon}`
  //REQUEST TO WEATHER API
  request({
    url,
    json: true
  }, (error, response, body) => {
  //SUCCESS
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temp: body.currently.temperature,
        feels: body.currently.apparentTemperature
      });
  //ERR
    }else{
      callback('Unable to fetch weather');
    }
  })
}

module.exports = {
  getW
};
