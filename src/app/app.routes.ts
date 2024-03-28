import { Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ChatComponent } from './Components/chat/chat.component';

export const routes: Routes = [
    {path: 'authentification', component: AuthentificationComponent},
    {path: 'chat', component: ChatComponent},
    {path: '', redirectTo: '/authentification', pathMatch: 'full'}
];
