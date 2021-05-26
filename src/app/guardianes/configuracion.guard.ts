import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracionService } from '../servicios/configuracion.service';

@Injectable()
export class ConfiguracionGuard implements CanActivate {
  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.configuracionServicio.getConfiguracion().pipe(
      map((configuracion) => {
        if (configuracion.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
