import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: '', component: CollectionViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuardGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    CollectionViewComponent,
    RestaurantCardComponent,
    HeaderComponent,
    LoginComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
