import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const AuthGuardParent: CanActivateFn =(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean | UrlTree>
   | Promise<boolean | UrlTree>
   | boolean
   | UrlTree=> {
    const  isAuthenticated =inject(AuthService).isAuthenticated();
      return isAuthenticated;
   };

export const AuthGuardChildren: CanActivateChildFn =(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean | UrlTree>
   | Promise<boolean | UrlTree>
   | boolean
   | UrlTree=> {
    const  isAuthenticated =inject(AuthService).isAuthenticated();
      return isAuthenticated;
   };





