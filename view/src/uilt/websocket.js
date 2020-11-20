class SocketService {
    static instance = null
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketService('ws://localhost:9998')
        }
        return this.instance
    }
    ws = null
    connect() {
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持WebSocket')
        }
        this.ws = new WebSocket('ws://localhost:9998')
        this.ws.onopen = () => {
            console.log('连接服务器成功了')
        }
        this.ws.onclose = () => {
            console.log('连接服务器失败了')
        }
        this.ws.onmessage = (msg) => {
            console.log('接收到从服务端发来数据', msg)
        }
    }
    send(params){//发送
        this.ws.send(JSON.stringify(params))
    }
}
export default SocketService