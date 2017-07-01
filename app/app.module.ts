import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from '@angular/core';

// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NSModuleFactoryLoader } from 'nativescript-angular/router';

// libs
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';

// app
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        AppRoutingModule,
        TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
        })
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
