'use strict';
const http = require('http'), https = require('https');
function Server(options){
    options = options || {};
    this.authNeeded = false;
    this.protocol = options.protocol || 'http';//Http or https only for now
    this.user = options.user || null;
    this.password = options.password || null;
    this.port = options.port || ((this.protocol==='https')? 8443 : 8080);
    this.agent = (this.protocol === 'https')? https : http;
    if(options && options.hasOwnProperty('user') && (options.hasOwnProperty('password') || options.hasOwnProperty('pass'))) {
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
module.exports = Server;
