import { topPlayers } from '../data/players';
import { useGameStore } from '../store/gameStore';

export default function PlayerSelection() {
  const { selectPlayer, startGame } = useGameStore();

  return (
    <div className="flex flex-col items-center h-screen bg-green-700 text-white p-4 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Choose Your Player</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {topPlayers.map((player) => (
          <div
            key={player.id}
            onClick={() => {
              selectPlayer(player);
              startGame();
            }}
            className="bg-white text-black p-4 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
          >
            <h3 className="text-xl font-bold">{player.name}</h3>
            <div className="text-sm mt-2 space-y-1">
              {Object.entries(player.attributes).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}