// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { NativeScriptUISideDrawerModule } from 'nativescript-telerik-ui/sidedrawer/angular';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// app
import { SHARED_COMPONENTS, SHARED_ENTRY_COMPONENTS } from './components';
// import { SHARED_PIPES } from './pipes';

const SHARED_MODULES: any[] = [
  NativeScriptModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule,
  NativeScriptUISideDrawerModule,
  TNSFontIconModule
];

@NgModule({
  imports: [
    ...SHARED_MODULES
  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_ENTRY_COMPONENTS,
    // ...SHARED_PIPES
  ],
  entryComponents: [
    ...SHARED_ENTRY_COMPONENTS
  ],
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS,
    // ...SHARED_PIPES
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {

}
