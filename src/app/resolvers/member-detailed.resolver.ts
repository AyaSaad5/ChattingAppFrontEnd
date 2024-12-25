import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MembersService } from '../Services/members.service';
import { Member } from '../Models/member';

export const memberDetailedResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MembersService);

  return memberService.getMember(route.paramMap.get('username')!);
};
