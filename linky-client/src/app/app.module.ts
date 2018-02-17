import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LinkCardComponent } from './link-card/link-card.component';
import { LinkInputComponent } from './link-input/link-input.component';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatInput,
  MatInputBase,
  MatInputModule,
  MatIconModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatProgressBarModule
} from '@angular/material';
import { SortablejsModule } from 'angular-sortablejs';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { LinkManagerComponent } from './link-manager/link-manager.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: LinkManagerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    LinkCardComponent,
    LinkInputComponent,
    LoginComponent,
    LinkManagerComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    SortablejsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
