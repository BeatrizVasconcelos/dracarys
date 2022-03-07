import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  routeURL: string;
  usuarioAutenticado: boolean = false;

  constructor(private router: Router) { 
    this.routeURL = this.router.url;
  }

  fazerLogin(user: User){
    if(user.email === "beatriz@gmail.com" && user.password === "123456") {
      this.usuarioAutenticado = true;
      this.router.navigate(['/list'])
    } else {
      this.usuarioAutenticado = false;
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(!this.usuarioAutenticado && this.routeURL !== '/login') {
        this.router.navigate(['/login'], {
          queryParams: {
            return: 'login'
          }
        });
        return resolve(false);
      } else {
        this.routeURL = this.router.url;
        return resolve(true);
      }
    })
  }
}
