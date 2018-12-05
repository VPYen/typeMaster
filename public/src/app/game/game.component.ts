import { HttpService } from "../http.service"
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  length =  "random";
  startGame = false;
  setGame = false;
  gameOver = false;
  currentWord = "";
  receivedWord = "";
  inputWord = "";
  correctCount = 0;
  wrongCount = 0;
  timer = 180;
  wpm = 0;
  accuracy = 0;
  interval;

  @Input() user: any;
  @Output() beginGame = new EventEmitter();

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.length = "random";
    this.setGame = false;
    this.startGame = false;
    this.gameOver = false;
    this.wpm = 0;
    this.accuracy = 0;
    this.wrongCount = 0;
    this.correctCount = 0;
  }

  startToggle() {
    this.currentWord = "";
    this.receivedWord = "";
    this.inputWord = "";
    this.wrongCount = 0;
    this.correctCount = 0;
    this.setGame = false;
    this.startGame = true;
    this.timer = 180;
    this.startTimer();
    this.beginGame.emit(true);
  }

  initGame() {
    if(this.startGame == false) {
      this.startToggle();
    }else {
      if(this.inputWord == this.currentWord) {
        this.correctCount++;
      }else {
        this.wrongCount++;
      }
      this.inputWord = "";
    }
    // No observable used
    if (this.receivedWord == "") {
      this.currentWord = this.receivedWord = this._httpService.getWord(this.length);
    }else {
      this.receivedWord = this._httpService.getWord(this.length);
      if (this.receivedWord == this.currentWord) {
        this.initGame();
      }else {
        this.currentWord = this.receivedWord;
      }
    }
    // Observable used
    // let observable = this._httpService.getWord(this.length);
    // observable.subscribe(data => {
    //   console.log(data);
    //   if (this.receivedWord == "") {
    //     this.currentWord = this.receivedWord = data;
    //   } else {
    //     this.receivedWord = data;
    //     if(this.receivedWord == this.currentWord) {
    //       this.initGame();
    //     }else {
    //       this.currentWord = this.receivedWord;
    //     }
    //   }
    // })
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
      }else {
        this.endGame();
        this.timer = 180;
      }
    }, 1000)
  }

  endGame() {
    var total = this.correctCount + this.wrongCount;
    this.accuracy = this.correctCount / total;
    this.wpm = Math.ceil(total / 3);
    this.startGame = false;
    this.setGame = false;
    this.beginGame.emit(false);
    this.gameOver = true;
    if(this.user.username.toUpperCase() !== "GUEST") {
      if(this.length == "random") {
        console.log("endgame went to update")
        if (this.user.wpm > 0) {
          this.user.wpm = Math.ceil((this.user.wpm + this.wpm) / 2);
          console.log("endgame went to user wpm")
        }else {
          this.user.wpm = this.wpm;
          console.log("endgame went to user wpm")
        }
        if (this.user.accuracy > 0) {
          this.user.accuracy = (this.accuracy + this.user.accuracy) / 2;
          console.log("endgame went to user accuracy")
        }else {
          this.user.accuracy = this.accuracy;
          console.log("endgame went to user accuracy")
        }
        let observable = this._httpService.updateFromService(this.user);
        observable.subscribe(data => {
          console.log(data);
        });
      }
    }
  }

  reset() {
    this.startGame = false;
    this.setGame = false;
    this.gameOver = false;
    this.beginGame.emit(false);
  }

  gameSettings() {
    this.setGame = true;
  }

}
