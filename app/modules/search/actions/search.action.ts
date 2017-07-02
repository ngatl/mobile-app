import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { SearchState } from '../states/search.state';

export namespace SearchActions {
  const CATEGORY: string = 'Search';

  export interface ISearchActions {
    INIT: string;
    SEARCH: string;
    SEARCH_SUCCESS: string;
    SELECT: string;
    CLEAR: string;
    CANCEL: string;
    UPDATED: string;
  }

  export const ActionTypes: ISearchActions = {
    INIT: type(`${CATEGORY} Init`),
    SEARCH: type(`${CATEGORY} Search`),
    SEARCH_SUCCESS: type(`${CATEGORY} Search Success`),
    SELECT: type(`${CATEGORY} Select`),
    CLEAR: type(`${CATEGORY} Clear`),
    CANCEL: type(`${CATEGORY} Cancel`),
    UPDATED: type(`${CATEGORY} Updated`),
  };

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload = null;
  }

  export class SearchAction implements Action {
    type = ActionTypes.SEARCH;
    constructor(public payload: string/*search term*/) { }
  }
  
  export class SearchSuccessAction implements Action {
    type = ActionTypes.SEARCH_SUCCESS;
    constructor(public payload: any) { }
  }

  export class SelectAction implements Action {
    type = ActionTypes.SELECT;
    constructor(public payload: any/* id */) { }
  }

  export class ClearAction implements Action {
    type = ActionTypes.CLEAR;
    payload = null;
  }

  export class CancelAction implements Action {
    type = ActionTypes.CANCEL;
    payload = null;
  }

  export class UpdatedAction implements Action {
    type = ActionTypes.UPDATED;
    constructor(public payload: SearchState.IState) { }
  }
  
  export type Actions
    = InitAction
    | SearchAction
    | SearchSuccessAction
    | SelectAction
    | CancelAction
    | UpdatedAction;
}

