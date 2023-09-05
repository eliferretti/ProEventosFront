import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  user : any = this.accoutService.currentUser$;

  constructor(public accoutService: AccountService,
              private router: Router) { 
  }

  ngOnInit() {
  }

  logout(): void {
    this.accoutService.logout();
    this.router.navigateByUrl('/user/login');
  }

  showMenu(): boolean {
    return this.router.url != '/user/login';
  }

}
