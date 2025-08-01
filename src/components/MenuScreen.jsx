import { useGameStore } from '../store/gameStore';

export default function MenuScreen() {
  const { setPhase } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-600 to-green-800 text-white">
      <h1 className="text-5xl font-bold mb-10">🎾 TennisMaster</h1>
      <button
        onClick={() => setPhase('select')}
        className="bg-blue-600 px-8 py-4 rounded-xl text-xl mb-4 shadow-lg"
      >
        Start Single Player
      </button>
      <button
        onClick={() => alert('Multiplayer coming soon!')}
        className="bg-gray-600 px-8 py-4 rounded-xl text-xl opacity-70"
      >
        Play Multiplayer
      </button>
    </div>
  );
}