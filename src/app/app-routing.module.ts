import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MatIconModule} from "@angular/material/icon";

import { ClassComponent } from './Pages/class/class.component';
import { HomeComponent } from "./Pages/home/home.component";
import { ProfileComponent } from './Pages/profile/profile.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { KloudDividerComponent } from './Components/kloud-divider/kloud-divider.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

let matModule = [
  MatIconModule,
  MatGridListModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule
]



const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "class",
    component: ClassComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

let customComponent = [
  KloudDividerComponent
]

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ClassComponent,
    LoginComponent,
    RegisterComponent,
    customComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    matModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
