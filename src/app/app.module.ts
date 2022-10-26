import { NgModule } from "@angular/core";
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
import {MatMenuModule} from "@angular/material/menu";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./Services/interceptors/token.interceptor";

let matModule = [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SiderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        matModule,
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 2500,
                panelClass: ['notification-snackbar']
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
