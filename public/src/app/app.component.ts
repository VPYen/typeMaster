import { HttpService } from "./http.service"
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profModal = false;
  loginModal = true;
  gameStart = false;
  currentUser = {username: "Guest", avatar: "blankProfileWhite.png"};

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.profModal = false;
    this.loginModal = true;
  }

  toggleProfile() {
    if(this.profModal == false) {
      this.profModal = true;
      this.loginModal = false;
    }else {
      this.profModal = false;
    }
  }

  toggleLogin() {
    if(this.loginModal == false) {
      this.profModal = false;
      this.loginModal = true;
    }else {
      this.loginModal = false;
    }
  }

  closeFromProfile(eventData) {
    console.log(eventData);
    this.currentUser = eventData;
  }

  closeFromLogin(eventData) {
    console.log(eventData);
    this.loginModal = eventData;
  }
}
