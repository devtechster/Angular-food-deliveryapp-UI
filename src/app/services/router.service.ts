import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    constructor(private router: Router) { }

    goToHomePage() {
        this.router.navigate(['']);
    }
    goToLoginPage() {
        this.router.navigate(['login']);
    }
}