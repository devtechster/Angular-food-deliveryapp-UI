import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private userService : UserService, 
    private authService : AuthServiceService ) 
  {
    this.authService.isAuthenticated().then(authenticated => {
      this.userService.getUserData();
    }, error => console.log(error));
  }

  ngOnInit() {
  }
}
