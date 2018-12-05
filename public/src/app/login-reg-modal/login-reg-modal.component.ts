import { HttpService } from "../http.service"
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-login-reg-modal',
  templateUrl: './login-reg-modal.component.html',
  styleUrls: ['./login-reg-modal.component.css']
})
export class LoginRegModalComponent implements OnInit {
  login = true;
  register = false;
  errors = {};
  formLogin = {username: "", password: ""};
  formReg = {username: "", password: "", passwordConfirm: ""};

  @Output() close = new EventEmitter();
  @Output() user = new EventEmitter();

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.loginToggle();
    this.formLogin = {username: "", password: ""};
    this.formReg = {username: "", password: "", passwordConfirm: ""};
  }

  closeModal() {
    this.close.emit(false);
  }

  registerToggle() {
    this.login = false;
    this.register = true;
  }

  loginToggle() {
    this.register = false;
    this.login = true;
  }

  submitReg() {
    this.errors = {};
    if(this.formReg.username.toUpperCase() === "GUEST") {
      this.errors = {errorUser: "Cannot use 'Guest' as a username"};
    }else {
      let observable = this._httpService.registerFromService(this.formReg);
      observable.subscribe(data => {
        console.log(data);
        if(data['error'] || data['errorPass'] || data['errorConfirm']) {
          this.errors = data;
        } else {
          this.user.emit(data['user']);
          this.closeModal();
          this.formReg = {username: "", password: "", passwordConfirm: ""};
        }
      })
    }
  }

  submitLogin() {
    this.errors = {};
    let observable = this._httpService.loginFromService(this.formLogin);
    observable.subscribe(data => {
      if(data['error']) {
        console.log(data);
        this.errors = data;
      }else {
        this.user.emit(data['user']);
        this.closeModal();
        this.formLogin = {username: "", password: ""};
      }
    })
  }

}
