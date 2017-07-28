import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DETAIL_COMPONENTS, SearchDetailComponent, SpeakerDetailComponent } from './components';

const routes: Routes = [
  {
    path: 'search/:id',
    component: SearchDetailComponent
  },
  {
    path: 'speaker/:id',
    component: SpeakerDetailComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...DETAIL_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class DetailModule { }