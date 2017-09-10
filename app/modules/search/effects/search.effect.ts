// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';
import { SearchService } from '../services/search.service';
import { SearchActions } from '../actions/search.action';

@Injectable()
export class SearchEffects {

  @Effect() init$ = this.actions$
    .ofType(SearchActions.ActionTypes.INIT)
    .startWith(new SearchActions.InitAction())
    .map(action => new SearchActions.UpdatedAction({
      searching: false,
      results: this.searchService.sampleInitResults
    }));

  @Effect() search$ = this.actions$
    .ofType(SearchActions.ActionTypes.SEARCH)
    .map((action: SearchActions.SearchAction) => new SearchActions.UpdatedAction({
      searching: true,
      term: action.payload
    }))
    .switchMap((action) => {
      this.log.info(SearchActions.ActionTypes.SEARCH, action);
      return this.searchService.search(action.payload.term);
    })
    .takeUntil(this.actions$.ofType(SearchActions.ActionTypes.CANCEL))
    .map(results => {
      this.log.info('search result:', results);
      return (new SearchActions.SearchSuccessAction(results));
    });

  @Effect() searchSuccess$ = this.actions$
    .ofType(SearchActions.ActionTypes.SEARCH_SUCCESS)
    .map((action: SearchActions.SearchSuccessAction) => {
      this.log.info(SearchActions.ActionTypes.SEARCH_SUCCESS);
      return new SearchActions.UpdatedAction({
        searching: false,
        results: action.payload
      });
    });
  
  @Effect() select$ = this.actions$
    .ofType(SearchActions.ActionTypes.SELECT)
    .switchMap((action: SearchActions.SelectAction) => this.searchService.loadDetail(action.payload))
    .map((result) => {
      this.log.info(SearchActions.ActionTypes.SELECT);
      return new SearchActions.UpdatedAction({
        searching: false,
        selected: result
      });
    });

  @Effect() clear$ = this.actions$
    .ofType(SearchActions.ActionTypes.CLEAR)
    .map((action) => {
      this.log.info(SearchActions.ActionTypes.CLEAR);
      return new SearchActions.UpdatedAction({
        searching: false,
        results: [...this.searchService.sampleInitResults]
      });
    });

  @Effect() cancel$ = this.actions$
    .ofType(SearchActions.ActionTypes.CANCEL)
    .map((action) => {
      this.log.info(SearchActions.ActionTypes.CANCEL);
      return new SearchActions.UpdatedAction({
        searching: false
      });
    });

  constructor(private store: Store<any>, private actions$: Actions, private log: LoggerService, private searchService: SearchService) { }
}
