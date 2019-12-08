import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../user';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: Restaurant;
  isFav : boolean = false;

  constructor(private authService: AuthServiceService, private routerService: RouterService, private userService: UserService) { }

  ngOnInit() {
    this.getFavourites();
  }

  addToFavourites() {
    this.authService.isAuthenticated().then(authenticated => {
      if (this.userService.user.favourites.findIndex((res: Restaurant) => res.name === this.restaurant.name) === -1) {
        this.userService.user.favourites.push(this.restaurant);
        this.userService.updateUserData();
        this.getFavourites();
      } else {
        this.userService.user.favourites.splice(
          this.userService.user.favourites.findIndex((res: Restaurant) => res.name === this.restaurant.name), 1);
        this.userService.updateUserData();
        this.getFavourites();
      }
    }, reject => this.routerService.goToLoginPage()); 
  }


  getFavourites() 
  {
    if (this.userService.user.favourites.findIndex((res: Restaurant) => res.name === this.restaurant.name) !== -1) 
    {
      this.isFav = true;

    }
    else
    {
      this.isFav = false;
    }
  }

}
