import React from 'react';
import { cn } from '../../lib/utils';

const CursorOverlay = ({ cursor, isOwn = false }) => {
  return (
    <div
      className={cn(
        "absolute pointer-events-none z-50 transition-all duration-100 ease-out",
        isOwn && "hidden"
      )}
      style={{
        left: cursor.x,
        top: cursor.y,
        transform: 'translate(-2px, -2px)'
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="drop-shadow-lg"
      >
        <path
          d="M2 2L18 8L8 10L6 18L2 2Z"
          fill={cursor.color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      {/* User name label */}
      <div
        className="absolute top-5 left-2 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap shadow-lg"
        style={{ backgroundColor: cursor.color }}
      >
        {cursor.userName}
      </div>
    </div>
  );
};

export default CursorOverlay;
