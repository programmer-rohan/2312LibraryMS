import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.apiService.login(loginInfo).subscribe({
      next: (res) => {
        if (res == 'not found')
          this.snackBar.open('Credential are invalid!', 'OK');
        else if (res == 'unapproved')
          this.snackBar.open('Your account is not Aprooved by Admin!', 'OK');
          else if (res == 'blocked')
          this.snackBar.open('Your account is BLOCKED. Please go to admin office to Unblock.', 'OK');
        else {
          localStorage.setItem('access_token', res);
          this.apiService.userStatus.next("loggedIn");
        }
      },
    });
  }
}
