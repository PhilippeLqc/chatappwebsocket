
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: WebSocket;

  constructor() { }

  connect(url: string): Observable<WebSocket> {
    return new Observable((subscriber) => {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
        subscriber.next(this.socket); // Émet l'instance de WebSocket
        subscriber.complete();
      };
  
      this.socket.onerror = (err) => {
        console.error('WebSocket error during connection:', err);
        subscriber.error(err);
      };
  
      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed', event);
      };
    });
  }
}