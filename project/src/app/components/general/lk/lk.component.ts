import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../common/services/auth.service";
import {ApiService} from "../../../common/services/api.service";
import {Note} from "../../../common/models/note.model";
import {UtilsService} from "../../../common/services/utils.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss']
})
export class LkComponent implements OnInit {

  isCollapsed = false;
  isVisible = false;
  isLoading = false;
  show = false;

  createForm: FormGroup;

  noteList: Note[];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private utilsService: UtilsService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getAllNotes();

    this.createForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      url: ['', [Validators.minLength(2)]],
      mark: ['', [Validators.minLength(2)]],
    })
  }

  getAllNotes(): void {
    this.isLoading = true;


    this.apiService.getNoteList()
      .subscribe(
        (data) => this.noteList = data,
        (error) => this.utilsService.errorMessage(),
      ).add(() => this.isLoading = false)
  }

  create(note: Note): void {
    this.isLoading = true;
    this.utilsService.disableFormControls(this.createForm);


    this.apiService.createNote(note)
      .subscribe(
        () => {
          this.getAllNotes();
          this.utilsService.successMessage('Запись успешно добавлена', 'Успешно');
        },
        (error) => {
          console.error(error)
          this.utilsService.errorMessage();
        }
      ).add(() => {
      this.isLoading = false;
      this.isVisible = false;
      this.utilsService.enableFormControls(this.createForm);
    })
  }

  handleCancel(): void {
    this.isVisible = !this.isVisible;

    for (const key of Object.keys(this.createForm.controls)) {
      this.createForm.controls[key].patchValue('');
    }
  }

  handleOk(): void {
    if (!this.createForm.valid) {
      this.utilsService.warningMessage('Необходимо заполнить обязательные поля', 'Ошибка заполнения');
      return;
    }

    const note: Note = {
      password: this.createForm.controls['password'].value,
      login: this.createForm.controls['login'].value,
      url: this.createForm.controls['url'].value,
      mark: this.createForm.controls['mark'].value
    }

    this.create(note);
  }

  generatePassword(): void {
    this.createForm.get('password')?.patchValue(
      this.utilsService.generatePassword()
    )
  }

  logout(): void {
    this.authService.logout();
  }

}
