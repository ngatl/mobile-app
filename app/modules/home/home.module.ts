import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import {
  HOME_COMPONENTS, 
  HomeComponent, 
  DashboardComponent, 
  SampleComponent,
} from './components';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'sample',
        component: SampleComponent
      },
      {
        path: 'speakers',
        loadChildren: './modules/speakers/speaker.module#SpeakerModule'
      },
      {
        path: 'sponsors',
        loadChildren: './modules/sponsors/sponsor.module#SponsorModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...HOME_COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule { }