import { EventState } from '../states/event.state';
import { EventActions } from '../actions/event.action';

export function eventReducer(
    state: EventState.IState = EventState.initialState,
    action: EventActions.Actions
): EventState.IState {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case EventActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}
