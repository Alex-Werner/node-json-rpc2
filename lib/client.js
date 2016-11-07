const https = require('https');
const http = require('http');
function getRandomId() {
    return parseInt(Math.random() * 100000);
}
function Client(options){
    options = options || {};
    this.authNeeded=false;
    this.protocol = options.protocol || 'http';//Either http or https
    this.user = options.user || null;
    this.password = options.password || null; 
    this.host = options.host || '127.0.0.1';
    this.port = options.port || ((this.protocol==='https') ? 8443 : 8080);
    this.agent = (this.protocol==='https')? https : http;
    this.method = options.method || "POST";
    this.path = options.path || '/';
    if(options && options.hasOwnProperty('user') && (options.hasOwnProperty('password') || options.hasOwnProperty('pass'))){
        this.authNeeded=true;
        this.authData = options.user;
        if(options.hasOwnProperty('password')){
            this.authData+=':'+options.password;
        }
        if(options.hasOwnProperty('pass')){
            this.password = options.pass;
            this.authData+=':'+options.pass;
        }
    }
};
/**
 * method : A String with the name of the method to be invoked.
 * params : An Object or Array of values to be passed as parameters to the defined method.
 * callback : A Function(error, success)
 * id : A value of type String, Number (non fractional) or Null 
 * 
 */
Client.prototype.call = function(options, callback, id){
    var requestData = {},params=[], method = '', jsonrpc='2.0', id=getRandomId();
    if(options){
        if(options.hasOwnProperty('method')){
            method = options.method;
        }
        if(options.hasOwnProperty('params')){
            params = options.params;
        }
        if(options.hasOwnProperty('jsonrpc')){
            jsonrpc = options.jsonrpc;
        }
        if(options.hasOwnProperty('id')){
            id = options.id;
        }
    }
    requestData.id = id;
    requestData.method = method;
    requestData.params = params;
    requestData.jsonrpc = jsonrpc;
    
    
    
    requestData = JSON.stringify(requestData);
    if(this.method=='GET'){
        requestData =  require('querystring').escape(requestData);
    }
    var requestOptions = {
        agent: this.agent.globalAgent,
        method: this.method,
        host: this.host,
        port: this.port,
        path: this.path,
        headers:{
            'content-type':(this.method=='POST') ? 'application/x-www-form-urlencoded' :'application/json',
            'content-length':(requestData).length
        }
    };
    if(this.authNeeded){
        requestOptions.auth = this.authData;
    }
    if(this.method == 'GET'){
        requestOptions.path = requestOptions.path+requestData;
    }
    
    var request = this.agent.request(requestOptions);
    request.on('error', function(error){
        callback('error:', error);
    });
    request.on('response', function(response){
        var buffer = '';
        response.on('data', function(bytes){
            buffer+= bytes;
        });
        response.on('end', function(){
           var error, result;
            var data = buffer;
    
            if(response.statusCode=== 400){
                error = new Error('Connection Accepted but error : 400 Bad request Unauthorized - '+data);
                callback(error, data);
            }
            else if(response.statusCode=== 401){
                error = new Error('Connection Rejected : 401 Unauthorized');
            } 
            else if(response.statusCode === 403){
                error = new Error('Connection Rejected : 403 Forbidden');
            }
            else if(response.statusCode === 500){
                error = new Error('Connection Rejected : 500 Internal server error');
            }
            else if(response.statusCode=== 200 || response.statusCode === 304){
                if(data.length > 0){
                    try{
                        result = JSON.parse(data);
                    }catch(err){
                        error = new Error('Connection Accepted but error JSON :'+err);
                    }
                }
            }else{
                error = new Error('Connection Rejected : Unhandled status code '+response.statusCode+'');
            }
            callback(error, result);
        });
    });
   
        request.end(requestData);
 
};
module.exports = Client;