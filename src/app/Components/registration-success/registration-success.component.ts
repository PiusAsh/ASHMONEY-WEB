import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/Models/registration';
import { ServiceService } from 'src/app/Shared/service.service';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css'],
})
export class RegistrationSuccessComponent implements OnInit {
  user: Registration[] = [];
  // user: Registration[] = [];
  //   {
  //     id: 0,
  //   firstName: 'Ashogbon',
  //   lastName: 'tytyyyy',
  //   email: '',
  //   phoneNo: 0,
  //   country: '',
  //   accountNo: 9876543256,
  //   dateOfBirth: '',
  //   password: 0,
  // }

  constructor(private userService: ServiceService) {}

  ngOnInit(): void {}
}
