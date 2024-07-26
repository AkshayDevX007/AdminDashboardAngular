import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: HttpService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Value', this.loginForm.value);
      const data = this.loginForm.value;

      this.dataService
        .login('auth/local', {
          username: data.email,
          password: data.password,
        })
        .subscribe({
          next: (v) => {
            localStorage.setItem(
              'sessionId',
              JSON.stringify(v.data.session_id)
            );
            this.cookieService.set('authToken', v.data.token, 1);
            this.toastr.success('login succesfull');
            this.router.navigate(["/"])
          },
          error: (e) => this.toastr.error('invalid credentials'),
        });
    }
  }
}
