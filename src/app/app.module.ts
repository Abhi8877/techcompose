import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './directive/phone-mask.directive';
import { MainUserComponent } from './dashboard/main-user/main-user.component';
import { AddUserComponent } from './dashboard/main-user/add-user/add-user.component';
import { EditUserComponent } from './dashboard/main-user/edit-user/edit-user.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    PhoneMaskDirective,
    MainUserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({preventDuplicates: true,timeOut:1500}),
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
