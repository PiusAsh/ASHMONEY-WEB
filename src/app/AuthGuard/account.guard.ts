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
import { UrlEncrypt } from '../Helper/encrypt';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  public UserKey: string = 'User Account';
  user: any;
  public keys: string = '1234567890';

  constructor(
    private accountService: AccountService,
    private toast: NgToastService,
    private route: Router,
    public urlEn: UrlEncrypt
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    let routeUserId = route.paramMap.get('id');
    let y = this.urlEn.decrypt(routeUserId);


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

  // canActivate(route: ActivatedRouteSnapshot) {
  //   let routeUserId = route.paramMap.get('id');
  //   let decryptedRouteUserId = this.urlEn.decrypt(routeUserId);
  //   let _user = this.accountService.IsLoggedIn();
  //   if (_user != '' && _user != undefined && _user != null) {
  //     let _v = JSON.parse(_user!);
  //     if (parseInt(decryptedRouteUserId) === _v.user.id) {
  //       return true;
  //     } else {

  //       this.toast.error({
  //         detail: 'Unauthorized User',
  //         summary: 'Please login to continue',
  //         duration: 4000,
  //       });
  //       this.route.navigateByUrl('/login');
  //       return false;
  //     }
  //   } else {
  //     this.toast.error({
  //       detail: "You're not logged in",
  //       summary: 'Please login to continue',
  //       duration: 4000,
  //     });
  //     this.route.navigate(['login']);
  //     return false;
  //   }
  // }

  // canActivate(route: ActivatedRouteSnapshot) {
  //   let routeUserId : any = route.paramMap.get('id');

  //
  //   let decryptedRouteUserId : any = this.urlEn.decrypt(routeUserId);
  //   let currentUser: any = this.accountService.IsLoggedIn();
  //   
  //   if (currentUser && currentUser.user && currentUser.user.id) {
  //     if (parseInt(routeUserId) === currentUser.user.id) {
  //       return true;
  //     } else {
  //       this.toast.error({
  //         detail: 'Unauthorized User',
  //         summary: 'Please login to continue',
  //         duration: 4000,
  //       });
  //       this.route.navigateByUrl('/login');
  //       return false;
  //     }
  //   } else {
  //     this.toast.error({
  //       detail: "You're not logged in",
  //       summary: 'Please login to continue',
  //       duration: 4000,
  //     });
  //     this.route.navigate(['login']);
  //     return false;
  //   }
  // }
}
