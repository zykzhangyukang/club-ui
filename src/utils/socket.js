import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import store from '@/store/index';
import {getToken} from "@/utils/token";

class MyWebSock {
    url = process.env.VUE_APP_API + '/club_websocket';

    constructor() {
        this.stompClient = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10; // 您可以根据需要调整这个数字
        this.timer = null;
        this.reconnectTimer = null;

        this.connect();
    }

    connect() {
        console.log('正在尝试连接 WebSocket...');
        const socket = new SockJS(this.url);
        this.stompClient = Stomp.over(socket);
        this.stompClient.debug = null;

        const headers = {
            Authorization: getToken()
        };

        this.stompClient.connect(headers, () => {
                this.reconnectAttempts = 0;
                console.log('WebSocket 连接成功');
                store.commit('user/setIsOnline', true);
                this.subscribeToTopics();

                // 重置心跳定时器
                this.startHeartbeat();
            },
            err => {
                console.log('WebSocket 连接失败', err);
                store.commit('user/setIsOnline', false);
                this.handleReconnect();
            }
        );
    }

    startHeartbeat() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.sendHeartbeat();
        }, 10000);
    }

    sendHeartbeat() {
        try {
            this.stompClient.send('heartbeat');
        } catch (err) {
            console.log('WebSocket 连接丢失: ' + err);
            store.commit('user/setIsOnline', false);
            this.handleReconnect();
        }
    }

    handleReconnect() {
        if (this.timer) clearInterval(this.timer);
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            const backoffTime = this.getFibonacciBackoffTime(this.reconnectAttempts) * 1000; // 斐波那契退避
            console.log(`将在 ${backoffTime / 1000} 秒后重连...`);
            this.reconnectTimer = setTimeout(() => {
                this.connect();
            }, backoffTime);
            this.reconnectAttempts += 1;
        } else {
            store.commit('user/setIsOnline', false);
            console.log('达到最大重连次数。放弃重连。');
        }
    }

    getFibonacciBackoffTime(attempt) {
        if (attempt <= 1) return attempt;
        let a = 0, b = 1, temp;
        for (let i = 2; i <= attempt; i++) {
            temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }

    subscribeToTopics() {
        const headers = {
            Authorization: getToken()
        };

        this.stompClient.subscribe('/topic/sysMsg', this.subSysMsg, headers);

        const user = store.state.user.info;
        if (user) {
            this.stompClient.subscribe(`/user/${user.userId}/sysMsg`, this.subUserMsg, headers);
        }
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        if (this.timer) clearInterval(this.timer);
        if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
        store.commit('user/setIsOnline', false);
    }

    subSysMsg(msg) {
        // 处理系统消息
    }

    subUserMsg(msg) {
        const body = JSON.parse(msg.body);
        store.commit('notification/ADD_MSG', body);
    }
}

export default MyWebSock;
