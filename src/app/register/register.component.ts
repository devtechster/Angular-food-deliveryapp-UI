import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../user';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegistered = false;
  registerForm: FormGroup;
  user: User = new User();
  errMessage: string;

  constructor(private authService: AuthServiceService,
    private routerService: RouterService, 
    private userService: UserService) {
    this.errMessage = '';
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  register()
  {
    this.user.email = this.registerForm.get('email').value;
    this.user.password = this.registerForm.get('password').value;
      this.authService.registerUser(this.user).subscribe(
        data => console.log(data),
        error => this.errMessage = error.message
      );
    }
}
