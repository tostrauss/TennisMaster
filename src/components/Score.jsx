import React from 'react';
import './GameMode.css'; // Optional: for styling, adjust as needed

import { ScoreError } from './ErrorBoundary';

const Score = ({ player1Name = "Player 1", player2Name = "Player 2", score }) => {
	if (!score) return null;

	// Error state
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			validateScore(score);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error('Score validation error:', err);
		}
	}, [score]);

	// Validate score state
	const validateScore = (score) => {
		const validPoints = [0, 15, 30, 40, 'AD'];
		if (!score.player1 || !score.player2) {
			throw new ScoreError('Invalid score object structure');
		}
		
		// Check for valid point values
		if (!validPoints.includes(score.player1.points) || !validPoints.includes(score.player2.points)) {
			throw new ScoreError('Invalid point value detected');
		}

		// Check for valid game counts
		if (score.player1.games < 0 || score.player2.games < 0 || 
				score.player1.games > 6 || score.player2.games > 6) {
			throw new ScoreError('Invalid game count detected');
		}

		// Check for valid set counts
		if (score.player1.sets < 0 || score.player2.sets < 0 || 
				score.player1.sets > 3 || score.player2.sets > 3) {
			throw new ScoreError('Invalid set count detected');
		}
	};

	// Validate score before rendering
	validateScore(score);

	return (
		<div className="scoreboard" style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: '12px 32px', minWidth: 300 }}>
			<table style={{ width: '100%', textAlign: 'center' }}>
				<thead>
					<tr>
						<th></th>
						<th>Points</th>
						<th>Games</th>
						<th>Sets</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><b>{player1Name}</b></td>
						<td>{score.player1.points}</td>
						<td>{score.player1.games}</td>
						<td>{score.player1.sets}</td>
					</tr>
					<tr>
						<td><b>{player2Name}</b></td>
						<td>{score.player2.points}</td>
						<td>{score.player2.games}</td>
						<td>{score.player2.sets}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Score;
