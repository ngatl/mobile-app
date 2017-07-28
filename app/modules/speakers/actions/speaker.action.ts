import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { SpeakerState } from '../states/speaker.state';

export namespace SpeakerActions {
  const CATEGORY: string = 'Speakers';

  export interface IActions {
    INIT: string;
    COUNT: string;
    FETCH: string;
    SELECT: string;
    CHANGED: string;
  }

  export const ActionTypes: IActions = {
    INIT: type(`${CATEGORY} Init`),
    COUNT: type(`${CATEGORY} Count`),
    FETCH: type(`${CATEGORY} Fetch`),
    SELECT: type(`${CATEGORY} Select`),
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
    constructor(public payload?: any /* speaker id */) { }
  }

  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;
    constructor(public payload?: SpeakerState.IState) { }
  }
  
  export type Actions
    = InitAction
    | CountAction
    | FetchAction
    | ChangedAction;
}

