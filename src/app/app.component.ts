import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';
  greetings: string[];
  name: string;
  key: string;
  keyToConnect:string;
  content: string;

  isConnected : boolean = false;

  constructor(private websocketService : WebsocketService){
  }

  ngOnInit() {
    this.greetings = [];
  }

  connect() {
    this.websocketService._connect(this.keyToConnect,(message)=>{this.greetings.push(message.body) });
    this.isConnected = true;
  }

  disconnect() {
    this.websocketService._disconnect();
    this.isConnected = false;
  }

  sendMessage() {
    this.websocketService._send({
      content: this.content,
      login:this.name,
      key: this.keyToConnect
    });
    this.content = "";
  }

  generateKey(){
    this.websocketService.generateKey().subscribe({
      next: (key) => {this.key = key}
    });
  }
}
