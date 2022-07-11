import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole='["Admin", "Moderator"]'
})
export class HasRoleDirective implements OnInit {
  user: User;
  @Input() appHasRole: string[];

  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private accountService: AccountService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
    }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some(r  => this.appHasRole.includes(r))) { // do callback if any element is true
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
