import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import store from '@/store/index'

class MyWebSock {
    url =   process.env.VUE_APP_API + '/club_websocket'

    constructor() {
        this.stompClient = ''

        this.connection()
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
            try {
               this.stompClient.send('heartbeat')
            } catch (err) {
                console.log('websocket 失去连接: ' + err)
                this.connection()
            }
        }, 5000)
    }

    // 连接 后台
    connection() {
        // 建立连接对象
        const socket = new SockJS(this.url)
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket)
        this.stompClient.debug = null
        // 定义客户端的认证信息,按需求配置
        const user = store.state.user.user;
        const headers = {
            Authorization: localStorage.getItem("token") || ""
        }
        // 向服务器发起websocket连接
        this.stompClient.connect(headers, () => {
                this.stompClient.subscribe('/topic/sysMsg', this.subSysMsg, headers)
                if (user) {
                    // 监听用户消息
                    this.stompClient.subscribe(`/user/${user.userId}/sysMsg`, this.subUserMsg, headers)
                }
            },
            err => {
                // 连接发生错误时的处理函数
                console.log('失败')
                console.log(err)
            }
        )
    }

    // 断开连接
    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect()
        }
        clearInterval(this.timer)
    }

    // 监听系统消息
    subSysMsg(msg) {
        const body = JSON.parse(msg.body)
    }

    // 监听用户消息
    subUserMsg(msg) {
    }
}

export default MyWebSock
