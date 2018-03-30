/**
 * Created by shiba on 2018/03/20.
 * Updated by shiba on 2018/03/20.
 */


 const express = require('express');
 const router = express.Router();
 const app = new express();
 const http = require('http');
 const server = http.createServer(app);
 const cookieParser = require('cookie-parser');
 const bodyParser = require('body-parser');
 const io = require('socket.io')(server);
 const sd = require('silly-datetime');

 const api = require('./service/');

 server.listen(3000,()=>{
     console.log('http success port 3000')
 })

 app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'hlj');

    if(req.method=="OPTIONS"){
        res.send(200);
    }else{
        next()
    }
});

app.use('/public',express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//接口模块
api({
    app:app,
    io:io
});

