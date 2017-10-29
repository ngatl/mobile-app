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

    @Effect() login$ = this._actions$
        .ofType(UserActions.ActionTypes.LOGIN)
        .switchMap((action: UserActions.LoginAction) =>
            this._userService.login(action.payload)
                .map((result) => {
                    console.log('login result:');
                    console.log(result);

                    // {
                    //     // auth token (set on the http request headers)
                    //     "id": "a7e3db55-54c0-4c54-a2a1-ad9c6a02d08f", 
                    
                    //     "ttl": 1209600,  // token expires
                    //     "created": "2017-10-20T16:42:21.055Z",
                    //     "userId": "3ba5ba7e-a584-4365-a032-dfa1ba561844",
                    //     "user": {
                    //       "id": "3ba5ba7e-a584-4365-a032-dfa1ba561844",
                    //       "username": "Walkerrunpdx@gmail.com",
                    //       "email": "Walkerrunpdx@gmail.com",
                    //       "firstName": "Nathan",
                    //       "lastName": "Walker",
                    //       "fullName": "Nathan Walker",
                    //       "avatar": "http://www.gravatar.com/avatar/d8c018c0be686e304e9f202639ed8885?s=150",
                    //       "created": "2017-10-20T16:27:57.438Z",
                    //       "modified": "2017-10-20T16:27:57.440Z"
                    //     }
                    //   }
                    this._userService.persist(result);
                    return new UserActions.ChangedAction({
                        current: result
                    });
                })
                .catch((err) => {
                    // console.log('error:');
                    // console.log(err);
                    // if (typeof err === 'object') {
                    //     for (let key in err) {
                    //         console.log(key, err[key]);
                    //     }
                    // }
                    if (err) {

                    }
                    return Observable.of(new UserActions.ApiErrorAction(err));
                }));

    @Effect() create$ = this._actions$
        .ofType(UserActions.ActionTypes.CREATE)
        .switchMap((action: UserActions.CreateAction) =>
            this._userService.create(action.payload)
                .map((result) => {
                    console.log('login result:');
                    console.log(result);
                    // this._userService.persist(result);
                    return new UserActions.ChangedAction({
                        current: <any>result
                    });
                })
                .catch((err) => {
                    console.log('error:');
                    console.log(err);
                    if (typeof err === 'object') {
                        for (let key in err) {
                            console.log(key, err[key]);
                        }
                    }
                    return Observable.of(new UserActions.ApiErrorAction(err));
                }));

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
