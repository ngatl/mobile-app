import { Action } from '@ngrx/store';
import { type } from '../../helpers';
import { LocaleState } from '../states';

export namespace LocaleActions {

    const CATEGORY: string = 'Locale';

    export interface IActions {
        INIT: string;
        SET: string;
    }

    export const ActionTypes: IActions = {
        INIT: type(`${CATEGORY} Init`),
        SET:  type(`${CATEGORY} Set`),
    };

    export class InitAction implements Action {
        type: string = ActionTypes.INIT;
        payload: string = null;
    }

    export class SetAction implements Action {
        type: string = ActionTypes.SET;

        constructor(public payload: LocaleState.Locale) { }
    }

    export type Actions =
        InitAction
        | SetAction;
}
