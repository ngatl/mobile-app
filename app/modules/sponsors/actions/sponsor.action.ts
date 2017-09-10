import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { SponsorState } from '../states/sponsor.state';

export namespace SponsorActions {
  const CATEGORY: string = 'Sponsors';

  export interface IActions {
    INIT: string;
    COUNT: string;
    FETCH: string;
    SELECT: string;
    API_ERROR: string;
    CHANGED: string;
  }

  export const ActionTypes: IActions = {
    INIT: type(`${CATEGORY} Init`),
    COUNT: type(`${CATEGORY} Count`),
    FETCH: type(`${CATEGORY} Fetch`),
    SELECT: type(`${CATEGORY} Select`),
    API_ERROR: type(`${CATEGORY} Api Error`),
    CHANGED: type(`${CATEGORY} Changed`),
  };

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload = null;
  }

  export class CountAction implements Action {
    type = ActionTypes.COUNT;
    payload = null;
  }
  
  export class FetchAction implements Action {
    type = ActionTypes.FETCH;
    constructor(public payload?: any) { }
  }

  export class SelectAction implements Action {
    type = ActionTypes.SELECT;
    constructor(public payload?: any /* sponsor id */) { }
  }

  export class ApiErrorAction implements Action {
    type = ActionTypes.API_ERROR;
    constructor(public payload?: any) { }
  }

  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;
    constructor(public payload?: SponsorState.IState) { }
  }
  
  export type Actions
    = InitAction
    | CountAction
    | FetchAction
    | ChangedAction;
}

