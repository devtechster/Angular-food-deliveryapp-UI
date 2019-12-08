import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  favouritesCount: number;

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) {
    this.user = new User();
    this.favouritesCount = 0;
  }

  getUserData() {
    this.httpClient.get<User>(`http://localhost:3000/users/${this.authService.getBearerToken()}`).subscribe(
      data => {
        this.user = data;
        this.favouritesCount = data.favourites.length;
      },
      error => console.log(error.message)
    );
  }

  updateUserData() {
    console.log(this.user);
    this.httpClient.put<User>(`http://localhost:3000/users/${this.user.id}`, this.user).subscribe(
      data => {
        this.user = data;
        this.favouritesCount = data.favourites.length;
      },
      error => console.log(error.message)
    );
  }

  resetUser() {
    this.user = new User();
    this.favouritesCount = 0;
  }
}
