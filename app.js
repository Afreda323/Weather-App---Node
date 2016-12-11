//NON-PROMISE
const yargs = require('yargs');
const geo = require('./geo/geo.js');
const getW = require('./getW/getW.js');

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

//handle request
geo.handleRequest(argv.a, (err, res) => {
  if (err) {
    console.log(err);
  }else {
    //log address
    console.log(`You are in ${res.address}`);
    //Fetch Weather
    getW.getW(res.lat, res.lon, (err, weatherRes) =>{
      if (err) {
        console.log(err);
      }else{
        console.log(`It is currently ${weatherRes.temp}, but feels like ${weatherRes.feels}`);
      }
    });
  }
});
