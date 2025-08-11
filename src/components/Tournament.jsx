import React, { useState, useEffect } from 'react';
import { TOURNAMENTS, TournamentBracket, TOURNAMENT_ROUNDS, fullPlayerRoster, PRIZE_DISTRIBUTION } from '../data/tournaments';
import useGameStore from '../stores/gameStore';

const Tournament = () => {
  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS.AUSTRALIAN_OPEN);
  const [bracket, setBracket] = useState(null);
  const [currentRound, setCurrentRound] = useState(TOURNAMENT_ROUNDS.ROUND_128);
  const { currentPlayer } = useGameStore();

  useEffect(() => {
    // Initialize tournament bracket
    const newBracket = new TournamentBracket(selectedTournament, fullPlayerRoster);
    newBracket.generateInitialBracket();
    setBracket(newBracket);
  }, [selectedTournament]);

  const simulateMatch = (match) => {
    if (match.completed) return;

    // If player is involved, don't simulate - wait for actual gameplay
    if (match.player1.id === currentPlayer?.id || match.player2.id === currentPlayer?.id) {
      return;
    }

    // Simple simulation based on player attributes
    const p1Score = calculatePlayerScore(match.player1);
    const p2Score = calculatePlayerScore(match.player2);

    match.winner = p1Score > p2Score ? match.player1 : match.player2;
    match.completed = true;
    
    // Generate realistic tennis score
    match.score = generateTennisScore(p1Score, p2Score);
  };

  const calculatePlayerScore = (player) => {
    const attributes = player.attributes;
    // Weight different attributes based on court surface
    const surfaceWeights = {
      clay: { speed: 0.8, power: 0.7, accuracy: 1, spin: 1.2, stamina: 1.3, volley: 0.7 },
      grass: { speed: 1.2, power: 1.1, accuracy: 1, spin: 0.8, stamina: 0.9, volley: 1.2 },
      hard: { speed: 1, power: 1, accuracy: 1, spin: 1, stamina: 1, volley: 1 }
    };

    const weights = surfaceWeights[selectedTournament.surface];
    
    return Object.keys(attributes).reduce((score, attr) => {
      return score + (attributes[attr] * weights[attr]);
    }, 0) + Math.random() * 50; // Add random factor for upsets
  };

  const generateTennisScore = (p1Score, p2Score) => {
    const sets = [];
    const scoreDiff = Math.abs(p1Score - p2Score);
    const totalSets = Math.min(5, 3 + Math.floor(scoreDiff / 100));
    
    for (let i = 0; i < totalSets; i++) {
      const stronger = p1Score > p2Score ? 0 : 1;
      const p1Games = stronger === 0 ? 6 : Math.floor(Math.random() * 5);
      const p2Games = stronger === 1 ? 6 : Math.floor(Math.random() * 5);
      sets.push([p1Games, p2Games]);
    }
    
    return sets;
  };

  const simulateRound = () => {
    if (!bracket) return;

    // Simulate all matches in current round
    bracket.matches[currentRound].forEach(match => {
      if (!match.completed) {
        simulateMatch(match);
      }
    });

    // Advance to next round
    if (bracket.advanceRound()) {
      setCurrentRound(bracket.currentRound);
    }
  };

  const renderMatch = (match) => {
    return (
      <div className="match" key={`${match.player1.id}-${match.player2.id}`}>
        <div className={`player ${match.winner?.id === match.player1.id ? 'winner' : ''}`}>
          {match.player1.name} [{match.player1.country}]
        </div>
        <div className={`player ${match.winner?.id === match.player2.id ? 'winner' : ''}`}>
          {match.player2.name} [{match.player2.country}]
        </div>
        {match.completed && match.score && (
          <div className="score">
            {match.score.map((set, i) => (
              <span key={i}>{set[0]}-{set[1]} </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tournament">
      <div className="tournament-header">
        <h2>{selectedTournament.name}</h2>
        <select 
          value={selectedTournament.id}
          onChange={(e) => setSelectedTournament(TOURNAMENTS[e.target.value])}
        >
          {Object.values(TOURNAMENTS).map(tournament => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tournament-controls">
        <button onClick={simulateRound}>
          Simulate {currentRound}
        </button>
      </div>

      <div className="tournament-bracket">
        {bracket && Object.entries(bracket.matches).map(([round, matches]) => (
          <div key={round} className="round">
            <h3>{round}</h3>
            <div className="matches">
              {matches.map(match => renderMatch(match))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournament;
