import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../common/services/auth.service";
import {UtilsService} from "../../../common/services/utils.service";
import {User} from "../../../common/models/user.model";
import {ApiService} from "../../../common/services/api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading!: boolean;
  registerForm!: FormGroup;
  show = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private authService: AuthService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/account']);
    }
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.utilsService.warningMessage('Необходимо заполнить обязательные поля', 'Ошибка заполнения');
      return;
    }

    this.utilsService.disableFormControls(this.registerForm);

    this.isLoading = true;
    const user: User = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.apiService.register(user)
      .subscribe(
        (data) => {
          this.utilsService.defaultMessage('Успешная регистрация',
            'Переадресация на страницу входа');
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.utilsService.errorMessage();
        }
      ).add(() => {
      this.utilsService.enableFormControls(this.registerForm);
    })
  }

}
