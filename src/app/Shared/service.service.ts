import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../Models/registration';


@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  users: Registration[] = [];
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:3000/register';

  getData() {
    return this.http.get<any>(this.apiUrl);
  }

  getAllUsers(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl + '/register');
  }

  getContacts() {
    return this.http.get(this.apiUrl).subscribe((c) => {
      this.users = c as Registration[];
    });
  }
}
