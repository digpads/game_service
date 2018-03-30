/**
 * Created by shiba on 2018/03/20.
 * Updated by shiba on 2018/03/20.
 */


 const api = (data)=>{

    //测试接口
    data.app.use('/api/test',require('./test'))

    //chat
    const socket_fun = require('./socket/chat');
    socket_fun(data.io);

 }

 module.exports = api