import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
/**
 * Browser back button wont let the user to the back page after logout
 */
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return this.router.navigate(['login']); 
    /**remove local stroage  */
    if(localStorage.getItem('loginDetails')){
        return true;
    }
    else{
        alert("You don't have permission to view this page");
        return false;
    } 
  }
}