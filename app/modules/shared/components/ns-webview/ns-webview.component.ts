import { Component } from "@angular/core";

// libs
import { Store } from '@ngrx/store';

// nativescript
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

// app
import { ProgressIndicatorActions } from '../../../core/actions';

@Component({
    selector: "ns-webview",
    moduleId: module.id,
    templateUrl: './ns-webview.component.html'
})
export class NSWebViewComponent {

    public url;
    public title;

    constructor(
        private _store: Store<any>,
        public params: ModalDialogParams
    ) {
        if (this.params && this.params.context) {
            this.url = this.params.context.url;
            if (this.params.context.title) {
                this.title = this.params.context.title;
            }
        }
    }

    public loadFinished(e) {
        this._store.dispatch(new ProgressIndicatorActions.HideAction());

        if (!this.title) {
            this.title = e.url;
        }
    }

    public close() {
        this.params.closeCallback();
    }
}
