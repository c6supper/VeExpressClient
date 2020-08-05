import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {QAuthService} from 'galaxy';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class VeExpressAuthGuard implements CanActivate {

	constructor(private authService: QAuthService, private router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isAuthenticated()
			.pipe(
				tap(authenticated => {
					if (!authenticated) {
						this.router.navigate(['auth/login']);
					}
				}),
			);
	}
}
