import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SPONSOR_COMPONENTS, SponsorComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SponsorComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...SPONSOR_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SponsorModule { }