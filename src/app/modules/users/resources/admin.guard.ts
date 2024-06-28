import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/users/resources/auth.service';

export const AdminGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user = authService.getUser();

  if (!user || !user.isAdmin) {
    router.navigate(['/not-authorized']);
    return false;
  }

  return true;
};
