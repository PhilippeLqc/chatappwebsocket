import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDto } from '../../Model/userDto';
import { User } from '../../Model/user';
import { UserRegisterDto } from '../../Model/userRegisterDto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    public register : AuthService,
    public formBuilder : FormBuilder) { }

public registerForm = this.formBuilder.group({
    username: [''],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
});

onSubmit() {
  let newUser : UserRegisterDto = {
    username: this.registerForm.value.username,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
  }

  this.register.register(newUser);
}

}
