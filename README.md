# node-json-rpc2
A small and easy to use JSON-RPC 2.0 for node.js.

# Specifications

Based on the 2.0 (revised) specifications. See [here](http://www.jsonrpc.org/specification)
More information [here](https://en.wikipedia.org/wiki/JSON-RPC)


# Usage 



### Server : 

Protocol supported : http  
Method supported : POST, GET   

```
const RpcServer = require('node-json-rpc2').Server;
const server = new RpcServer({
    protocol:'http',
    path:'/',
    port:80,
    method:'GET'
});
server.addMethod('add', function(parameters, id){
    return {id:id, error:null, result:parameters[0]+parameters[1]}
});
```

### Client : 

Protocol supported : http, https  
Method supported : POST, GET  

```
const RpcClient = require('../lib/index').Client;
var client = new RpcClient({
    protocol:'http',//Optional. Will be http by default
    path:'/',
    port:80,
    method:'GET'
});
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
```

### Usage with bitcoind

This is an exemple usage to connect to bitcoind using json rpc

```
'use strict';
const RpcClient = require('node-json-rpc2');
const config = {
    protocol:'http',//Optional. Will be http by default
    host:'127.0.0.1',//Will be 127.0.0.1 by default
    user:'bitcoin',//Optional, only if auth needed
    password:'local321',//Optional. Can be named 'pass'. Mandatory if user is passed.
    port:9998,//Will be 8443 for https or 8080 for http by default
    method:'POST'//Optional. POST by default
};
var client = new RpcClient(config);
client.call({
    method:'getinfo',//Mandatory
    params:[],//Will be [] by default
    id:'rpcExample',//Optional. By default it's a random id
    jsonrpc:'2.0'//Optional. By default it's 2.0
},(err, res)=>{
    if(err){
       //Do something
    }
    console.log('Data:',res);//Json parsed.
});
```