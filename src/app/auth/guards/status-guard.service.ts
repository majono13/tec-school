import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Collaborator } from 'src/app/admin/models/colaborador.model';
import { Snackbar } from 'src/app/shared/components/snackbar.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivateChild {

  user!: Collaborator;

  constructor(private authService: AuthService, private snackbar_: Snackbar) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.getUserStatus()
      .pipe(
        tap((user) => {
          if (!user) this.snackbar_.notify('Você não tem permissão para acessar esta página.')
        })
      );
  }

}
