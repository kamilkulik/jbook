import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      // const newKeys = Object.keys(state.data).filter((id) => id !== action.payload);
      // const filteredCellsArray = newKeys.map((cell) => {
      //   return [cell, state.data[cell]];
      // });
      // const newCellsObject = Object.fromEntries(filteredCellsArray);
      // const newCellOrder = state.order.filter((id) => id !== action.payload);
      // return {
      //   ...state,
      //   data: newCellsObject,
      //   order: newCellOrder,
      // };
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellState['data']);
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionType.INSERT_CELL_AFTER:
      // needs to handle corner case of null id
      // if (state.order.length > 0) {
      //   let orderArrayCopy = state.order;
      //   const indexOfNextCell = state.order.indexOf(action.payload.id);
      //   return {
      //     ...state,
      //     order: orderArrayCopy.splice(indexOfNextCell, 0, 'newId'),
      //   };
      // } else {
      //   return {
      //     ...state,
      //     order: ['newId'],
      //   };
      // }
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };
      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((id) => id === action.payload.id);

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    case ActionType.MOVE_CELL:
      // needs to handle illegal indexes first
      // const newOrderFunction = () => {
      //   let orderArrayCopy = state.order;
      //   const { direction, id } = action.payload;
      //   const currentCellIndex = state.order.indexOf(id);
      //   const prunedCellOrder = orderArrayCopy.filter((id) => id !== id);
      //   const order = prunedCellOrder.splice(direction === 'up' ? currentCellIndex - 1 : currentCellIndex + 1, 0, id);
      //   return order;
      // };
      // const order = newOrderFunction();
      // return {
      //   ...state,
      //   order,
      // };
      const { direction, id: cellId } = action.payload;
      const index = state.order.findIndex((id) => id === cellId);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = cellId;
      return state;
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;
      return state;
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
