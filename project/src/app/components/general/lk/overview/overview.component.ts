import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../common/services/api.service";
import {Note} from "../../../../common/models/note.model";
import {UtilsService} from "../../../../common/services/utils.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public currentPath: string | null;

  public isLoading = false;
  public show = false;
  public note: Note;
  public editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private utilsService: UtilsService,
              private fb: FormBuilder,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.getNote();
    })

    this.getNote();


    this.editForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      url: ['', [Validators.minLength(2)]],
      mark: ['', [Validators.minLength(2)]],
    })
  }

  getNote(): void {
    this.currentPath = this.route.snapshot.paramMap.get('id');
    if (this.note?.noteId === Number(this.currentPath)) {
      return;
    }

    this.isLoading = true;

    this.apiService.getNote(Number(this.currentPath))
      .subscribe(
        (data) => {
          this.note = data;

          for (const key of Object.keys(this.editForm.controls)) {
            // @ts-ignore
            this.editForm.controls[key].patchValue(this.note?.[key]);
          }
        },
        (error) => {
          console.error(error);
          this.utilsService.errorMessage();
        }
      ).add(() => this.isLoading = false)
  }

  generatePassword(): void {
    this.editForm.get('password')?.patchValue(
      this.utilsService.generatePassword()
    )
  }

}
