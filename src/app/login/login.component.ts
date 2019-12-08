import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../user';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegistered = false;
  loginForm: FormGroup;
  user: User = new User();
  errMessage: string;

  constructor(private authService: AuthServiceService,
    private routerService: RouterService, 
    private userService: UserService) {
    this.errMessage = '';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;
    if (!this.isRegistered) {
      this.authService.authenticateUser().subscribe(
        data => {
          const userData = data.find(u => (u.email === this.user.email) && (u.password === this.user.password));
          if (userData) {
            this.authService.setBearerToken(userData.id);
            this.authService.isLoggedIn = true;
            this.userService.user = userData;
            this.routerService.goToHomePage();
          } else {
            this.errMessage = `The user with email ${this.user.email} does not exists in our database. Please register first!`
          }
        }, error => this.errMessage = error.message
      );
      // this.authService.setBearerToken(userData.email);
    } else {
      this.authService.registerUser(this.user).subscribe(
        data => console.log(data),
        error => this.errMessage = error.message
      );
    }
    this.toggleIsRegistered();
  }

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
  }

}
