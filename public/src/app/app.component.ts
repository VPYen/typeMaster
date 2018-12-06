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

  closeFromProfile(eventData) {
    console.log(eventData);
    this.profModal = eventData;
  }

  closeFromLogin(eventData) {
    console.log(eventData);
    this.loginModal = eventData;
  }
}
