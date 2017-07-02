import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { UIState } from '../states';

export namespace UIActions {
    const CATEGORY: string = 'UI';

    export interface IActions {
        CHANGED: string;
    }

    export const ActionTypes: IActions = {
        CHANGED: type(`${CATEGORY} Updated`),
    };

    export class ChangedAction implements Action {
        type = ActionTypes.CHANGED;

        constructor(public payload: UIState.IState) { }
    }

    export type Actions = ChangedAction;
}
