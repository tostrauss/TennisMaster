// src/data/tournaments.js
import { topPlayers } from './players';

// Tournament structure constants
export const TOURNAMENT_ROUNDS = {
  ROUND_128: 'Round of 128',
  ROUND_64: 'Round of 64',
  ROUND_32: 'Round of 32',
  ROUND_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter Finals',
  SEMI_FINALS: 'Semi Finals',
  FINALS: 'Finals'
};

export const TOURNAMENTS = {
  AUSTRALIAN_OPEN: {
    id: 'australian_open',
    name: 'Australian Open',
    location: 'Melbourne',
    surface: 'hard',
    prize: 3000000,
    points: 2000,
    seededPlayers: 32,
    monthPlayed: 1, // January
  },
  ROLAND_GARROS: {
    id: 'roland_garros',
    name: 'Roland Garros',
    location: 'Paris',
    surface: 'clay',
    prize: 2500000,
    points: 2000,
    seededPlayers: 32,
    monthPlayed: 5, // May
  },
  WIMBLEDON: {
    id: 'wimbledon',
    name: 'Wimbledon',
    location: 'London',
    surface: 'grass',
    prize: 3200000,
    points: 2000,
    seededPlayers: 32,
    monthPlayed: 7, // July
  },
  US_OPEN: {
    id: 'us_open',
    name: 'US Open',
    location: 'New York',
    surface: 'hard',
    prize: 3000000,
    points: 2000,
    seededPlayers: 32,
    monthPlayed: 9, // September
  }
};

// Generate remaining players to reach 128
const generateAdditionalPlayers = () => {
  const additionalPlayers = [];
  const existingCount = topPlayers.length;
  const neededCount = 128 - existingCount;

  const firstNames = [
    'Alexander', 'Adrian', 'Benjamin', 'Brandon', 'Daniel', 'David', 'Erik',
    'Felix', 'Gabriel', 'Henry', 'Ivan', 'James', 'Kevin', 'Lucas', 'Marcus',
    'Nathan', 'Oliver', 'Patrick', 'Robert', 'Samuel', 'Thomas', 'Victor',
    'William', 'Xavier', 'Yannick', 'Dominic', 'Sebastian', 'Marco', 'Lukas',
    'Michael', 'Andreas', 'Philipp', 'Martin', 'Christian', 'Stefan', 'Wolfgang',
    'Peter', 'Hans', 'Franz', 'Josef', 'Karl', 'Maximilian', 'Simon', 'Johannes',
    'Matthias'
  ];

  const lastNames = [
    'Anderson', 'Baker', 'Clark', 'Davis', 'Edwards', 'Fischer', 'Garcia',
    'Harris', 'Ibrahim', 'Johnson', 'King', 'Lopez', 'Martinez', 'Nelson',
    'Ortiz', 'Peterson', 'Quinn', 'Roberts', 'Smith', 'Thompson', 'Unger',
    'Valdez', 'Walker', 'Young', 'Zhang', 'Müller', 'Schmidt', 'Weber',
    'Wagner', 'Bauer', 'Hofer', 'Gruber', 'Pichler', 'Steiner', 'Maier',
    'Berger', 'Huber', 'Leitner', 'Koller', 'Moser'
  ];

  const countries = [
    'AUT', 'GER', 'SUI', 'FRA', 'ITA', 'ESP', 'GBR', 'USA', 'CAN', 'AUS',
    'JPN', 'KOR', 'CZE', 'SVK', 'CRO', 'SWE', 'NOR', 'FIN', 'NED', 'BEL'
  ];

  for (let i = 0; i < neededCount; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];

    let baseAttribute;
    if (country === 'AUT' || country === 'GER') {
      baseAttribute = Math.floor(Math.random() * 15) + 65;
    } else {
      baseAttribute = Math.floor(Math.random() * 20) + 60;
    }
    const variation = () => Math.floor(Math.random() * 10) - 5;

    additionalPlayers.push({
      id: existingCount + i + 1,
      name: `${firstName} ${lastName}`,
      country: country,
      attributes: {
        speed: Math.min(100, baseAttribute + variation()),
        power: Math.min(100, baseAttribute + variation()),
        accuracy: Math.min(100, baseAttribute + variation()),
        spin: Math.min(100, baseAttribute + variation()),
        stamina: Math.min(100, baseAttribute + variation()),
        volley: Math.min(100, baseAttribute + variation())
      },
      model: "player_generic.glb",
      ranking: existingCount + i + 1
    });
  }

  return additionalPlayers;
};

export const fullPlayerRoster = [
  ...topPlayers.map((player, index) => ({
    ...player,
    ranking: index + 1
  })),
  ...generateAdditionalPlayers()
];

export class TournamentMatch {
  constructor(player1, player2, round) {
    this.player1 = player1;
    this.player2 = player2;
    this.round = round;
    this.winner = null;
    this.score = null;
    this.completed = false;
  }
}

export class TournamentBracket {
  constructor(tournament, players) {
    this.tournament = tournament;
    this.players = [...players].sort((a, b) => a.ranking - b.ranking);
    this.matches = {};
    this.currentRound = TOURNAMENT_ROUNDS.ROUND_128;
    this.rounds = [
      TOURNAMENT_ROUNDS.ROUND_128, TOURNAMENT_ROUNDS.ROUND_64, TOURNAMENT_ROUNDS.ROUND_32,
      TOURNAMENT_ROUNDS.ROUND_16, TOURNAMENT_ROUNDS.QUARTER_FINALS,
      TOURNAMENT_ROUNDS.SEMI_FINALS, TOURNAMENT_ROUNDS.FINALS
    ];
  }

  generateInitialBracket() {
    const seededPlayers = this.players.slice(0, 32);
    const unseededPlayers = this.players.slice(32);
    
    for (let i = unseededPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unseededPlayers[i], unseededPlayers[j]] = [unseededPlayers[j], unseededPlayers[i]];
    }

    this.matches[TOURNAMENT_ROUNDS.ROUND_128] = [];
    
    const seededPositions = [
      0, 127, 32, 95, 16, 111, 48, 79, 8, 119, 40, 87, 24, 103, 56, 71,
      4, 123, 36, 91, 20, 107, 52, 75, 12, 115, 44, 83, 28, 99, 60, 67
    ];

    const bracket = new Array(128).fill(null);
    
    seededPlayers.forEach((player, index) => {
      bracket[seededPositions[index]] = player;
    });

    let unseededIndex = 0;
    for (let i = 0; i < 128; i++) {
      if (bracket[i] === null) {
        bracket[i] = unseededPlayers[unseededIndex++];
      }
    }

    for (let i = 0; i < 128; i += 2) {
      this.matches[TOURNAMENT_ROUNDS.ROUND_128].push(
        new TournamentMatch(bracket[i], bracket[i + 1], TOURNAMENT_ROUNDS.ROUND_128)
      );
    }
  }

  advanceRound() {
    const currentRoundIndex = this.rounds.indexOf(this.currentRound);
    if (currentRoundIndex >= this.rounds.length - 1) return false;

    const nextRound = this.rounds[currentRoundIndex + 1];
    this.matches[nextRound] = [];

    const winners = this.matches[this.currentRound].map(match => match.winner).filter(Boolean);

    for (let i = 0; i < winners.length; i += 2) {
      this.matches[nextRound].push(
        new TournamentMatch(winners[i], winners[i + 1], nextRound)
      );
    }

    this.currentRound = nextRound;
    return true;
  }
}

export const PRIZE_DISTRIBUTION = {
  [TOURNAMENT_ROUNDS.ROUND_128]: 0.0025,
  [TOURNAMENT_ROUNDS.ROUND_64]: 0.005,
  [TOURNAMENT_ROUNDS.ROUND_32]: 0.01,
  [TOURNAMENT_ROUNDS.ROUND_16]: 0.02,
  [TOURNAMENT_ROUNDS.QUARTER_FINALS]: 0.04,
  [TOURNAMENT_ROUNDS.SEMI_FINALS]: 0.08,
  [TOURNAMENT_ROUNDS.FINALS]: 0.2,
  'winner': 0.4
};