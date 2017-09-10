// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { WindowService } from '../../core/services/window.service';
import { SponsorService } from '../services/sponsor.service';
import { SponsorActions } from '../actions/sponsor.action';
import { AppActions } from '../../ngrx';

@Injectable()
export class SponsorEffects {

  @Effect() count$ = this.actions$
    .ofType(SponsorActions.ActionTypes.COUNT)
    .switchMap((action) =>
      this.sponsorService.count()
        .map((count) => new SponsorActions.ChangedAction({
          count
        }))
    );

  @Effect() fetch$ = this.actions$
    .ofType(SponsorActions.ActionTypes.FETCH)
    .switchMap((action) => this.sponsorService.fetch())
    .map((value) => {
      console.log('fetched sponsors:', value);
      // console.log(JSON.stringify(value));
          
      return new SponsorActions.ChangedAction({
        list: value
      });
    })
    .catch(err => Observable.of(new SponsorActions.ApiErrorAction(err)));

    @Effect() select$ = this.actions$
      .ofType(SponsorActions.ActionTypes.SELECT)
      .switchMap((action: SponsorActions.SelectAction) => this.sponsorService.loadDetail(action.payload))
      .map((result) => {
        this.log.info(SponsorActions.ActionTypes.SELECT);
        return new SponsorActions.ChangedAction({
          selected: result
        });
      });
  
    @Effect() apiError$ = this.actions$
      .ofType(SponsorActions.ActionTypes.API_ERROR)
      .withLatestFrom(this.store)
      .map(([action, state]: [SponsorActions.ApiErrorAction, any]) => {
          this.win.alert(action.payload);
          return new SponsorActions.ChangedAction({
              errors: [
                  action.payload,
                  ...(state.errors || [])
              ],
          });
      });
  

  @Effect() init$ = this.actions$
    .ofType(SponsorActions.ActionTypes.INIT)
    .startWith(new SponsorActions.InitAction())
    .map(action => new SponsorActions.FetchAction());

  constructor(private store: Store<any>, private actions$: Actions, private log: LoggerService, private sponsorService: SponsorService, private win: WindowService) { }
}
