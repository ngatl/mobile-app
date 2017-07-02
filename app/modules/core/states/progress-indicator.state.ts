export namespace ProgressIndicatorState {
    export interface IProgress {
        enabled: boolean;
        progress?: number;
        message?: string;
    }

    export interface IElementProgress extends IProgress {
        id?: string;
    }

    export interface IState {
        page?: IProgress;
        elements?: Array<IElementProgress>;
    }

    export const initialState: IState = {
        page:     {
            enabled: false,
        },
        elements: [],
    };
}
