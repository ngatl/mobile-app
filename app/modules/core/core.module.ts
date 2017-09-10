// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// app
import { SDKNativeModule } from '../backend';
import { SocketDriver } from '../backend/sockets/socket.driver';
import { ApiModule } from '../api/api.module';
import { EventEffects } from '../events/effects';
import { EVENT_PROVIDERS } from '../events/services';
import { SearchEffects } from '../search/effects';
import { SEARCH_PROVIDERS } from '../search/services';
import { SpeakerEffects } from '../speakers/effects';
import { SPEAKER_PROVIDERS } from '../speakers/services';
import { SponsorEffects } from '../sponsors/effects';
import { SPONSOR_PROVIDERS } from '../sponsors/services';
import { UserEffects } from '../user/effects';
import { UserModule } from '../user/user.module';
import { UIEffects } from './effects';
import { CORE_PROVIDERS, TNSStorageService } from './services';
import { reducers } from '../ngrx';

// factories
export function defaultModalParams() {
  return new ModalDialogParams({}, null);
}
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, `/assets/i18n/`, '.json');
}

// various feature module singletons with core providers
const SINGLETON_PROVIDERS: any[] = [
  ...CORE_PROVIDERS,
  ...EVENT_PROVIDERS,
  ...SEARCH_PROVIDERS,
  ...SPEAKER_PROVIDERS,
  ...SPONSOR_PROVIDERS
];

const MODULES: any[] = [
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule,
  // used here to allow fonticon pipe to be exported below
  // if ever needed in root app component
  TNSFontIconModule,
];

@NgModule({
  imports: [
    // base modules (no forRoot configurations needed)
    ...MODULES,
    // custom font icons
    TNSFontIconModule.forRoot({
      'fa': 'fonts/font-awesome.css'
    }),
    // i18n support
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [Http],
      },
    }),
    // backend services configuration
    SDKNativeModule.forRoot(),

    // app setup
    ApiModule,
    UserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      EventEffects,
      SearchEffects,
      SpeakerEffects,
      SponsorEffects,
      UserEffects,
      UIEffects,
    ]),
  ],
  providers: [
    ...SINGLETON_PROVIDERS,
    // allows components to be reused as modals as well as routing components
    // this service is provided to each component when opened in a modal
    // however because components will need to inject this for both conditions (route and modal)
    // this ensures Angular DI works fine everytime
    { provide: ModalDialogParams, useFactory: defaultModalParams },
  ],
  exports: [
    // to reduce redundant imports in AppModule 
    ...MODULES
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
