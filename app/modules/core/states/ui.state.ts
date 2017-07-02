import { ModalState } from './modal.state';
import { ProgressIndicatorState } from './progress-indicator.state';
import { LocaleState } from './locale.state';

export namespace UIState {
    export interface IState {
        locale?: LocaleState.Locale;
        modal?: ModalState.IState;
        progressIndicator?: ProgressIndicatorState.IState;
    }

    export const initialState: IState = {
        locale:            null,
        modal:             ModalState.initialState,
        progressIndicator: ProgressIndicatorState.initialState,
    };
}
