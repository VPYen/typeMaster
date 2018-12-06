import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { HttpService } from "./http.service"
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { LoginRegModalComponent } from './login-reg-modal/login-reg-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ProfileModalComponent,
    LoginRegModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
