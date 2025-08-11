// src/components/ErrorBoundary.jsx
import React from 'react';
import useGameStore from '../stores/gameStore';

// Custom error types for different game situations
export class GameError extends Error {
  constructor(message, type = 'GENERAL') {
    super(message);
    this.name = 'GameError';
    this.type = type;
  }
}

export class PhysicsError extends GameError {
  constructor(message) {
    super(message, 'PHYSICS');
    this.name = 'PhysicsError';
  }
}

export class ScoreError extends GameError {
  constructor(message) {
    super(message, 'SCORE');
    this.name = 'ScoreError';
  }
}

export class NetworkError extends GameError {
  constructor(message) {
    super(message, 'NETWORK');
    this.name = 'NetworkError';
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tennis Game Error:', error);
    console.error('Error Details:', errorInfo);

    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
      lastErrorTime: Date.now()
    }));

    // Auto-recovery attempt for certain error types
    if (error instanceof GameError) {
      this.handleGameError(error);
    }
  }

  handleGameError(error) {
    switch(error.type) {
      case 'PHYSICS':
        // Try to reset physics state
        if (this.props.onPhysicsReset) {
          setTimeout(() => this.props.onPhysicsReset(), 1000);
        }
        break;
      case 'SCORE':
        // Try to recover score state
        if (this.props.onScoreReset) {
          setTimeout(() => this.props.onScoreReset(), 1000);
        }
        break;
      case 'NETWORK':
        // Attempt reconnection
        if (this.props.onReconnect) {
          setTimeout(() => this.props.onReconnect(), 2000);
        }
        break;
      default:
        // General game errors might need a full reset
        break;
    }
  }

  handleRetry = () => {
    const { error } = this.state;
    const timeSinceLastError = Date.now() - (this.state.lastErrorTime || 0);
    
    // Prevent rapid retry attempts
    if (timeSinceLastError < 2000) {
      return;
    }

    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      lastErrorTime: Date.now()
    });

    // Attempt recovery based on error type
    if (error instanceof GameError) {
      this.handleGameError(error);
    }

    // Call custom retry handler if provided
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleRestart = () => {
    // Reset the game store
    const resetGame = useGameStore.getState().resetGame;
    if (resetGame) {
      resetGame();
    }
    
    // Full page reload as last resort
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  renderErrorUI() {
    const { error, errorCount } = this.state;

    // Determine if this is a known game error or an unexpected error
    const isGameError = error?.name === 'GameError';
    const errorMessage = isGameError
      ? error.message
      : 'An unexpected error occurred in the game';

    return (
      <div className="error-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: '#2A2A2A',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)'
        }}>
          <h2 style={{ color: '#FF4444', marginBottom: '1rem' }}>
            Game Error
          </h2>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.4' }}>
            {errorMessage}
          </p>
          {errorCount < 3 && (
            <button
              onClick={this.handleRetry}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '1rem',
                fontSize: '1rem'
              }}
            >
              Try Again
            </button>
          )}
          <button
            onClick={this.handleRestart}
            style={{
              background: '#2196F3',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Restart Game
          </button>
          {!isGameError && (
            <p style={{ 
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#999'
            }}>
              If this problem persists, please try refreshing the page or checking your connection.
            </p>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export function withErrorBoundary(WrappedComponent, options = {}) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary 
        onPhysicsReset={options.onPhysicsReset}
        onScoreReset={options.onScoreReset}
        onReconnect={options.onReconnect}
        onRetry={options.onRetry}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;