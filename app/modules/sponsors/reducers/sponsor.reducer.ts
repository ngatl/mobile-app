import { SponsorState } from '../states/sponsor.state';
import { SponsorActions } from '../actions/sponsor.action';

export function sponsorReducer(
    state: SponsorState.IState = SponsorState.initialState,
    action: SponsorActions.Actions
): SponsorState.IState {
  let changeState = (payload) => {
    return Object.assign({}, state, payload);
  };
  switch (action.type) {
    case SponsorActions.ActionTypes.API_ERROR:
      return changeState({
        errors: [
          action.payload,
          ...(state.errors || [])
        ]
      });
    case SponsorActions.ActionTypes.CHANGED:
      return changeState(action.payload);
    default:
      return state;
  }
}
