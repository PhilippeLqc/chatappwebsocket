import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterDto } from '../../Model/userRegisterDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

constructor(
  public auth : AuthService,
  public formBuilder : FormBuilder) { 
    merge(this.email.statusChanges, this.email.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMail());
  }

username = new FormControl("", Validators.required);
email = new FormControl("", [Validators.required, Validators.email]);
password = new FormControl("", Validators.required);
errorMessage = '';
hide = true;

updateErrorMail() {
  if (this.email.hasError('required')) {
    this.errorMessage = 'You must enter a value';
  } else if (this.email.hasError('email')) {
    this.errorMessage = 'Not a valid email';
  } else {
    this.errorMessage = '';
  }
}

public registerForm = this.formBuilder.group({
    username: [""],
    email: ["", [Validators.required]],
    password: ["", [Validators.required]]
});

onSubmit() {
  let user : UserRegisterDto = {
    username: this.registerForm.value.username,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
  }

  this.auth.register(user);
}

}
