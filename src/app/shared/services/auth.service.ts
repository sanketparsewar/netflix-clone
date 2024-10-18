declare var google:any;

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
router=inject(Router)
  constructor() { }
  signOut(){
    // this is for sign out
    // https://developers.google.com/identity/gsi/web/reference/js-reference
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
  }
}
