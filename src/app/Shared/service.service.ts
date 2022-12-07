import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../Models/registration';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  
  constructor(private http: HttpClient) {}

  baseApiUrl: string = 'https://localhost:44362/api/';

  getData() {
    return this.http.get<any>(this.baseApiUrl);
  }

  getAllUsers(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.baseApiUrl + 'User/GetAllUsers');
  }

  login(user: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.baseApiUrl + 'User/Login', user);
  }

  register(user: Registration) {
    return this.http.post(`${this.baseApiUrl}User/Register`, user);
  }

  // getContacts() {
  //   return this.http.get(this.baseApiUrl).subscribe((c) => {
  //     this.users = c as Registration[];
  //   });
  // }
}
