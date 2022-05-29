import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public currentPath: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentPath = this.route.snapshot.paramMap.get('id');
  }

}
