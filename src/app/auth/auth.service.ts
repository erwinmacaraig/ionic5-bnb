import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _userIsAuthenticated = true;
    private _userId = 'erwin';

    constructor() {}

    login() {
        this._userIsAuthenticated = true;
    }

    logOut() {
        this._userIsAuthenticated = false;
    }

    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }

    get userId() {
        return this._userId;
    }
}
