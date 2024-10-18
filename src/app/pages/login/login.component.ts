// declaring a global varibale for sign in procedure
declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // router to navigate
  private router = inject(Router);

  // here we are initializing google account
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '252323118235-kmgji04qnkdrmhlmmmrieh86mtih02tk.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handlLogin(resp);
      },
    });
    // we can refer this link to know
    // https://developers.google.com/identity/gsi/web/reference/js-reference

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      size: 'large',
      shape: 'rectangle',
      theme: 'filled_blue',
      width: 350,
    });
  }

  // JWT has header, payload, key
  // decrypt token
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // we are crating a method to decrypt token and get the name and profile img of the login user
  handlLogin(response: any) {
    if (response) {
      //decrypt the token
      const payload = this.decodeToken(response.credential);
      // store  in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      // navigate to home / browse
      this.router.navigate(['browse']);
    }
  }
}
