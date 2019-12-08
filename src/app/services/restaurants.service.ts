import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  apiKey: string;
  apiUrl: string;
  cityCode: number;
  cityName: string;
  restaurant: Restaurant;
  restaurants: Array<Restaurant>;

  constructor(private httpClient: HttpClient) {
    this.apiKey = '057d9923b9032fff7b1f3ba562d2643f';
    this.apiUrl = 'https://developers.zomato.com/api/v2.1';
    this.cityCode = 4;
    this.restaurant = new Restaurant();
    this.restaurants = [];
    this.cityName = 'Bengaluru';
  }

  getCollections() {
    this.httpClient.get<any>(`${this.apiUrl}/search?entity_id=${this.cityCode}&entity_type=city`, {
      headers: new HttpHeaders().set('user-key', this.apiKey)
    }).subscribe(
      data => {
        this.restaurants = [];
        data.restaurants.forEach(
          res => {
            this.restaurant.name = res.restaurant.name;
            this.restaurant.cuisines = res.restaurant.cuisines;
            this.restaurant.featuredImage = res.restaurant.featured_image;
            this.restaurants.push(this.restaurant);
            this.restaurant = new Restaurant();
          }
        );
      },
      error => console.log(error.message)
    );;
  }

  getCityCode(cityName: string) {
    this.httpClient.get(`${this.apiUrl}/cities?q=${cityName}`, {
      headers: new HttpHeaders().set('user-key', this.apiKey)
    }).subscribe(
      data => {
        this.cityCode = data["location_suggestions"][0]["id"];
        this.cityName = data["location_suggestions"][0]["name"]
        this.getCollections();
      },
      error => console.log(error.message)
    );
  }
}
