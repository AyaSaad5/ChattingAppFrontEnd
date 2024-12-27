import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const toastr = inject(ToastrService)
  return accountService.currentUser.pipe(
    map((user: any) => {
      if(!user) return false;
      if(user.roles.includes('Admin') || user.roles.includes('Moderator'))
        return true;
      else
      {
        toastr.error("you can't enter this area")

        return false
      }

    })
  );
};