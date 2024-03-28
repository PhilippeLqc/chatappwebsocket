import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "../Model/userDto";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
    })

export class UserService {
    constructor(private http : HttpClient, public token : AuthService){ }
}
