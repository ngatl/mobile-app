import { UIState } from '../states';
import { UIActions } from '../actions/ui.action';

export function uiReducer(state: UIState.IState = UIState.initialState,
                          action: UIActions.Actions): UIState.IState {
    let changeState = () => {
        return Object.assign({}, state, action.payload);
    };
    switch ( action.type ) {
        case UIActions.ActionTypes.CHANGED:
            return changeState();
        default:
            return state;
    }
}
