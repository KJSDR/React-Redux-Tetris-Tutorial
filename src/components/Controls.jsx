import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveDown, moveLeft, moveRight, rotate } from '../features/gameSlice';

export default function Controls() {
  const dispatch = useDispatch();
  const { isRunning } = useSelector((state) => state);

  return (
    <div className="controls">
      {/* Left */}
      <button
        disabled={!isRunning}
        className="control-button"
        onClick={() => dispatch(moveLeft())}
      >
        Left
      </button>

      {/* Right */}
      <button
        disabled={!isRunning}
        className="control-button"
        onClick={() => dispatch(moveRight())}
      >
        Right
      </button>

      {/* Rotate */}
      <button
        disabled={!isRunning}
        className="control-button"
        onClick={() => dispatch(rotate())}
      >
        Rotate
      </button>

      {/* Down */}
      <button
        disabled={!isRunning}
        className="control-button"
        onClick={() => dispatch(moveDown())}
      >
        Down
      </button>
    </div>
  );
}