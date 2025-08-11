// src/components/Score.jsx
import React, { useState, useEffect } from 'react';
import { ScoreError } from './ErrorBoundary';

const Score = ({ player1Name = "Player 1", player2Name = "Player 2", score, servingPlayer }) => {
	if (!score) return null;

	const [error, setError] = useState(null);

	const validateScore = (scoreToValidate) => {
		const validPoints = [0, 15, 30, 40, 'AD'];
		if (!scoreToValidate.player1 || !scoreToValidate.player2) {
			throw new ScoreError('Invalid score object structure');
		}
		
		if (!validPoints.includes(scoreToValidate.player1.points) || !validPoints.includes(scoreToValidate.player2.points)) {
			throw new ScoreError('Invalid point value detected');
		}

		if (scoreToValidate.player1.games < 0 || scoreToValidate.player2.games < 0 || 
				scoreToValidate.player1.sets < 0 || scoreToValidate.player2.sets < 0) {
			throw new ScoreError('Invalid game or set count detected');
		}
	};

	useEffect(() => {
		try {
			validateScore(score);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error('Score validation error:', err);
		}
	}, [score]);

	if (error) {
		return <div style={{ color: 'red' }}>Score Error!</div>;
	}

  const formatScore = (playerScore) => {
    if (playerScore === 'AD') return 'AD';
    return playerScore === 0 ? '00' : playerScore;
  };

	return (
		<div style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '10px',
        minWidth: '280px',
        fontFamily: '"Courier New", Courier, monospace',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr style={{ color: '#aaa', fontSize: '12px' }}>
						<th style={{ textAlign: 'left', paddingBottom: '5px' }}>PLAYER</th>
						<th style={{ paddingBottom: '5px' }}>SETS</th>
						<th style={{ paddingBottom: '5px' }}>GAMES</th>
						<th style={{ paddingBottom: '5px' }}>POINTS</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ fontWeight: 'bold' }}>
						<td style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
							<span style={{ color: servingPlayer === 'player1' ? '#ffd700' : 'transparent', marginRight: '10px', fontSize: '20px' }}>●</span>
							{player1Name}
						</td>
						<td style={{ textAlign: 'center' }}>{score.player1.sets}</td>
						<td style={{ textAlign: 'center' }}>{score.player1.games}</td>
						<td style={{ textAlign: 'center' }}>{formatScore(score.player1.points)}</td>
					</tr>
					<tr style={{ fontWeight: 'bold' }}>
						<td style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
							<span style={{ color: servingPlayer === 'player2' ? '#ffd700' : 'transparent', marginRight: '10px', fontSize: '20px' }}>●</span>
							{player2Name}
						</td>
						<td style={{ textAlign: 'center' }}>{score.player2.sets}</td>
						<td style={{ textAlign: 'center' }}>{score.player2.games}</td>
						<td style={{ textAlign: 'center' }}>{formatScore(score.player2.points)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Score;