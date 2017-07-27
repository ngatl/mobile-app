import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from '@angular/core';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NSModuleFactoryLoader } from 'nativescript-angular/router';

// app
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LoopBackConfig } from './modules/backend/lb.config';

const apiBaseUrl = 'http://127.0.0.1:3000';

LoopBackConfig.setBaseURL(apiBaseUrl);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: NgModuleFactoryLoader,
            useClass: NSModuleFactoryLoader,
        },
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
