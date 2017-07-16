import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SPEAKER_COMPONENTS, SpeakerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SpeakerComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...SPEAKER_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SpeakerModule { }