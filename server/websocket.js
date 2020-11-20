//npm i ws -s
const WebSocket = require('ws')
//创建WebSocket服务器对象，绑定端口9998
const wss = new WebSocket.Server({
    port: 9998
})
module.exports.listen = () => {
    //对客户端的连接事件进行监听
    wss.on('connection', client => {//client代表客户端的连接socket对象
        console.log('有客户端连接成功了...')
        //对客户端的连接对象进行message事件监听
        client.on('message', msg => {
            console.log('客户端发送数据给服务端了:' + msg)
            // //由服务端向客户端发送数据
            // client.send(msg)
            wss.clients.forEach(client => {
                client.send(msg)//全部客户端更新
            })
        })
    })
}