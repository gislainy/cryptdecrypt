var express = require('express');
var app = express();
var path = require('path');
const utils = require('./utils');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/api/crypt-cifra', function(req, res) {
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
        bodyStr = bodyStr.replace(/\n/g,' ');
        bodyStr = bodyStr.replace(/[\\"]/g,' ');
        const ret = utils.deslocamento(bodyStr);
        res.send(JSON.stringify(ret));
    });

});
app.post('/api/crypt-sub', function(req, res) {
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
        bodyStr = bodyStr.replace(/\n/g,' ');
        bodyStr = bodyStr.replace(/[\\"]/g,' ');
        const ret = utils.substituicao(bodyStr);
        res.send(JSON.stringify(ret));
    });
});
app.post('/api/decrypt-sub', function(req, res) {
    // var bodyStr = '';
    // req.on("data",function(chunk){
    //     bodyStr += chunk.toString();
    // });
    // req.on("end",function(){
    //     const ret = utils.converteSub(JSON.parse(bodyStr));
    //     res.send(JSON.stringify(ret));
    // });
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
        bodyStr = bodyStr.replace(/\n/g,' ');
        bodyStr = bodyStr.replace(/[\\"]/g,' ');
        const ret = utils.sub_volta(bodyStr);
        res.send(JSON.stringify(ret));
    });
    console.log('/api/decrypt-sub');
});
app.post('/api/decrypt-cifra', function(req, res) {
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
        bodyStr = bodyStr.replace(/\n/g,' ');
        bodyStr = bodyStr.replace(/[\\"]/g,' ');
        const ret = utils.deslocamento_volta(bodyStr);
        res.send(JSON.stringify(ret));
    });
  
    console.log('/api/decrypt-cifra');
});

app.listen(3000);

