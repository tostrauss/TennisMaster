// src/components/Tournament.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { TOURNAMENTS, TournamentBracket, fullPlayerRoster } from '../data/tournaments';
import useGameStore from '../stores/gameStore';
import './Tournament.css';

const Tournament = () => {
  const [selectedTournament, setSelectedTournament] = useState(TOURNAMENTS.AUSTRALIAN_OPEN);
  const [bracket, setBracket] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  
  const { 
    player1: userPlayer, // The player the user selected initially
    lastMatchWinner,
    startTournamentMatch,
    setGamePhase
  } = useGameStore();

  // Initialize or update the bracket
  useEffect(() => {
    // If there's a winner from the last match, update the bracket state
    if (lastMatchWinner && bracket) {
      const updatedBracket = new TournamentBracket(selectedTournament, fullPlayerRoster);
      updatedBracket.matches = bracket.matches; // Preserve existing matches
      updatedBracket.currentRound = bracket.currentRound;

      // Find the match that just finished
      const lastRoundName = updatedBracket.rounds[updatedBracket.rounds.indexOf(currentRound) - 1];
      const finishedMatch = updatedBracket.matches[lastRoundName]?.find(m =>
        !m.completed && (m.player1.id === userPlayer.id || m.player2.id === userPlayer.id)
      );
      
      if (finishedMatch) {
        finishedMatch.winner = lastMatchWinner;
        finishedMatch.completed = true;
        // This is a placeholder score, a real implementation would get it from the game state
        finishedMatch.score = [[6,4], [6,3]];
      }
      
      setBracket(updatedBracket);
    } else {
      // Otherwise, create a new bracket
      const newBracket = new TournamentBracket(selectedTournament, fullPlayerRoster);
      newBracket.generateInitialBracket();
      setBracket(newBracket);
      setCurrentRound(newBracket.currentRound);
    }
  }, [selectedTournament, lastMatchWinner]);

  const userMatch = useMemo(() => {
    if (!bracket || !currentRound || !userPlayer) return null;
    return bracket.matches[currentRound]?.find(match => 
      !match.completed && (match.player1.id === userPlayer.id || match.player2.id === userPlayer.id)
    );
  }, [bracket, currentRound, userPlayer]);

  const simulateRound = () => {
    if (!bracket) return;
    bracket.matches[currentRound].forEach(match => {
      if (match.completed || match.player1.id === userPlayer.id || match.player2.id === userPlayer.id) {
        return; // Skip completed matches and the user's match
      }
      // Simple simulation
      const p1Score = Object.values(match.player1.attributes).reduce((a, b) => a + b, 0) + Math.random() * 20;
      const p2Score = Object.values(match.player2.attributes).reduce((a, b) => a + b, 0) + Math.random() * 20;
      match.winner = p1Score > p2Score ? match.player1 : match.player2;
      match.score = [[6, Math.floor(Math.random() * 5)], [6, Math.floor(Math.random() * 5)]];
      match.completed = true;
    });

    if (bracket.advanceRound()) {
      setCurrentRound(bracket.currentRound);
    }
    setBracket({ ...bracket });
  };

  const handlePlayMatch = () => {
    if (userMatch) {
      startTournamentMatch(userMatch);
    }
  };

  return (
    <div className="tournament">
      <div className="tournament-header">
        <h2>{selectedTournament.name}</h2>
        <button onClick={() => setGamePhase('menu')}>Exit Tournament</button>
      </div>
      
      <div className="tournament-controls">
        {userMatch ? (
          <button className="play-match-button" onClick={handlePlayMatch}>
            Play Your Match: {userPlayer.name} vs {userMatch.player1.id === userPlayer.id ? userMatch.player2.name : userMatch.player1.name}
          </button>
        ) : (
          <button onClick={simulateRound}>Simulate Next Round</button>
        )}
      </div>

      <div className="tournament-bracket">
        {bracket && bracket.rounds.map(roundName => (
            bracket.matches[roundName] && (
                <div key={roundName} className="round">
                    <h3>{roundName}</h3>
                    <div className="matches">
                        {bracket.matches[roundName].map((match, index) => (
                          <div className="match" key={index}>
                            <div className={`player ${match.winner?.id === match.player1.id ? 'winner' : ''}`}>
                              {match.player1.name}
                            </div>
                            <div className={`player ${match.winner?.id === match.player2.id ? 'winner' : ''}`}>
                              {match.player2.name}
                            </div>
                            {match.completed && <div className="score">Won</div>}
                          </div>
                        ))}
                    </div>
                </div>
            )
        ))}
      </div>
    </div>
  );
};

export default Tournament;