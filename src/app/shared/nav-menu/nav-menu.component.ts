import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  @Input() isLogin: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.change.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });
  }

  logout() {
    this.isLogin = false;
    this.router.navigate(['/login']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
