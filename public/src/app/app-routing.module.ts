import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { LoginRegModalComponent } from './login-reg-modal/login-reg-modal.component';

const routes: Routes = [
  {path: "", component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
