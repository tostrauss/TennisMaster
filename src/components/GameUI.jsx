import { useState } from 'react';
import { TennisCourt } from '../scenes/CourtScene';

export default function Game({ player }) {
  const [playerPos, setPlayerPos] = useState({ x: 0, z: -4 });
  const [ballPos, setBallPos] = useState({ x: 0, y: 1, z: 4 });

  const movePlayer = (dx, dz) => {
    setPlayerPos(prev => ({
      x: Math.max(-10, Math.min(10, prev.x + dx)),
      z: Math.max(-11, Math.min(-1, prev.z + dz))
    }));
  };

  const hitBall = (type) => {
    const force = type === 'topspin' ? 8 : type === 'slice' ? 6 : 4;
    const dir = { x: (Math.random() - 0.5) * 2, y: force, z: -force };
    setBallPos({
      x: playerPos.x + dir.x,
      y: dir.y,
      z: playerPos.z + dir.z
    });
  };

  return (
    <div className="relative w-full h-screen">
      <TennisCourt playerPosition={playerPos} ballPosition={ballPos} />

      {/* Virtual Joystick (simplified) */}
      <div className="absolute bottom-20 left-8 w-20 h-20 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center">
        <button
          onTouchStart={() => movePlayer(0, -0.5)}
          className="text-white text-xl"
        >
          ↑
        </button>
        <button
          onTouchStart={() => movePlayer(-0.5, 0)}
          className="text-white text-xl"
        >
          ←
        </button>
        <button
          onTouchStart={() => movePlayer(0.5, 0)}
          className="text-white text-xl"
        >
          →
        </button>
        <button
          onTouchStart={() => movePlayer(0, 0.5)}
          className="text-white text-xl"
        >
          ↓
        </button>
      </div>

      {/* Shot Buttons */}
      <div className="absolute bottom-8 right-4 space-y-2">
        <button
          onClick={() => hitBall('topspin')}
          className="block bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Topspin
        </button>
        <button
          onClick={() => hitBall('slice')}
          className="block bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Slice
        </button>
        <button
          onClick={() => hitBall('lob')}
          className="block bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Lob
        </button>
      </div>

      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
        Player: {player?.name}
      </div>
    </div>
  );
}