import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../common/services/auth.service";

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss']
})
export class LkComponent implements OnInit {

  isCollapsed = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
