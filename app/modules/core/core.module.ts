// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'; 
import { NativeScriptFormsModule } from 'nativescript-angular/forms'; 
import { NativeScriptHttpModule } from 'nativescript-angular/http'; 
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs'; 

// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// app
import { CORE_PROVIDERS } from './services';
// import { AppReducer } from '../ngrx';

// see below
const defaultModalParams = new ModalDialogParams({}, null);

const SINGLETON_PROVIDERS: any[] = [
  ...CORE_PROVIDERS,
];

const MODULES: any[] = [
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule,
  TNSFontIconModule
];

@NgModule({
  imports: [
    ...MODULES,
    StoreModule.provideStore({})
  ],
  providers: [
    ...SINGLETON_PROVIDERS,
    // allows components to be reused as modals as well as routing components
    // this service is provided to each component when opened in a modal
    // however because components will need to inject this for both conditions (route and modal)
    // this ensures Angular DI works fine everytime
    { provide: ModalDialogParams, useValue: defaultModalParams }
  ],
  exports: [
    ...MODULES
  ]
})
export class CoreModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [...SINGLETON_PROVIDERS, ...configuredProviders]
    };
  }
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
