export namespace SponsorState {
  export interface IState {
    list?: Array<any>;
    count?: number;
    selected?: any;
    errors?: Array<any>;
  }

  export const initialState: IState = {
    list: [],
    errors: []
  };
}
