// libs
import { ActionReducer, combineReducers, Action } from '@ngrx/store';

// app
import { type } from '../helpers/type';

// various app module state
import { uiReducer } from '../core/reducers';
import { UIState } from '../core/states';
import { searchReducer } from '../search/reducers';
import { SearchState } from '../search/states';
import { speakerReducer } from '../speakers/reducers';
import { SpeakerState } from '../speakers/states';
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
    search: SearchState.IState;
    speakers: SpeakerState.IState;
    user: UserState.IState;
    ui: UIState.IState;
}

const reducers = {
    search:     searchReducer,
    speakers:    speakerReducer,
    user:       userReducer,
    ui:         uiReducer,
};

const appStateReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function AppReducer(state: any,
                           action: any) {
    return appStateReducer(state, action);
}
