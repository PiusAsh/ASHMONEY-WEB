import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('This is init method');
  }

  // simpleAlert() {
  //   Swal.fire('Hello world!');
  // }

  // alertWithSuccess() {
  //   Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
  // }

  logout() {
    Swal.fire({
      title: 'Do you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login']);
        // Swal.fire(
        //   'Back to home',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // );
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
