import { createSlice } from '@reduxjs/toolkit';
import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  randomShape,
} from '../utils';

export const gameSlice = createSlice({
  name: 'game',
  initialState: defaultState(),
  reducers: {
    pause: () => {},
    resume: () => {},
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        state.x = x - 1;
      }
      return state;
    },
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state;
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        state.x = x + 1;
      }
      return state;
    },
    moveDown: (state) => {
      const { x, y, shape, grid, rotation, nextShape } = state;
      const maybeY = y + 1;

      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        state.y = maybeY;
        return state;
      }

      // Can't move down: lock block into grid
      const newGrid = addBlockToGrid(shape, grid, x, y, rotation);

      state.grid = newGrid;
      state.x = 3;
      state.y = -4;
      state.rotation = 0;
      state.shape = nextShape;
      state.nextShape = randomShape();

      // Game over check
      if (!canMoveTo(state.shape, newGrid, state.x, state.y, state.rotation)) {
        state.shape = 0;
        state.gameOver = true;
        return state;
      }

      state.score += checkRows(newGrid);
      return state;
    },
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state;
      const newRotation = nextRotation(shape, rotation);

      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }

      return state;
    },
    gameOver: () => {},
    restart: () => {}
  },
});

export const {
  pause, resume, moveLeft, moveRight,
  moveDown, rotate, gameOver, restart
} = gameSlice.actions;

export default gameSlice.reducer;