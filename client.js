 var  io = require("socket.io-client");
// var socket = io.connect('http://localhost:3000');

// Make connection
var socket = io.connect('http://localhost:3000/communication');


const https = require('http');
var interation=1;

function random_number(){
    return Math.floor((Math.random() * 100) + 1);
}


function sending_driverRequest(iter){

    const data = JSON.stringify({
        driverName :'driver-'+iter,
        cordinatesX:random_number(),
        cordinatesY:random_number(),
        car_no:random_number()
    });

    //driver data 
   // console.log(data);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/request/driver',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }

      const req = https.request(options, res => {
        console.log(`statusCode for sending driver request : ${res.statusCode}`)
      
         res.on('data', d => {
          // console.log(d);
         })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.write(data)
      req.end()
}

function sending_riderRequest(iter){

    const data = JSON.stringify({
        riderName :'rider-'+iter,
        cordinatesX:random_number(),
        cordinatesY:random_number(),
        destinationX:random_number(),
        destinationY:random_number()
    });

    //driver data 
   // console.log(data);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/request/rider',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }

      const req = https.request(options, res => {
        console.log(`statusCode for sending rider request: ${res.statusCode}`)
      
         res.on('data', d => {
          // console.log(d);
         })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.write(data)
      req.end()
}

function send_driver_rating(data){
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/rating',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode for sending rating: ${res.statusCode}`)
  
     res.on('data', d => {
      // console.log(d);
     })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()
}


socket.on('connectWithClient',(info)=>{
  console.log('socket connection established');
  console.log(info);
  var i;
  var data;
  for(i=0;i<info.length;i++){
     data = JSON.stringify({
      driverName :info[i].driverName,
      rating:random_number()
     
  });
  }

  send_driver_rating(data);
});

setInterval(function(){
    sending_driverRequest(interation);
    sending_riderRequest(interation);
    interation++;
},1000);