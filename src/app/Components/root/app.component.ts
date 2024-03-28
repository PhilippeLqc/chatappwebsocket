import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from '../../Service/auth.service';
import { ChatService } from '../../Service/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthentificationComponent, HttpClientModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public auth : AuthService, public chat : ChatService){ }


  title = 'chatappwebsocket';
}
