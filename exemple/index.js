// const RpcClient = require('node-json-rpc').Client;
const RpcClient = require('../lib/index').Client;
const RpcServer = require('../lib/index').Server;

const server = new RpcServer({
    protocol:'http',
    path:'/',
    port:80,
    method:'GET'
});
server.addMethod('add', function(parameters, id){
    return {id:id, error:null, result:parameters[0]+parameters[1]}
});
const config = {
    protocol:'http',//Optional. Will be http by default
    // host:'gurujsonrpc.appspot.com',//Will be 127.0.0.1 by default
    path:'/',
    port:80,
    method:'GET'
};
var client = new RpcClient(config);
client.call({
    method:'add',//Mandatory
    params:[1,2],//Will be [] by default
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