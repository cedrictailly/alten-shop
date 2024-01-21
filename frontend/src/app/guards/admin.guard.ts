import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {

  const authService = inject(AuthService);

  if ( authService.logged === null || authService.role == 'admin' )
    return true;

  const router = inject(Router);

  router.navigateByUrl('error/403');

  return false;
}
