/**
 * Created by shiba on 2018/03/21.
 * Updated by shiba on 2018/03/21.
 */

const { param } = require('../../../common');

const socket_fun = (io)=>{
        let roomInfo = {};let onlines = {};
        io.on('connection', function(socket) {
            let url = socket.request.headers.referer;
            let roomID = param(url).room;
            let user = "",onUser = {};

            
            socket.on('join', function(userName){
                enter_on(userName);
            });
        
            socket.on('leave', function () {console.log("leave:",roomID,user)
                leave_out();
            });
        
            socket.on('message',function(msg){
                if (roomInfo[roomID]==undefined || roomInfo[roomID].indexOf(user) === -1) {  
                    return false;
                }

                let data = {
                    userInfo:{user:user,msg:msg},
                    online:onlines[roomID]
                }
                io.to(roomID).emit('data',data);
            });
            
            socket.on("private",(msg)=>{//私聊
                console.log("private:",msg)
                io.to(msg.id).emit('data',msg.msg)
            })

            
            socket.on("disconnect",()=>{//监听状态
                setTimeout(() => {
                    user!=""?leave_out():null;
                }, 15*1000);
            })
            
            let enter_on = (userName)=>{//上线
                user = userName;

                onUser = {id:socket.id,name:userName};
            
                if (!roomInfo[roomID]) {
                  roomInfo[roomID] = [];
                  onlines[roomID] = [];
                }

                roomInfo[roomID].push(user);
                onlines[roomID].push(onUser);
            
                socket.join(roomID);   
                
                io.to(roomID).emit('sys', user + '加入了房间');  
                //io.to(roomID).emit('sys', user + '加入了房间', roomInfo.roomID);  
                
                io.to(roomID).emit('online',onlines[roomID] );

                console.log('+ ' + user + ' 加入了 ' + roomID);
                console.log(roomID+" 房间内共有"+roomInfo[roomID].length+"人,分别是",roomInfo[roomID])
                console.log("roomInfo_join:",roomInfo)
                console.log("onlines:",onlines)
            }

            let leave_out = ()=>{//离线
                let index = roomInfo[roomID].indexOf(user);
                    if (index !== -1) {
                      roomInfo[roomID].splice(index, 1);
                      onlines[roomID].splice(index,1);
                    }
                
                    socket.leave(roomID);    
            
                    io.to(roomID).emit('sys', user + '退出了房间');
                    //io.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
            
                    console.log('- ' + user + ' 退出了 ' + roomID);
                    console.log(roomID+" 房间内共有"+roomInfo[roomID].length+"人,分别是",roomInfo[roomID])
                    console.log("roomInfo_leave:",roomInfo)
                    console.log("onlines:",onlines)
            }

        });

        
      }


      module.exports = socket_fun

