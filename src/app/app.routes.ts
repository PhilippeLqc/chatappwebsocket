import { Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ChatComponent } from './Components/chat/chat.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {path: 'authentification', component: AuthentificationComponent},
    {path: 'home', component: HomeComponent},
    {path: 'chat/:userIdchat', component: ChatComponent},
    {path: 'chat/:roomId', component: ChatComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
