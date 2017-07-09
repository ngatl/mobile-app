// angular
import { Injectable, NgZone } from '@angular/core';
// libs
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import { SystemUser } from '../../backend/models';
import { LoggerService } from '../../backend/services/custom/logger.service';
import { ProgressService } from '../../core/services/progress.service';
import { UserService } from '../services/user.service';
import { UserActions } from '../actions/user.action';
import { IAppState } from '../../ngrx/index';

@Injectable()
export class UserEffects {

    constructor(
        private _store: Store<any>,
        private _logger: LoggerService,
        private _ngZone: NgZone,
        private _actions$: Actions,
        private _userService: UserService,
        private _progressService: ProgressService
    ) {

    }
}
