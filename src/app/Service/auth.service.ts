import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LogsDto } from "../Model/logsDto";
import { User } from "../Model/user";
import { UserDto } from "../Model/userDto";
import { Observable, of, switchMap, tap } from "rxjs";
import { AuthResponseDto } from "../Model/authResponseDto";
import { UserRegisterDto } from "../Model/userRegisterDto";
import { ChatService } from "./chat.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
    })


export class AuthService {
    constructor(private http : HttpClient, private chat: ChatService, private router: Router){ 
        this.Securitytoken = {
            token: '',
            refreshToken: ''
        }
    }

    serviceURL = 'http://localhost:8081/api/auth';
    userServiceURL = 'http://localhost:8081/api/user';

    connected : boolean = false;
    currentUser !: UserDto;
    private Securitytoken : AuthResponseDto;

    //convert User to UserDto
    convertUserToUserDto(user: User){
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            taskIds: user.tasks.map(task => task.id),
            projectIds: user.projects.map(project => project.id),
        }
    }

    // register user using UserDto
    register(user: UserRegisterDto) {
            return this.http.post<UserDto>(this.serviceURL + '/register', user);
        }

    // login user using logsDto
    login(user: LogsDto) {
        return this.http.post<AuthResponseDto>(this.serviceURL + '/login', user).pipe(
          switchMap((responseLogin) => {
            // Save the token in the Securitytoken object
            this.Securitytoken = responseLogin;
            this.connected = true;
            this.chat.initConnection();
            this.chat.joinRoom('1100');
            // Get the user by email
            return this.http.get<UserDto>(this.userServiceURL + '/email/' + user.email);
          }),
          tap((user: Object) => {
            // Save the user in the currentUser object
            this.currentUser = user as UserDto;
          }),
          tap(() => {
            if (this.connected) {
              this.router.navigate([`chat/${this.currentUser?.id}`]);
            } else {
                return console.error('email or mdp invalid');
            }
          })
        ).subscribe();
      }

    // refresh token
    refreshToken(refreshToken: string) {
        return this.http.post<AuthResponseDto>(this.serviceURL + '/refresh', { refreshToken }).pipe(
            switchMap((responseLogin) => {
                this.Securitytoken = responseLogin;
                return of(this.Securitytoken);
            })
        );
    }

    getToken(): string {
        return this.Securitytoken?.token || '';
    }

    getRefreshToken(): string {
        return this.Securitytoken?.refreshToken || '';
    }
    
    // if the user is connected, redirect to the chat page of the application
    isConnected(): boolean {
        if (this.Securitytoken != null) {
            this.connected = true
            
            return true;
        } else {
            this.connected = false
            return false;
        }
    
    }
}