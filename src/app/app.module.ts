import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";

import { HeaderComponent } from './Blocks/header/header.component';
import { SiderComponent } from './Blocks/sider/sider.component';

let matModule = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SiderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        matModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
