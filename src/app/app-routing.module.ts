import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MatIconModule} from "@angular/material/icon";

import {HomeComponent} from "./Pages/home/home.component";
import { ProfileComponent } from './Pages/profile/profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";

let matModule = [
  MatIconModule,
  MatGridListModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
  MatMenuModule,
]

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    matModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
