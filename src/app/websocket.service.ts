import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocketEndPoint: string = 'http://localhost:8080/ws';
    stompClient: CompatClient;
    constructor(private http : HttpClient){
    }
    
    _connect(key:string, fonction : (message : any)=>void) {
      
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(`/topic/${key}`, fonction);
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
    _send(message : any) {
        this.stompClient.send("/app/ecrire", {}, JSON.stringify(message));
    }

    generateKey() {
        return this.http.get("http://localhost:8080/coupure/generate",{responseType:'text'});
    }
}
