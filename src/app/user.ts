import { Restaurant } from './restaurant';

export class User {
    id: number;
    email: string;
    password: string;
    favourites: Array<Restaurant>;

    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.favourites = [];
    }
}