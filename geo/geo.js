const request = require('request');

var handleRequest = (address, callback) => {
  //Encode User input
  var encoded = encodeURIComponent(address);
  //declare call URL
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`
  //Make HTTP Request
  request({
    url,
    json: true
  }, (error, response, body) => {
    if (error) {
      //HANDLE ERROR
      callback('Unable to connect to Google');
    }else if (body.status === "ZERO_RESULTS") {
      //handle GOOGLE ERROR
      callback('Unable to find location for address')
    }else if (body.status === "OK") {
      //handle OK
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lon: body.results[0].geometry.location.lng
      });
    }
  })
}

module.exports = {
  handleRequest
};
