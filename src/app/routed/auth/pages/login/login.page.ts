import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../../../core/auth/current-user.service';
import {Router} from '@angular/router';

interface LoginFormData {
  email: string,
  password: string
}

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass']
})
export class LoginPage implements OnInit {
  error = false;
  isLoading: boolean = false;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  handleFormSubmit(value: LoginFormData): void {
    this.error = false;
    this.isLoading = true;
    this.currentUserService
      .login(value.email, value.password)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error', error);
          this.error = true;
        }
      );
  }
}
