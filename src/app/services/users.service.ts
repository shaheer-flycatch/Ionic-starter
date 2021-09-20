import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users = [];
  constructor(private http: HttpClient) { }
 fetchUsers(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  };
}
