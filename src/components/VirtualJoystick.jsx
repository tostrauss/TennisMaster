import React from 'react';
import { Joystick } from 'react-joystick-component';
import './GameMode.css'; // Optional: for styling, adjust as needed

const VirtualJoystick = ({ onMove, onStop }) => {
	return (
		<div className="virtual-joystick-container" style={{ position: 'absolute', bottom: 30, left: 30, zIndex: 100 }}>
			<Joystick
				size={80}
				baseColor="#eee"
				stickColor="#333"
				move={onMove}
				stop={onStop}
				throttle={100}
			/>
		</div>
	);
};

export default VirtualJoystick;
