import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    constructor(){
    }
    
    _connect(fonction : (message : any)=>void) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, fonction);
            //_this.stompClient.reconnect_delay = 2000;
        });
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

 /**
  * Send message to sever via web socket
  * @param {*} message
  */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived: any;
}
