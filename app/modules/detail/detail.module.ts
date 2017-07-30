import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import {
  DETAIL_COMPONENTS,
  EventDetailComponent,
  SearchDetailComponent,
  SpeakerDetailComponent
} from './components';

const routes: Routes = [
  {
    path: 'search/:id',
    component: SearchDetailComponent
  },
  {
    path: 'speaker/:id',
    component: SpeakerDetailComponent
  },
  {
    path: 'event/:id',
    component: EventDetailComponent
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