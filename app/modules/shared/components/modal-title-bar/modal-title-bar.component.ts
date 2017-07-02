import { Component, Input, Output, EventEmitter } from "@angular/core";

// libs
import { Store } from '@ngrx/store';

// nativescript
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

// app
import { moreIcon } from '../../../../helpers';

@Component({
    selector: "modal-title-bar",
    moduleId: module.id,
    templateUrl: './modal-title-bar.component.html'
})
export class ModalTitleBarComponent {

    @Input() params: ModalDialogParams;
    @Input() title: string;
    @Input() closeText: string;
    @Input() showMoreButton: boolean;
    @Output() moreAction: EventEmitter<any> = new EventEmitter();

    public moreIcon: string;

    constructor(
        private _store: Store<any>
    ) {

    }

    ngOnInit() {
        if (!this.closeText) {
            this.closeText = 'Close'; // default
        }

        this.moreIcon = moreIcon();
    }

    public more(e) {
        this.moreAction.next();
    }

    public close() {
        this.params.closeCallback();
    }
}
