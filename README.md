# node-json-rpc2
A small and easy to use JSON-RPC 2.0 for node.js.

# Specifications

Based on the 2.0 (revised) specifications. See [here](http://www.jsonrpc.org/specification)
More information [here](https://en.wikipedia.org/wiki/JSON-RPC)


# Usage 

### Client : 

This is an exemple usage to connect to bitcoind using json rpc

```
'use strict';
const RpcClient = require('node-json-rpc2);
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

### Server : 

```
Will come in the next version
```