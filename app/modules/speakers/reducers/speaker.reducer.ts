import { SpeakerState } from '../states/speaker.state';
import { SpeakerActions } from '../actions/speaker.action';

export function speakerReducer(
    state: SpeakerState.IState = SpeakerState.initialState,
    action: SpeakerActions.Actions
): SpeakerState.IState {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case SpeakerActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}
