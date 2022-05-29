import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../common/services/auth.service";
import {UtilsService} from "../../../common/services/utils.service";
import {User} from "../../../common/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
  ) {
  }

  user: User;

  ngOnInit(): void {
    this.authForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/lk']);
    }
  }

  login(): void {
    this.isLoading = true;
    this.utilsService.disableFormControls(this.authForm);

    this.authService.login(this.user)
      .subscribe(
        (data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.authService.setToken(data.token);
            // Проверяем, что человек пытался попасть не на главную страницу
            if (this.authService.getUrlBeforeLogin() != null) { // Человек пытался войти не на стандартную страницу
              this.router.navigate([this.authService.getUrlBeforeLogin()]);
            } else { // Перенаправляем на страндартную
              this.router.navigate(['/lk']);
            }
            this.utilsService.successMessage('Успешно вход', 'Вы успешно вошли в систему');
          }
        },
        err => console.log('err', err)
      ).add(() => {
        this.isLoading = false;
      this.utilsService.enableFormControls(this.authForm);
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.authForm.controls) {
      this.authForm.controls[i].markAsDirty();
      this.authForm.controls[i].updateValueAndValidity();
    }
    if (this.authForm.valid) {
      this.user = {
        username: this.authForm.get('username')?.value,
        password: this.authForm.get('password')?.value
      }
      this.login();
    }
  }

}
