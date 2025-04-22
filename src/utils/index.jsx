export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const gridDefault = () => {
  const rows = 18;
  const cols = 10;
  const array = [];
  for (let row = 0; row < rows; row++) {
    array.push([]);
    for (let col = 0; col < cols; col++) {
      array[row].push(0);
    }
  }
  return array;
};

export const shapes = [
  // none
  [
    [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],

  // I
  [
    [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]]],

  // T
  [
    [
      [0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],

    [
      [0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

  // L
  [
    [
      [0,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0]],

    [
      [1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]]],

  // J
  [
    [
      [1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],

    [
      [0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],

    [
      [0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]]],

  // Z
  [
    [
      [0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],

    [
      [0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],

  // S
  [
    [
      [0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],

    [
      [0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],

  // O
  [
    [
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]]]
];

// Pick a random shape index (skip index 0)
export const randomShape = () => {
  return random(1, shapes.length - 1);
};

export const defaultState = () => {
  return {
    grid: gridDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 1000,
    gameOver: false,
    level: 1
  };
};

// Return the next rotation index for a shape
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length;
};

// Check if a shape can move to x, y with a given rotation
export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];

  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x;
        const proposedY = row + y;

        if (proposedY < 0) continue;

        const possibleRow = grid[proposedY];

        if (
          !possibleRow ||
          possibleRow[proposedX] === undefined ||
          possibleRow[proposedX] !== 0
        ) {
          return false;
        }
      }
    }
  }

  return true;
};