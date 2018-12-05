import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}

  // For use with API
  // getWord(length: String) {
  //   var random = Math.floor(Math.random()*2);
  //   var speech = "";
  //   if(random == 0) {
  //     speech = "verbs";
  //   }else if(random == 1) {
  //     speech = "noun"
  //   }else {
  //     speech = "adjecs"
  //   }
  //   if(length == "random") {
  //     length = "";
  //   }
  //   return this._http.get(`https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=${speech}&model_selection=use&length_selection=${length}&probability_selection=true`);
  // }

  // Self Generated Random Word
  getWord(len: string) {
    if (len == "random") {
      var length = Math.floor(Math.random() * 10) + 1;
    }else {
      var length = parseInt(len);
    }
    var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'],
        vowels = ['a','e','i','o','u'],
        rand = function(limit) {
            return Math.floor(Math.random()*limit);
        }, word='';
    for (var i = 0; i < length/2; i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
        word += i*2<length-1 ? randVowel : '';
    }
    return word;
  }

  registerFromService(regForm: any) {
    return this._http.post("/user/register", regForm);
  }

  loginFromService(logForm: any) {
    return this._http.post("/user/login", logForm);
  }

  updateFromService(user: any) {
    return this._http.put("/user/update", user);
  }
}
