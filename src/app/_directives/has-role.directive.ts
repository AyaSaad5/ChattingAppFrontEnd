import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { user } from '../Models/User';
import { AccountService } from '../Services/account.service';
import { map, take } from 'rxjs';
import { NotExpr } from '@angular/compiler';

@Directive({
  standalone:true,
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
@Input() appHasRole: string[] = []
user: user = {} as user
  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,
              private accountService: AccountService) { 
    this.accountService.currentUser.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user
      }
    })
  }
ngOnInit(): void {
  if(this.user.roles?.some(r => this.appHasRole.includes(r)))
      { 
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
      else
      {
        this.viewContainerRef.clear()
      }
}
}
