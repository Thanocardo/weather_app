import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../_handlers/auth';


@Component({
    selector: 'app-users',
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule],
    templateUrl: './users.login.component.html',
    styleUrl: './users.component.css'
  })
export class UsersLoginComponent {
    constructor(private authService: AuthService, private router: Router) {}

    invalidCretedtials: boolean = false

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/'])
        }
      }
  
    login() {
        const { email, password } = this.loginForm.value;

        const userEmail = email ?? '';
        const userPassword = password ?? '';
        
        this.authService.login(userEmail, userPassword).subscribe({
            next: (response) => {
              console.log('Login successful', response);
              this.router.navigate(['/']);
              window.location.reload()
            },
            error: (err) => {
              console.error('Login failed', err);
              this.invalidCretedtials = true
            }
          })
    }
  }