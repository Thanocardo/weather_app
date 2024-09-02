import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthService } from './_handlers/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logged =  this.authService.isAuthenticated(); 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.logged = this.authService.isAuthenticated()
  }
  
  logout() {
    this.authService.logout()
    this.logged = this.authService.isAuthenticated()
  }
}