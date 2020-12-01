import {Component} from '@angular/core';
import {Role} from './core/auth/role.model';
import {CurrentUserService} from './core/auth/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'doctor-map-app';
  Role = Role;
  readonly user$ = this.currentUserService.user$;

  constructor(
    private readonly currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {}

  handleLogoutClick(): void {
    this.currentUserService.logout().subscribe(
      () => {
        window.location.reload();
      },
      (error) => console.error(error)
    );
  }

}
