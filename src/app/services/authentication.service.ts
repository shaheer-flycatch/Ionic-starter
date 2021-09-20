import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  };

  login(credentials): Observable<any> {
    return this.http.post(`https://dev.support.e-tameen.com/api/v1/authenticate/login/`, credentials).pipe(
 map((data: any) => data.data.access_token),
      switchMap(token =>   from(Storage.set({key: TOKEN_KEY, value: token})) ),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  };
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
