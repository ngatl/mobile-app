export namespace SpeakerState {
  export interface IState {
    list?: Array<any>;
    count?: number;
  }

  export const initialState: IState = {
    list: []
  };
}
