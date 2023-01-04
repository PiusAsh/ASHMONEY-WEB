import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  public UserKey: string = 'User Account';

  constructor(
    private accountService: AccountService,
    private toast: NgToastService,
    private route: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // const currentUserId = localStorage.getItem(this.UserKey);
    let routeUserId = route.paramMap.get('id');

    var _user = this.accountService.IsLoggedIn();
    if (_user != '' && _user != undefined && _user != null) {
      let _v = JSON.parse(_user!);
      if (parseInt(routeUserId!) === _v.user.id) {
        return true;
      } else {
        this.toast.error({
          detail: 'Unauthorized User',
          summary: 'Please login to continue',
          duration: 4000,
        });

        this.route.navigateByUrl('/login');
        return false;
      }
    } else {
      this.toast.error({
        detail: "You're not logged in",
        summary: 'Please login to continue',
        duration: 4000,
      });

      this.route.navigate(['login']);
      return false;
    }
  }
}
