import { SearchState } from '../states/search.state';
import { SearchActions } from '../actions/search.action';

export function searchReducer(
    state: SearchState.IState = SearchState.initialState,
    action: SearchActions.Actions
): SearchState.IState {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case SearchActions.ActionTypes.UPDATED:
      return changeState();
    default:
      return state;
  }
}
