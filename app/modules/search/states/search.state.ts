export namespace SearchState {
  export interface IState {
    searching: boolean;
    term?: string;
    results?: Array<any>;
    selected?: any;
  }

  export const initialState: IState = {
    searching: false
  };
}
