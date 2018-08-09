import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as firebase from "firebase";

import {AuthService} from "../../../../shared/services/auth.service";


@Component({
  selector: 'ek-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  data: Date = new Date();
  user: firebase.User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.user = this.authService.getCurrentUser();// JSON.parse(window.localStorage.getItem('user'));

  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
