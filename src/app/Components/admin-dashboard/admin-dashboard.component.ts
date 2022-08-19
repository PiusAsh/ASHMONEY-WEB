import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/Models/registration';
import { ServiceService } from 'src/app/Shared/service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  user: Registration[] = [];

  constructor(private http: ServiceService) {}
  myDate = Date.now();
  ngOnInit(): void {
    this.http.getData().subscribe((data: any) => {
      this.user = Array.from(Object.keys(data), (k) => data[k]);
    });

    // this.http.getAllUsers().subscribe({
    //   next: (user: Registration[]) => {
    //     this.user = user;
    //   },
    //   error: (response: any) => console.log(response),
    // });

    
  }
}
