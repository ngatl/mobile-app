// angular
import { Injectable, NgZone } from '@angular/core';
// libs
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import { SystemUser } from '../../../backend/models';
import { LoggerService } from '../../../backend/services/custom/logger.service';
import { ProgressService } from '../../core/services/progress.service';
import { UserService } from '../services/user.service';
import { UserActions } from '../actions/user.action';
import { UserCommonEffect } from './user-common.effect';
import { IAppState } from '../../ngrx/index';

@Injectable()
export class UserEffects extends UserCommonEffect {

    @Effect() checkEmail$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.CHECK_EMAIL)
        .withLatestFrom(this._store)
        .map(([action, state]: [UserActions.CheckEmailAction, IAppState]) => {
            let alreadyChecked = false;
            if ( state.user.reservedEmails ) {
                // prevents repetitive api calls to check for existence of previously entered email
                alreadyChecked =
                    !!state.user.reservedEmails.find(
                        email => email === action.payload);
            }
            if ( alreadyChecked ) {
                return new UserActions.ChangedAction({
                    reservedEmails: [...(state.user.reservedEmails || [])],
                    emailAvailable: null,
                    errors:         [],
                });
            } else {
                return new UserActions.SearchAction(action.payload);
            }
        });

    @Effect() searchEmail$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.SEARCH)
        .withLatestFrom(this._store)
        .switchMap(([action, state]: [UserActions.SearchAction, IAppState]) => {
            this._progressService.toggleSpinner(true);
            return this._userService.emailIsAvailable(action.payload)
                .map((reservedEmails) => {
                    if ( reservedEmails && reservedEmails.length ) {
                        // continue keeping track of emails already found
                        return new UserActions.ChangedAction({
                            reservedEmails: [
                                /* only track usernames, not id (security) */
                                ...reservedEmails.map(
                                    u => u.username),
                                ...(state.user.reservedEmails || [])
                            ],
                            emailAvailable: null,
                            errors:         [],
                        });
                    } else {
                        return new UserActions.ChangedAction({
                            emailAvailable: action.payload,
                            errors:         [],
                        });
                    }
                });
        });


    @Effect() emailConnect$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.EMAIL_CONNECT)
        .switchMap((action: UserActions.EmailConnectAction) => {
            this._progressService.toggleSpinner(true);
            return this._userService.emailConnect(action.payload.username, action.payload.password)
                .map((response: any) => {
                    if ( response && response._body ) {
                        const token = response.json().token;
                        this._userService.token = token;
                        return new UserActions.LoginAction(token);
                    } else {
                        return new UserActions.LoginFailedAction('unknown');
                    }
                })
                .catch((err) => Observable.of(new UserActions.LoginFailedAction(err)));
        });

    @Effect() firebaseConnect$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.SOCIAL_CONNECT)
        .switchMap((action: UserActions.SocialConnectAction) => {
            this._progressService.toggleSpinner(true);
            return this._userService.socialConnect(action.payload)
                .map((response: any) => {
                    if ( response && response.token ) {
                        const token = response.token;
                        this._userService.token = token;
                        return new UserActions.LoginAction(token);
                    } else {
                        return new UserActions.LoginFailedAction('Unknown');
                    }
                })
                .catch((err) => Observable.of(new UserActions.LoginFailedAction(err)));
        });

    @Effect() create$: Observable<any> = this._actions$
        .ofType(UserActions.ActionTypes.CREATE)
        .switchMap((action: UserActions.CreateAction) => {
            this._progressService.toggleSpinner(true);
            this._postingData = action.payload;
            return this._userService.emailIsAvailable(this._postingData.email);
        })
        .map((reservedEmails) => {
            if ( reservedEmails && reservedEmails.length ) {
                return new UserActions.ApiErrorAction('An account already exists with that email address'); // TODO
            } else {
                return new UserActions.CreateFinishAction(this._postingData);
            }
        })
        .catch((err) => Observable.of(new UserActions.ApiErrorAction(err)));

    @Effect() createFinish$: Observable<any> = this._actions$
        .ofType(UserActions.ActionTypes.CREATE_FINISH)
        .switchMap((action: UserActions.CreateFinishAction) =>
            this._userService.createUser(this._postingData)
                .map((user) => {
                    if ( user instanceof SystemUser ) {
                        this._postingData = null; // just clear since no longer needed
                        this._userService.token = user.verificationToken;
                        return new UserActions.LoginSuccessAction(user);
                    } else {
                        return new UserActions.ApiErrorAction(user);
                    }
                })
                .catch((err) => Observable.of(new UserActions.ApiErrorAction(err))),
        );

    @Effect() login$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.LOGIN)
        .switchMap((action: UserActions.LoginAction) =>
            this._userService.loadUser(action.payload)
                .map(user => new UserActions.LoginSuccessAction(user))
                .catch(err => Observable.of(new UserActions.LoginFailedAction(err))),
    );

    @Effect() loginSuccess$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.LOGIN_SUCCESS)
        .map((action: UserActions.LoginSuccessAction) => {
            const user = action.payload;
            this._userService.persistUser(user);
            return new UserActions.ChangedAction({
                current: user,
                errors:  [],
            });
        });

    @Effect() forgotPassword$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.FORGOT_PASSWORD)
        .switchMap((action: UserActions.ForgotPasswordAction) =>
            this._userService.forgotPasswordRequest(action.payload)
                .map(
                    _ => new UserActions.ChangedAction({
                        forgotPasswordSent: true,
                        errors:             [],
                    }))
                .catch(
                    err => Observable.of(new UserActions.ApiErrorAction(err))),
        );

    @Effect() modifyPassword$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.MODIFY_PASSWORD)
        .withLatestFrom(this._store)
        .switchMap(([action, state]: [UserActions.ModifyPasswordAction, IAppState]) => {
            this._progressService.toggleSpinner(true);
            return this._userService.emailConnect(state.user.current.email, action.payload.oldPassword)
                .map((response: any) => {
                    if ( response ) {
                        this._userService.token = response.json().token;
                        return new UserActions.ModifyPasswordVerificationSuccessAction(action.payload.newPassword);
                    } else {
                        return new UserActions.ApiErrorAction('Unknown');
                    }
                })
                .catch(
                    err => Observable.of(new UserActions.ApiErrorAction(err)));
        });

    @Effect() modifyPasswordVerificationSuccess$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.MODIFY_PASSWORD_VERIFICATION_SUCCESS)
        .withLatestFrom(this._store)
        .map(([action, state]: [UserActions.ModifyPasswordVerificationSuccessAction, IAppState]) => {
            state.user.current.password = action.payload;
            return (new UserActions.UpdateAction(state.user.current));
        });

    @Effect() userUpdate$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.UPDATE)
        .switchMap((action: UserActions.UpdateAction) => {
            this._progressService.toggleSpinner(true);
            return this._userService.updateUser(action.payload)
                .map(user => {
                    this._userService.token = user.verificationToken;
                    this._userService.persistUser(user);
                    return (new UserActions.ChangedAction({
                        current: user,
                        errors: []
                    }));
                })
                .catch(err => Observable.of(new UserActions.ApiErrorAction(err)));
        });

    @Effect() delete$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.DELETE)
        .switchMap(
            action => {
                this._progressService.toggleSpinner(true);
                return this._userService.deleteUser(action.payload)
                    .map(
                        user => new UserActions.LogoutAction())
                    .catch(
                        err => Observable.of(new UserActions.LoginFailedAction(err)));
            });

    @Effect() logout$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.LOGOUT)
        .map((action: UserActions.LogoutAction) => {
            this._logger.log(UserActions.ActionTypes.LOGOUT);
            // clear persisted user
            this._userService.clear();
            // also clear token
            this._userService.removeToken();
            return (new UserActions.ChangedAction({
                current:    null,
                errors:     [],
            }));
        });

    @Effect() apiError$ = this._actions$
        .ofType(
            UserActions.ActionTypes.LOGIN_FAILURE,
            UserActions.ActionTypes.API_ERROR
        )
        .withLatestFrom(this._store)
        .map(([action, state]) => {
            this._userService.alertErrorMessage(action.payload);
            return new UserActions.ChangedAction({
                errors: [
                    action.payload,
                    ...(state.errors || [])
                ],
            });
        });

    @Effect({ dispatch: false }) loaderOff$: Observable<Action> = this._actions$
        .ofType(
            UserActions.ActionTypes.LOGOUT,
            UserActions.ActionTypes.LOGIN_FAILURE,
            UserActions.ActionTypes.API_ERROR,
            UserActions.ActionTypes.CHANGED,
        )
        // always hide loader when finally updating user state
        .do(_ => this._progressService.toggleSpinner());

    // Any startWith observables - Should always BE LAST!
    @Effect() init$: Observable<Action> = this._actions$
        .ofType(UserActions.ActionTypes.INIT)
        .startWith(new UserActions.InitAction())
        .switchMap((action: UserActions.InitAction) =>
            this._userService.getCurrentUser()
                .map(
                    user => (new UserActions.ChangedAction({
                        current: user,
                    }))),
        );

    private _postingData: any; // used with create user chain

    constructor(
        private _store: Store<any>,
        private _logger: LoggerService,
        private _ngZone: NgZone,
        private _actions$: Actions,
        private _userService: UserService,
        private _progressService: ProgressService
    ) {
        super(_store, _ngZone);
    }
}
