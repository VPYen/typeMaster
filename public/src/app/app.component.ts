import { HttpService } from "./http.service"
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginModal = false;
  profModal = false;
  gameStart = false;
  currentUser = {username: "Guest", avatar: "blankProfileWhite.png"};

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.loginModal = false;
    this.profModal = false;
    this.gameStart = false;
    this.currentUser = {username: "Guest", avatar: "blankProfileWhite.png"};
    this.printStatus();
  }

  toggleProfile() {
    if (this.profModal == false) {
      this.profModal = true;
      this.loginModal = false;
      this.gameStart = false;

    }else{
      this.profModal = false;
    }
    this.printStatus();
  }

  toggleLogout() {
    this.currentUser = {username: "Guest", avatar: "blankProfileWhite.png"};
  }

  toggleLogin() {
    if (this.loginModal == false) {
      this.loginModal = true;
      this.profModal = false;
      this.gameStart = false;
    }else {
      this.loginModal = false;
    }
    this.printStatus();
  }

  toggleGame(eventData) {
    this.gameStart = eventData;
    this.profModal = false;
    this.loginModal = false;
    this.printStatus();
  }

  closeFromProfile(eventData) {
    // console.log("event ", eventData);
    this.currentUser = eventData;
    this.profModal = false;
    this.loginModal = false;
    this.printStatus();
  }

  closeFromLogin(eventData) {
    // console.log("event ",eventData);
    this.loginModal = eventData;
    this.profModal = eventData;
    this.printStatus();
  }

  setUserFromLogin(eventData) {
    this.currentUser = eventData;
    // console.log(this.currentUser);
  }

  printStatus() {
    console.log("ProfModal: " + this.profModal + " | LoginModal: " + this.loginModal + " | GameStart: " + this.gameStart);
  }
}
