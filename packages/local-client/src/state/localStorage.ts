import { RootState } from './reducers';

export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('state');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (e) {
    console.log(e);
  }
};

export const persistState = (state: RootState) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('state', serialisedState);
  } catch (e) {
    // ignore
  }
};
