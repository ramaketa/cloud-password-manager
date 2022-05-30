import { Injectable } from '@angular/core';
import {NzNotificationPlacement, NzNotificationService} from "ng-zorro-antd/notification";
import {FormGroup} from "@angular/forms";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  placement: NzNotificationPlacement = 'topRight';

  constructor(private notification: NzNotificationService) {}

  defaultMessage(title: string, message: string): void {
    this.notification.blank(
      title,
      message,
      { nzPlacement: this.placement }
    );
  }
  errorMessage(title: string = 'Извините, что-то пошло не так',
               message: string = 'Попробуйте снова, либо обратитесь в поддержку'): void {
    this.notification.error(
      title,
      message,
      { nzPlacement: this.placement }
    );
  }
  successMessage(title: string, message: string): void {
    this.notification.success(
      title,
      message,
      { nzPlacement: this.placement }
    );
  }

  warningMessage(title: string, message: string): void {
    this.notification.warning(
      title,
      message,
      { nzPlacement: this.placement }
    );
  }

  disableFormControls(form: FormGroup): void {
    for (const key in Object.keys(form.controls)) {
      form.controls[key]?.disable();
    }
  }
  enableFormControls(form: FormGroup): void {
    for (const key in Object.keys(form.controls)) {
      form.controls[key]?.enable();
    }
  }

  generatePassword(): string {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_@#$%^&*()-=+~"
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  encrypt(value : string, secretKey: string) : string{
    return CryptoJS.AES.encrypt(value, secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string, secretKey: string){
    return CryptoJS.AES.decrypt(textToDecrypt, secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
