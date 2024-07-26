import { Component } from '@angular/core';
import { HttpService } from '../../http.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private dataService: HttpService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  logout() {
    const sessionId = localStorage.getItem('sessionId');
    this.dataService.logout(sessionId || '').subscribe({
      next: (v) => {
        this.cookieService.delete('authToken');
        localStorage.removeItem('sessionId');
        this.toastr.success("logged out")
      },
      error: (e) => console.log(e)
    });
  }
}
