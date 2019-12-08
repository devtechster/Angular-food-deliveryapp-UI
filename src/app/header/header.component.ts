import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { faUserTie, faHeart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private authService: AuthServiceService, private userService: UserService, private restaurantsService: RestaurantsService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchField: new FormControl(null, Validators.required)
    })
    if (this.authService.getBearerToken()) {
      this.authService.isLoggedIn = true;
    }
  }

  onLogout() {
    this.authService.logoutUser();
    this.userService.resetUser();
    this.authService.isLoggedIn = false;
  }

  onSubmit() {
    this.restaurantsService.getCityCode(this.searchForm.get('searchField').value);
  }

}
