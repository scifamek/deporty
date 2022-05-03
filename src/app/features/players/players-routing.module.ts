import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlayerComponent } from './presentation/pages/create-player/create-player.component';
import { ViewAllComponent } from './presentation/pages/view-all/view-all.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAllComponent,
  },

  {
    path: ViewAllComponent.route,
    component: ViewAllComponent,
  },
  {
    path: CreatePlayerComponent.route,
    component: CreatePlayerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {
  static route = 'players';
}
