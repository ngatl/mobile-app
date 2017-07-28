// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
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
    .switchMap((action) =>
      this.sponsorService.fetch()
        .map((value) => {
          console.log('fetching sponsors:');
          console.log(JSON.stringify(value));
          
          return new SponsorActions.ChangedAction({
            list: value
          });
        }));

    @Effect() select$ = this.actions$
      .ofType(SponsorActions.ActionTypes.SELECT)
      .switchMap((action) => this.sponsorService.loadDetail(action.payload))
      .map((result) => {
        this.log.info(SponsorActions.ActionTypes.SELECT);
        return new SponsorActions.ChangedAction({
          selected: result
        });
      });
  

  @Effect() init$ = this.actions$
    .ofType(SponsorActions.ActionTypes.INIT)
    .startWith(new SponsorActions.InitAction())
    .map(action => new SponsorActions.FetchAction());

  constructor(private store: Store<any>, private actions$: Actions, private log: LoggerService, private sponsorService: SponsorService) { }
}
