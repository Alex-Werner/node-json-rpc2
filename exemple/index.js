// const RpcClient = require('node-json-rpc').Client;
const RpcClient = require('../lib/index').Client;
const RpcServer = require('../lib/index').Server;

const config = {
    protocol:'https',//Optional. Will be http by default
    host:'gurujsonrpc.appspot.com',//Will be 127.0.0.1 by default
    path:'/guru',
    port:443,
    method:'POST'
};
var client = new RpcClient(config);
client.call({
    method:'guru.test',//Mandatory
    params:['GURU'],//Will be [] by default
},(err, res)=>{
    if(err){
        console.log(err);
        //Do something
    }
    console.log('Data:',res);//Json parsed.
});


//
//
// var postData = require('querystring').stringify({
//     'msg' : 'Hello World!'
// });
//
// var options = {
//     hostname: 'demo.rpc.brutusin.org',
//     port: 80,
//     path: '/rpc/http?jsonrpc=%7B"jsonrpc"%3A"2.0"%2C"method"%3A"time"%7D',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
//     }
// };
//
// var req = require('http').request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// });
//
// req.on('error', (e) => {
//     console.log(`problem with request: ${e.message}`);
// });
//
// // write data to request body
// req.end(postData);