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

    errorMessage: string;

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
              console.log(err)

              if (err.status === 400) {
                this.errorMessage = err.error.message?.[0] || "An error occurred during login";
              } else {
                this.errorMessage = 'An unexpected error occurred';
              }
            }
          })
    }
  }