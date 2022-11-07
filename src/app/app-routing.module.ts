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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AddClassDialog} from "./Pages/class/add-class/add-class";
import {MatDialogModule} from "@angular/material/dialog";
import {StudentComponent} from "./Pages/student/student.component";
import {AddStudentDialog} from "./Pages/student/add-student/add-student";
import { HttpClientModule } from "@angular/common/http";
import { KloudNotificationComponent } from "./Components/kloud-notification/kloud-notification.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { UsersComponent } from "./Pages/users/users.component";
import { AddUserDialog } from "./Pages/users/add-user/add-user";
import { KloudTableComponent } from "./Components/kloud-table/kloud-table.component";
import { KloudWidgetComponent } from "./Components/kloud-wiget/kloud-widget.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { TimekeepingComponent } from "./Pages/timekeeping/timekeeping.component";
import { DebtComponent } from "./Pages/debt/debt.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { StudentCheckinFilterDialog } from "./Pages/timekeeping/filter-dialog/student-checkin-filter-dialog";
import { BillsComponent } from "./Pages/bills/bills.component";
import { MatTabsModule } from "@angular/material/tabs";
import { KloudExcelReader } from "./Components/kloud-excel-reader/kloud-excel-reader";
import { ImportClassDialog } from "./Pages/class/import-class/import-class-dialog";
import { DragDirective } from "./Components/kloud-excel-reader/directive-drag-field";
import { BillDialog } from "./Pages/bills/dialog/crud/bill-dialog";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatRadioModule } from "@angular/material/radio";
import { CheckoutComponent } from "./Pages/checkout/checkout.component";
import { SmsNotificationComponent } from "./Pages/sms-notification/sms-notification.component";
import { ImportStudentDialog } from "./Pages/student/import-student/import-student-dialog";
import { CURRENCY_MASK_CONFIG, CurrencyMaskModule } from "ng2-currency-mask";
import { BusManagementComponent } from "./Pages/bus-management/bus-management.component";
import { StudyManagementComponent } from "./Pages/study-management/study-management.component";

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
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  FormsModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatTabsModule,
  NgxMatSelectSearchModule,
  MatRadioModule,
]

let expandModule = [
  AddClassDialog,
  AddStudentDialog,
  AddUserDialog,
  StudentCheckinFilterDialog,
  KloudExcelReader,
  ImportClassDialog,
  DragDirective,
  BillDialog,
  ImportStudentDialog,

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
    path: "student",
    component: StudentComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "timekeeping",
    component: TimekeepingComponent
  },
  {
    path: "debt",
    component: DebtComponent
  },
  {
    path: "bills",
    component: BillsComponent
  },
  {
    path: "notification",
    component: SmsNotificationComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "bus-management",
    component: BusManagementComponent
  },
  {
    path: "study-management",
    component: StudyManagementComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

let customComponent = [
  KloudDividerComponent,
  KloudNotificationComponent,
  KloudTableComponent,
  KloudWidgetComponent
]

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ClassComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
    UsersComponent,
    TimekeepingComponent,
    DebtComponent,
    BillsComponent,
    CheckoutComponent,
    SmsNotificationComponent,
    BusManagementComponent,
    StudyManagementComponent,
    customComponent,
    expandModule
  ],
  imports: [
    RouterModule.forRoot(routes),
    matModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: {
        align: "right",
        allowNegative: true,
        decimal: ",",
        precision: 3,
        prefix: "",
        suffix: "",
        thousands: ","
      }
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
