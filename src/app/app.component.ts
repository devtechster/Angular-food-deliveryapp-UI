import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service';
import { AuthServiceService } from './services/auth-service.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
