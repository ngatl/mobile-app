// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { EventService } from '../services/event.service';
import { EventActions } from '../actions/event.action';
import { AppActions } from '../../ngrx';

@Injectable()
export class EventEffects {

  @Effect() count$ = this.actions$
    .ofType(EventActions.ActionTypes.COUNT)
    .switchMap((action) =>
      this.eventService.count()
        .map((count) => new EventActions.ChangedAction({
          count
        }))
    );

  @Effect() fetch$ = this.actions$
    .ofType(EventActions.ActionTypes.FETCH)
    .switchMap((action) =>
      this.eventService.fetch()
        .map((value) => {
          console.log('fetching sponsors:');
          console.log(JSON.stringify(value));
          
          return new EventActions.ChangedAction({
            list: value
          });
        }));

    @Effect() select$ = this.actions$
      .ofType(EventActions.ActionTypes.SELECT)
      .switchMap((action) => this.eventService.loadDetail(action.payload))
      .map((result) => {
        this.log.info(EventActions.ActionTypes.SELECT);
        return new EventActions.ChangedAction({
          selected: result
        });
      });
  

  @Effect() init$ = this.actions$
    .ofType(EventActions.ActionTypes.INIT)
    .startWith(new EventActions.InitAction())
    .map(action => new EventActions.FetchAction());

  constructor(
    private store: Store<any>, private actions$: Actions,
    private log: LoggerService, private eventService: EventService
  ) { }
}
