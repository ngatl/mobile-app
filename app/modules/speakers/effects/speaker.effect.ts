// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { WindowService } from '../../core/services/window.service';
import { SpeakerService } from '../services/speaker.service';
import { SpeakerActions } from '../actions/speaker.action';
import { AppActions } from '../../ngrx';

@Injectable()
export class SpeakerEffects {

  @Effect() count$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.COUNT)
    .switchMap((action) =>
      this.speakerService.count()
        .map((count) => new SpeakerActions.ChangedAction({
          count
        }))
    );

  @Effect() fetch$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.FETCH)
    .switchMap((action) => this.speakerService.fetch())
    .map((value) => {
      this.log.info('fetched speakers result:', value);
      // this.log.info(JSON.stringify(value));
          
      return new SpeakerActions.ChangedAction({
        list: value
      });
    })
    .catch(err => Observable.of(new SpeakerActions.ApiErrorAction(err)));

  @Effect() select$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.SELECT)
    .switchMap((action: SpeakerActions.SelectAction) => this.speakerService.loadDetail(action.payload))
    .map((result) => {
      this.log.info('speaker select result:', result);
      return new SpeakerActions.ChangedAction({
        selected: result
      });
    })
    .catch(err => Observable.of(new SpeakerActions.ApiErrorAction(err)));
  
    @Effect() apiError$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.API_ERROR)
    .withLatestFrom(this.store)
    .map(([action, state]: [SpeakerActions.ApiErrorAction, any]) => {
        this.win.alert(action.payload);
        return new SpeakerActions.ChangedAction({
            errors: [
                action.payload,
                ...(state.errors || [])
            ],
        });
    });
  

  @Effect() init$ = this.actions$
    .ofType(SpeakerActions.ActionTypes.INIT)
    .startWith(new SpeakerActions.InitAction())
    .map(action => new SpeakerActions.FetchAction());

  constructor(private store: Store<any>, private actions$: Actions, private log: LoggerService, private speakerService: SpeakerService, private win: WindowService) { }
}
