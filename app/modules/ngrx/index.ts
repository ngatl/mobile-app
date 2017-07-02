// libs
import { ActionReducer, combineReducers, Action } from '@ngrx/store';

// app
import { type } from '../helpers/type';

// various app module state
import { uiReducer } from '../core/reducers';
import { UIState } from '../core/states';
import { userReducer } from '../user/reducers';
import { UserState } from '../user/states';

export namespace AppActions {
    const CATEGORY: string = 'App';

    export interface IActions {
        NOOP: string;
    }

    export const ActionTypes: IActions = {
        NOOP: type(`${CATEGORY} Noop`),
    };

    export class NoopAction implements Action {
        type = ActionTypes.NOOP;
        payload: string = null;
    }

    export type Actions = NoopAction;
}

// overall shape of app state
export interface IAppState {
    user: UserState.IState;
    ui: UIState.IState;
}

const reducers = {
    user:       userReducer,
    ui:         uiReducer,
};

const appStateReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function AppReducer(state: any,
                           action: any) {
    return appStateReducer(state, action);
}
