import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from '../services/restaurants.service';
import { Restaurant } from '../restaurant';
import { UserService } from '../services/user.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.css']
})
export class CollectionViewComponent implements OnInit {
  restaurant: Restaurant;
  collections: Array<Restaurant>;

  constructor(private restaurantsService: RestaurantsService,
    private userService: UserService,
    private authService: AuthServiceService) {
    this.collections = [];
    this.restaurant = new Restaurant();
  }

  ngOnInit() {
    this.fetchRestaurants();
    this.authService.isAuthenticated().then(authenticated => {
      this.userService.getUserData();
    }, error => console.log(error));
  }

  fetchRestaurants() {
    this.restaurantsService.getCollections();
  }

}
