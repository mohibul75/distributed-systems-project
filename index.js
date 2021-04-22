var http=require('http');
var socket=require('socket.io');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>console.log('connection establisted with db'))
.catch((err)=>console.log(err));

var server=http.createServer(app);
var io=socket(server);


app.use(express.json());

var client_request = require('./routes/api/client_request');
var rating=require('./routes/api/rating');
app.use('/request',client_request);
app.use('/',rating);

var {rider,driver}=require('./all clients/all_clients');
var matchingArray=require('./all clients/matching');

function distance_calculation(x1,y1,x2,y2){
    return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}
function  callback(socket){
 setInterval(function(){
     
        // console.log(rider);
        // console.log(driver);

        rider.forEach(rider=>{

            var distance = Number.MAX_VALUE;
            var driverIndex=-1;

            for(i in driver){
                var temp_distance =distance_calculation(parseFloat(rider.cordinatesX),
                    parseFloat(rider.cordinatesY),
                    parseFloat(driver[i].cordinatesX),
                    parseFloat(driver[i].cordinatesY));

                    if(distance>temp_distance){
                        distance=temp_distance;
                        driverIndex=i;

                    }
            }

            //console.log('driverInfo');
           // console.log(driver[driverIndex]);

           // console.log('riderInfo');
            //console.log(rider);

            var info = {
                "riderName":rider.riderName,
                "driverName":driver[driverIndex].driverName,
                "cost":distance*2,
                "car_no":driver[driverIndex].car_no
            }

            // const index = array.indexOf(rider);
            if (driverIndex > -1) {
                driver.splice(driverIndex, 1);
            }

            matchingArray.push(info);
        });

        rider.splice(0,rider.length);
        driver.splice(0,driver.length);

        //matching data print
        console.log(matchingArray);

        var info=matchingArray
        socket.emit('connectWithClient',info);

        matchingArray.splice(0,matchingArray.length);
 },5000);

}


var port=3000;

server.listen(port,console.log(`Server running at port ${port}`));

var nsp = io.of('communication');
nsp.on('connection', (socket) => {
    console.log('socket connection made and socket id  : ', socket.id);
   // setInterval(callback(socket),5000);
   callback(socket)
});
