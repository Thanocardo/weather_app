import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../_handlers/auth';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './users.sign.up.component.html',
  styleUrl: './users.component.css'
})
export class UsersSignUpComponent {

  constructor(private authService: AuthService, private router: Router) {}
  
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator()] ),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)],),
  }, { validators: passwordMatchValidator});

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    }
  }
  
  signUp() {  
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;

      const userEmail = email ?? '';
      const userPassword = password ?? '';

      this.authService.signup(userEmail, userPassword).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/']);
          window.location.reload()
        },
        error: (err) => {
          console.error('Signup failed', err);
        }
      })
    }
  }


}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#!@#%$&^*.?]/.test(password);

    if (!hasLetter) {
      return { mustContain: "*Password must have at least 1 letter"}
    }
    if (!hasNumber) {
      return { mustContain: "*Password must have at least 1 number"}
    }
    if (!hasSpecialCharacter) {
      return { mustContain: "*Password must have at least 1 Special Character (!, @, #, %, $, &, ^, *, ., ?)" }
    }

    return null

  }
}

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsDoNotMatch: 'Passwords do not match.' };
}