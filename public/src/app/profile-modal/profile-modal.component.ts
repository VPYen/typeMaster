import { HttpService } from "../http.service"
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  selectImg = false;

  @Input() user: any;
  @Output() close = new EventEmitter();

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    // console.log(this.user);
  }

  pickImg() {
    if (this.selectImg == false) {
      this.selectImg = true;
    }else {
      this.selectImg = false;
    }
  }

  closeModal() {
    if (this.user.username != "Guest") {
      let observable = this._httpService.updateFromService(this.user);
      observable.subscribe(data => {
        console.log(data);
      });
    }
    this.close.emit(this.user);
  }

}
