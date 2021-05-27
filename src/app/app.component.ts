import { Component } from '@angular/core';
import { WebSocketAPI } from './websocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greetings: string[];
  name: string;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI();
    this.greetings = [];
  }

  connect() {
    this.webSocketAPI._connect((message)=>{this.greetings.push(message.body) });
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }
}
