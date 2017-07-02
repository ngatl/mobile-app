import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { ProgressIndicatorState } from '../states/progress-indicator.state';

export namespace ProgressIndicatorActions {
    const CATEGORY: string = 'ProgressIndicator';

    export interface IActions {
        SHOW: string;
        HIDE: string;
    }

    export const ActionTypes: IActions = {
        SHOW: type(`${CATEGORY} Show`),
        HIDE: type(`${CATEGORY} Hide`),
    };

    export class ShowAction implements Action {
        type = ActionTypes.SHOW;

        constructor(public payload?: ProgressIndicatorState.IState) { }
    }

    export class HideAction implements Action {
        type = ActionTypes.HIDE;

        constructor(public payload?: ProgressIndicatorState.IState) { }
    }

    export type Actions =
        ShowAction
        | HideAction;
}
