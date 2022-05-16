import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { APIUtilityService } from '../services/APIUtility.service';


@Injectable({ providedIn: 'root' })
/**
 * Browser back button wont let the user to the back page after logout
 */
export class AuthGuard implements CanActivate {
  constructor(public router: Router,private apiUtilityService: APIUtilityService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
      // return this.router.navigate(['login']); 
      /**remove local stroage  */
      // if(localStorage.getItem('loginDetails')){
      //     return true;
      // }
      // else{
      //     alert("You don't have permission to view this page");
      //     return false;
      // } 
      const currentUser = this.apiUtilityService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}