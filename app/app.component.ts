import './operators';
import { Component } from '@angular/core';

// nativescript
import { registerElement } from 'nativescript-angular/element-registry';

// register plugin components
registerElement('VideoPlayer', () => require('nativescript-videoplayer').Video);

// app
import { NSAppService } from './modules/core/services/ns-app.service';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})
export class AppComponent { 

    constructor(
        private _appService: NSAppService // DO NOT REMOVE (used to construct singleton)
    ) { }
}
