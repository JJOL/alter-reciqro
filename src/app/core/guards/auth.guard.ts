import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
/**
 * Determinates if the current user is logged
 */
export class AuthGuard implements CanActivate {
  // eslint-disable-next-line require-jsdoc
  constructor(private authService: AuthService, private router: Router){}
  // eslint-disable-next-line require-jsdoc
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermit(next);
  }
  /**
   * USID: M4NC2 
   * Returns flag if the user is logged
   * @returns Promise
   */
  async hasPermit(route:ActivatedRouteSnapshot):Promise<boolean>{
    let user = await this.authService.getCurrentUser();
    let routeRoles = [];
    let userRoles = [];
    let data = route.data;
    let hasPrivilege = false;
    if(user && data){
      userRoles = user.roles;
      routeRoles=data.roles;
      hasPrivilege = routeRoles.some(r=> userRoles.includes(r))
    }

    if( user && hasPrivilege ) { return true; }
    this.router.navigate(['/user/login']);
    return false;
  }
}
