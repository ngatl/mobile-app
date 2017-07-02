// angular
import { Injectable, NgZone } from '@angular/core';

// libs
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

/**
 * Shared by both effects
 */
export class UserCommonEffect {

    constructor(public store: Store<any>, public ngZone: NgZone) { }

    public findAndUpdate(collection: Array<any>, value: any, addIfNotFound?: boolean) {
        let found = false;
        for (let i = 0; i < collection.length; i++) {
            if (value.id === collection[i].id) {
                collection[i] = value;
                found = true;
                break;
            }
        }
        if (!found && addIfNotFound) {
            collection.push(value);
        }
    }

    public removeItem(collection: Array<any>, value: any) {
        let index = -1;
        for (let i = 0; i < collection.length; i++) {
            if (value.id === collection[i].id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            collection.splice(index, 1);
        }
    }
}
