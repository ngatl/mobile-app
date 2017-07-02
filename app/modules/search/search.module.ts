import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SEARCH_COMPONENTS, SearchComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...SEARCH_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SearchModule { }