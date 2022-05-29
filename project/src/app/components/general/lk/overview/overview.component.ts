import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../common/services/api.service";
import {Note} from "../../../../common/models/note.model";
import {UtilsService} from "../../../../common/services/utils.service";

@Component({
  selector: 'app-manage',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public currentPath: string | null;

  public isLoading = false;
  public note: Note;

  constructor(private route: ActivatedRoute,
              private utilsService: UtilsService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.getNote();
    })

    this.getNote();
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
        },
        (error) => {
          console.error(error);
          this.utilsService.errorMessage();
        }
      ).add(() => this.isLoading = false)
  }

}
