import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../common/services/api.service";
import {Note} from "../../../../common/models/note.model";
import {UtilsService} from "../../../../common/services/utils.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import * as crypto from 'crypto-js';

@Component({
  selector: 'app-manage',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public currentPath: string | null;

  public isLoading = false;
  public isVisible = false;
  public isVisibleEdit = false;
  public isVisibleDelete = false;
  public isEdit = false;
  public show = false;
  public showEdit = false;
  public showMaster = false;
  public note: Note;
  public editForm: FormGroup;

  decrPass: string;

  public masterPassword: string;

  constructor(private route: ActivatedRoute,
              private utilsService: UtilsService,
              private fb: FormBuilder,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.getNote();
    })

    this.getNote();


    this.editForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      masterPassword: ['', [Validators.required, Validators.minLength(2)]],
      url: ['', [Validators.minLength(2)]],
      mark: ['', [Validators.minLength(2)]],
    })
    this.editForm.get('password')?.disable();
  }

  getNote(): void {
    this.currentPath = this.route.snapshot.paramMap.get('id');
    if (this.currentPath?.includes('create')) {
      return;
    }

    if (this.note?.noteId === Number(this.currentPath)) {
      return;
    }

    this.isLoading = true;

    this.apiService.getNote(Number(this.currentPath))
      .subscribe(
        (data) => {
          this.note = data;
          this.decrPass = data.password;

          for (const key of Object.keys(this.editForm.controls)) {
            // @ts-ignore
            this.editForm.controls[key].patchValue(this.note?.[key]);
          }
        },
        (error) => {
          console.error(error);
          // this.utilsService.errorMessage();
        }
      ).add(() => this.isLoading = false)
  }

  generatePassword(): void {
    if (!this.isEdit) {
      return;
    }
    this.editForm.get('password')?.patchValue(
      this.utilsService.generatePassword()
    )
  }

  showPassword(isEdit = false): void {
    if (this.show || (isEdit && this.showEdit)) {
      this.handleCancel(isEdit);
      return;
    }
    this.isEdit = isEdit;
    this.isVisible = true;
  }

  handleCancel(isEdit = false): void {
    this.isVisible = false;
    this.show = false;
    if (isEdit) {
      this.showEdit = false;
      this.isEdit = false;
      this.editForm.get('password')?.disable();
    } else {
      this.editForm.get('password')?.patchValue(this.note.password);
    }
    this.masterPassword = '';

    if (!this.isEdit) {
      this.decrPass = this.note.password;
    }
  }

  handleOk(): void {
    if (this.masterPassword) {
      const password = this.utilsService.decrypt(this.note.password, this.masterPassword);

      if (password) {
        if (!this.isEdit) {
          this.decrPass = password;
          this.show = true;
        }

        if (this.isEdit) {
          this.showEdit = true;
          this.editForm.get('password')?.patchValue(password);
          this.editForm.get('password')?.enable();
        }

        this.isVisible = false;
        return;
      }
      this.utilsService.warningMessage('Введен неверный мастер пароль', 'Попробуйте снова');
    }
  }

  onEditCancel(): void {
    this.isVisibleEdit = false;
    this.isEdit = false;
    this.showEdit = false;
    this.masterPassword = '';

    for (const key of Object.keys(this.editForm.controls)) {
      // @ts-ignore
      this.editForm.controls[key].patchValue(this.note?.[key]);
    }
    this.editForm.controls['masterPassword'].patchValue('');

  }
  onEditOk(): void {
    this.isLoading = true;

    const password = this.editForm.controls['password'].value;
    const masterPassword = this.editForm.controls['masterPassword'].value;

    const note: Note = {
      noteId: this.note.noteId,
      password: this.showEdit ? this.utilsService.encrypt(password, masterPassword) : this.note.password,
      login: this.editForm.get('login')?.value,
      url: this.editForm.get('url')?.value,
      mark: this.editForm.get('mark')?.value,
    }

    this.utilsService.disableFormControls(this.editForm);

    this.apiService.updateNote(note)
      .subscribe(
        (data) => {
          this.note = data;
          this.utilsService.successMessage('Данные успешно обновлены', 'Успешно')
        },
        (error) => {
          console.error(error);
          this.utilsService.errorMessage()
        }
      ).add(() => {
        this.isLoading = false;
        this.utilsService.enableFormControls(this.editForm);
        this.onEditCancel();
    })
  }

  confirmDelete(): void {
    this.isLoading = true;

    this.apiService.deleteNote(this.note?.noteId)
      .subscribe(
        (data) => {
          this.utilsService.successMessage('Запись успешно удалена!', 'Успешно!')
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            })
          }, 2000)
        },
        (error) => {
          this.utilsService.errorMessage();
          console.error(error);
        }
      ).add(() => {
        this.isLoading = false;
    })
  }

}
