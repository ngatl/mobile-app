import { SponsorState } from '../states/sponsor.state';
import { SponsorActions } from '../actions/sponsor.action';

export function sponsorReducer(
    state: SponsorState.IState = SponsorState.initialState,
    action: SponsorActions.Actions
): SponsorState.IState {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case SponsorActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}
