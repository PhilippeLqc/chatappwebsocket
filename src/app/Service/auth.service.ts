import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LogsDto } from "../Model/logsDto";
import { User } from "../Model/user";
import { UserDto } from "../Model/userDto";
import { Observable, of, switchMap } from "rxjs";
import { AuthResponseDto } from "../Model/authResponseDto";
import { UserRegisterDto } from "../Model/userRegisterDto";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
    })


export class AuthService {
    constructor(private http : HttpClient){ }

    serviceURL = 'http://localhost:9000/api/auth';
    userServiceURL = 'http://localhost:9000/api/user';

    connected : boolean = false;
    currentUser : UserDto | null = null;
    private Securitytoken: AuthResponseDto | null = null;

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
                // Get the user by email
                return this.http.get<UserDto>(this.userServiceURL + '/email/' + user.email);
            })
        ).subscribe((user: Object) => {
            // Save the user in the currentUser object
            this.currentUser = user as UserDto;
            console.log("Utilisateur connecté :", this.currentUser);
        });
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