// angular
import { Injectable } from '@angular/core';
// libs
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
// module
import { ProgressService } from '../services/progress.service';
import { ProgressIndicatorActions, UIActions, LocaleActions } from '../actions';
import { LocaleService } from '../services/locale.service';

@Injectable()
export class UIEffects {

    @Effect() localeSet$ = this._actions$
        .ofType(LocaleActions.ActionTypes.SET)
        .map((action: LocaleActions.SetAction) => {
            this._localeService.locale = action.payload;
            this._translateService.use(action.payload);
            return new UIActions.ChangedAction({
                locale: action.payload,
            });
        });

    @Effect() progressShow$: Observable<Action> = this._actions$
        .ofType(ProgressIndicatorActions.ActionTypes.SHOW)
        .map((action: ProgressIndicatorActions.ShowAction) => {
            let payload = action.payload;
            if (!action.payload) {
                // if no payload, default to showing page level progress loader
                payload = {
                    page: {
                        enabled: true,
                    },
                };
            }
            return new UIActions.ChangedAction({
                progressIndicator: payload,
            });
        });

    @Effect() progressHide$: Observable<Action> = this._actions$
        .ofType(ProgressIndicatorActions.ActionTypes.HIDE)
        .map((action: ProgressIndicatorActions.HideAction) => {
            // .map((action: ProgressIndicatorActions.HideAction) => {
            let payload = action.payload;
            if (!action.payload) {
                // if no payload, default to hiding page level progress loader
                payload = {
                    page: {
                        enabled: false,
                    },
                };
            }
            return new UIActions.ChangedAction({
                progressIndicator: payload,
            });
        });

    // Any startWith observables - Should always BE LAST!
    @Effect() localeInit$ = this._actions$
        .ofType(LocaleActions.ActionTypes.INIT)
        .startWith(new LocaleActions.InitAction())
        .map((action: LocaleActions.InitAction) => {
            this._translateService.setDefaultLang('en');
            return new LocaleActions.SetAction(this._localeService.locale);
        });

    constructor(
        private _store: Store<any>,
        private _actions$: Actions,
        private _localeService: LocaleService,
        private _translateService: TranslateService,
        // instantiates service automatically
        // even though not used this helps ensure single instance is created on boot
        private _progress: ProgressService) { }

}
