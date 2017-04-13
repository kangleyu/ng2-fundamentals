import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  public currentUser: IUser;

  constructor(private http: Http) {}

  public loginUser(userName: string, password: string) {
    const headers = new Headers({ "Content-type": "application/json" });
    const options = new RequestOptions({ headers });

    const loginInfo = { username: userName, password };
    return this.http.post("http://localhost:8809/api/login", JSON.stringify(loginInfo), options)
      .do((resp) => {
        if(resp) {
          this.currentUser = resp.json().user as IUser;
        }
      }).catch((error) => {
        return Observable.of(false);
      });
  }

  public logout() {
    this.currentUser = undefined;

    const headers = new Headers({ "Content-type": "application/json" });
    const options = new RequestOptions({ headers });

    return this.http.post("http://localhost:8809/api/logout", JSON.stringify({}), options);
  }

  public updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const headers = new Headers({ "Content-type": "application/json" });
    const options = new RequestOptions({ headers });

    return this.http.put(`http://localhost:8809/api/users/${this.currentUser.id}`,
      JSON.stringify(this.currentUser), options);
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  public checkAuthenticationStatus() {
    return this.http.get("http://localhost:8809/api/currentIdentity", this.currentUser)
      .map((response: any) => {
        if (response._body) {
          return response.json();
        } else {
          return {};
        }
      })
      .do((currentUser) => {
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      }).subscribe();
  }
}
