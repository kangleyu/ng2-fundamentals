import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: Http) {}

  loginUser(userName: string, password: string) {
    let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 

    let loginInfo = { username: userName, password: password };
    return this.http.post('http://localhost:8809/api/login', JSON.stringify(loginInfo), options)
      .do(resp => {
        if(resp) {
          console.log("logged in for user - " + resp.json().user.userName);
          this.currentUser = <IUser>resp.json().user;
        }
      }).catch(error => {
        return Observable.of(false);
      })
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 

    return this.http.put(`http://localhost:8809/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    return this.http.get('http://localhost:8809/api/currentIdentity', this.currentUser)
      .map((response: any) => {
        if (response._body) {
          return response.json();
        } else {
          return {}
        }
      })
      .do(currentUser => {
        console.log("got current user = " + currentUser.userName);
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      }).subscribe();
  }
}