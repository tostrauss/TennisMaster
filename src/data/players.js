// src/data/players.js
export const courts = [
  {
    id: "australian_open",
    name: "Australian Open",
    location: "Melbourne",
    surface: "hard",
    color: "#0085CA",
    bounceHeight: 0.75,
    speed: 0.8,
    model: "court_ao.glb",
    ambient: "#87CEEB"
  },
  {
    id: "roland_garros",
    name: "Roland Garros",
    location: "Paris",
    surface: "clay",
    color: "#E25E31",
    bounceHeight: 0.6,
    speed: 0.55,
    model: "court_rg.glb",
    ambient: "#FFA07A"
  },
  {
    id: "wimbledon",
    name: "Wimbledon",
    location: "London",
    surface: "grass",
    color: "#2E8B57",
    bounceHeight: 0.85,
    speed: 0.95,
    model: "court_wimbledon.glb",
    ambient: "#90EE90"
  },
  {
    id: "us_open",
    name: "US Open",
    location: "New York",
    surface: "hard",
    color: "#1B4B9F",
    bounceHeight: 0.8,
    speed: 0.85,
    model: "court_uso.glb",
    ambient: "#4169E1"
  }
];

export const topPlayers = [
  {
    id: 1,
    name: "Novak Djokovic",
    country: "SRB",
    attributes: { speed: 95, power: 90, accuracy: 98, spin: 92, stamina: 96, volley: 88 }
  },
  {
    id: 2,
    name: "Carlos Alcaraz",
    country: "ESP",
    attributes: { speed: 94, power: 88, accuracy: 90, spin: 88, stamina: 92, volley: 85 }
  },
  {
    id: 3,
    name: "Daniil Medvedev",
    country: "RUS",
    attributes: { speed: 88, power: 85, accuracy: 92, spin: 86, stamina: 90, volley: 82 }
  },
  {
    id: 4,
    name: "Jannik Sinner",
    country: "ITA",
    attributes: { speed: 90, power: 88, accuracy: 89, spin: 87, stamina: 88, volley: 84 }
  },
  {
    id: 5,
    name: "Alexander Zverev",
    country: "GER",
    attributes: { speed: 87, power: 89, accuracy: 85, spin: 84, stamina: 88, volley: 82 }
  },
  {
    id: 6,
    name: "Andrey Rublev",
    country: "RUS",
    attributes: { speed: 86, power: 92, accuracy: 84, spin: 83, stamina: 87, volley: 80 }
  },
  {
    id: 7,
    name: "Holger Rune",
    country: "DEN",
    attributes: { speed: 88, power: 86, accuracy: 85, spin: 84, stamina: 86, volley: 81 }
  },
  {
    id: 8,
    name: "Hubert Hurkacz",
    country: "POL",
    attributes: { speed: 85, power: 88, accuracy: 86, spin: 83, stamina: 85, volley: 84 }
  },
  {
    id: 9,
    name: "Taylor Fritz",
    country: "USA",
    attributes: { speed: 86, power: 87, accuracy: 85, spin: 82, stamina: 84, volley: 81 }
  },
  {
    id: 10,
    name: "Stefanos Tsitsipas",
    country: "GRE",
    attributes: { speed: 87, power: 86, accuracy: 88, spin: 85, stamina: 86, volley: 83 }
  },
  {
    id: 11,
    name: "Casper Ruud",
    country: "NOR",
    attributes: { speed: 85, power: 84, accuracy: 87, spin: 88, stamina: 85, volley: 82 }
  },
  {
    id: 12,
    name: "Felix Auger-Aliassime",
    country: "CAN",
    attributes: { speed: 89, power: 90, accuracy: 84, spin: 83, stamina: 87, volley: 80 }
  },
  {
    id: 13,
    name: "Jakob Strauss", 
    country: "AUT",
    attributes: { speed: 82, power: 80, accuracy: 81, spin: 79, stamina: 83, volley: 78 }
  },
  {
    id: 14,
    name: "Tobias Strauss",
    country: "AUT",
    attributes: { speed: 81, power: 79, accuracy: 80, spin: 74, stamina: 82, volley: 89 }
  },
  {
    id: 15,
    name: "Alexander Bublik",
    country: "KAZ",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 80, stamina: 81, volley: 83 }
  }, 
  {
    id: 16,
    name: "Jiri Lehecka",
    country: "CZE",
    attributes: { speed: 83, power: 84, accuracy: 81, spin: 78, stamina: 80, volley: 82 }
  },
  {
    id: 17,
    name: "Sebastian Korda",
    country: "USA",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 79, stamina: 84, volley: 81 }
  },
  {
    id: 18,
    name: "Ben Shelton",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 84, spin: 82, stamina: 85, volley: 80 }
  },
  {
    id: 19,
    name: "Tommy Paul",
    country: "USA",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 80, stamina: 83, volley: 79 }
  },
  {
    id: 20,
    name: "Alex de Minaur",
    country: "AUS",
    attributes: { speed: 87, power: 84, accuracy: 85, spin: 81, stamina: 86, volley: 82 }
  },
  {
    id: 21,
    name: "Reilly Opelka",
    country: "USA",
    attributes: { speed: 82, power: 90, accuracy: 80, spin: 78, stamina: 81, volley: 84 }
  },
  {
    id: 22,
    name: "Aslan Karatsev",
    country: "RUS",
    attributes: { speed: 83, power: 88, accuracy: 82, spin: 79, stamina: 80, volley: 85 }
  },
  {
    id: 23,
    name: "Dan Evans",
    country: "GBR",
    attributes: { speed: 84, power: 82, accuracy: 83, spin: 80, stamina: 81, volley: 86 }
  },
  {
    id: 24,
    name: "Diego Schwartzman",
    country: "ARG",
    attributes: { speed: 85, power: 80, accuracy: 84, spin: 82, stamina: 83, volley: 79 }
  },
  {
    id: 25,
    name: "Grigor Dimitrov",
    country: "BUL",
    attributes: { speed: 86, power: 85, accuracy: 87, spin: 84, stamina: 82, volley: 88 }
  },
  {
    id: 26, 
    name: "Joao Fonseca",
    country: "BRA",
    attributes: { speed: 80, power: 92, accuracy: 85, spin: 78, stamina: 79, volley: 85 }
  },
  {
    id: 27,
    name: "Lorenzo Sonego",
    country: "ITA",
    attributes: { speed: 82, power: 88, accuracy: 84, spin: 80, stamina: 81, volley: 83 }
  },
  {
    id: 28,
    name: "Marton Fucsovics",
    country: "HUN",
    attributes: { speed: 81, power: 87, accuracy: 83, spin: 79, stamina: 80, volley: 84 }
  },
  {
    id: 29,
    name: "Nicolas Jarry",
    country: "CHI",
    attributes: { speed: 83, power: 90, accuracy: 82, spin: 81, stamina: 84, volley: 80 }
  },
  {
    id: 30,
    name: "Pablo Carreno Busta",
    country: "ESP",
    attributes: { speed: 84, power: 85, accuracy: 86, spin: 83, stamina: 82, volley: 81 }
  },
  {
    id: 31,
    name: "Roberto Bautista Agut",
    country: "ESP",
    attributes: { speed: 85, power: 84, accuracy: 87, spin: 82, stamina: 83, volley: 80 }
  },
  {
    id: 32,
    name: "Sebastian Baez",
    country: "ARG",
    attributes: { speed: 86, power: 83, accuracy: 85, spin: 81, stamina: 84, volley: 79 }
  },
  {
    id: 33,
    name: "Thanasi Kokkinakis",
    country: "AUS",
    attributes: { speed: 87, power: 88, accuracy: 84, spin: 80, stamina: 85, volley: 82 }
  },
  {
    id: 34,
    name: "Yannick Hanfmann",
    country: "GER",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 79, stamina: 84, volley: 81 }
  },
  {
    id: 35,
    name: "Zizou Bergs",
    country: "BEL",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 78, stamina: 83, volley: 80 }
  },
  {
    id: 36,
    name: "Nick Kyrgios",
    country: "AUS",
    attributes: { speed: 90, power: 95, accuracy: 88, spin: 87, stamina: 89, volley: 91 }
  },
  {
    id: 37,
    name: "Dominic Thiem",
    country: "AUT",
    attributes: { speed: 88, power: 92, accuracy: 90, spin: 89, stamina: 87, volley: 85 }
  },
  {
    id: 38,
    name: "Andreas Seppi",
    country: "ITA",
    attributes: { speed: 82, power: 84, accuracy: 83, spin: 81, stamina: 80, volley: 79 }
  },
  {
    id: 39,
    name: "Feliciano Lopez",
    country: "ESP",
    attributes: { speed: 83, power: 85, accuracy: 84, spin: 82, stamina: 81, volley: 80 }
  },
  {
    id: 40,
    name: "Fernando Verdasco",
    country: "ESP",
    attributes: { speed: 84, power: 86, accuracy: 85, spin: 83, stamina: 82, volley: 81 }
  },
  {
    id: 41,
    name: "David Goffin",
    country: "BEL",
    attributes: { speed: 85, power: 87, accuracy: 86, spin: 84, stamina: 83, volley: 82 }
  },
  {
    id: 42,
    name: "Alex Molcan",
    country: "SVK",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 81, stamina: 80, volley: 79 }
  }, 
  {
    id: 43,
    name: "Borna Coric",
    country: "CRO",
    attributes: { speed: 86, power: 88, accuracy: 85, spin: 82, stamina: 84, volley: 81 }
  },
  {
    id: 44,
    name: "Flavio Cobolli",
    country: "ITA",
    attributes: { speed: 85, power: 90, accuracy: 82, spin: 84, stamina: 81, volley: 88 }
  },
  {
    id: 45,
    name: "Lorenzo Musetti",
    country: "ITA",
    attributes: { speed: 87, power: 89, accuracy: 86, spin: 85, stamina: 84, volley: 83 }
  },
  {
    id: 46,
    name: "Tommy Robredo",
    country: "ESP",
    attributes: { speed: 84, power: 82, accuracy: 85, spin: 83, stamina: 80, volley: 79 }
  },
  {
    id: 47,
    name: "Pablo Andujar",
    country: "ESP",
    attributes: { speed: 83, power: 81, accuracy: 84, spin: 82, stamina: 79, volley: 78 }
  },
  {
    id: 48,
    name: "Albert Ramos-Vinolas",
    country: "ESP",
    attributes: { speed: 85, power: 83, accuracy: 86, spin: 84, stamina: 82, volley: 80 }
  },
  {
    id: 49,
    name: "Martina Trevisan",
    country: "ITA",
    attributes: { speed: 82, power: 80, accuracy: 81, spin: 79, stamina: 83, volley: 78 }
  },
  {
    id: 50,
    name: "Elena Rybakina",
    country: "KAZ",
    attributes: { speed: 88, power: 90, accuracy: 85, spin: 84, stamina: 87, volley: 86 }
  },
  {
    id: 51,
    name: "Aryna Sabalenka",
    country: "BLR",
    attributes: { speed: 89, power: 92, accuracy: 88, spin: 87, stamina: 90, volley: 85 }
  },
  {
    id: 52,
    name: "Iga Swiatek",
    country: "POL",
    attributes: { speed: 90, power: 91, accuracy: 89, spin: 88, stamina: 92, volley: 84 }
  },
  {
    id: 53,
    name: "Ons Jabeur",
    country: "TUN",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 83 }
  },
  {
    id: 54,
    name: "Jessica Pegula",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 85, spin: 84, stamina: 90, volley: 82 }
  },
  {
    id: 55,
    name: "Coco Gauff",
    country: "USA",
    attributes: { speed: 89, power: 90, accuracy: 88, spin: 87, stamina: 91, volley: 85 }
  },
  {
    id: 56,
    name: "Maria Sakkari",
    country: "GRE",
    attributes: { speed: 90, power: 89, accuracy: 87, spin: 86, stamina: 92, volley: 84 }
  },
  {
    id: 57,
    name: "Elina Svitolina",
    country: "UKR",
    attributes: { speed: 88, power: 86, accuracy: 85, spin: 84, stamina: 89, volley: 83 }
  },
  {
    id: 58,
    name: "Barbora Krejcikova",
    country: "CZE",
    attributes: { speed: 87, power: 85, accuracy: 84, spin: 83, stamina: 88, volley: 82 }
  },
  {
    id: 59,
    name: "Maria Sharapova",
    country: "RUS",
    attributes: { speed: 89, power: 93, accuracy: 90, spin: 88, stamina: 91, volley: 87 }
  },
  {
    id: 60,
    name: "Victoria Azarenka",
    country: "BLR",
    attributes: { speed: 88, power: 90, accuracy: 87, spin: 86, stamina: 89, volley: 85 }
  },
  {
    id: 61,
    name: "Angelique Kerber",
    country: "GER",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 90, volley: 84 }
  },
  {
    id: 62,
    name: "Karolína Plíšková",
    country: "CZE",
    attributes: { speed: 86, power: 89, accuracy: 85, spin: 84, stamina: 88, volley: 83 }
  },
  {
    id: 63,
    name: "Sofia Kenin",
    country: "USA",
    attributes: { speed: 85, power: 87, accuracy: 84, spin: 83, stamina: 86, volley: 82 }
  },
  {
    id: 64,
    name: "Elena Vesnina",
    country: "RUS",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 82, stamina: 85, volley: 81 }
  },
  {
    id: 65,
    name: "Daria Kasatkina",
    country: "RUS",
    attributes: { speed: 86, power: 84, accuracy: 85, spin: 83, stamina: 87, volley: 80 }
  },
  {
    id: 66,
    name: "Marketa Vondrousova",
    country: "CZE",
    attributes: { speed: 85, power: 83, accuracy: 84, spin: 82, stamina: 86, volley: 79 }
  },
  {
    id: 67,
    name: "Bianca Andreescu",
    country: "CAN",
    attributes: { speed: 87, power: 88, accuracy: 85, spin: 84, stamina: 89, volley: 82 }
  },
  {
    id: 68,
    name: "Leylah Fernandez",
    country: "CAN",
    attributes: { speed: 86, power: 87, accuracy: 84, spin: 83, stamina: 88, volley: 81 }
  },
  {
    id: 69,
    name: "Emma Raducanu",
    country: "GBR",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 82, stamina: 87, volley: 80 }
  },
  {
    id: 70,
    name: "Maria Osorio Serrano",
    country: "COL",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 81, stamina: 86, volley: 79 }
  },
  {
    id: 71,
    name: "Amanda Anisimova",
    country: "USA",
    attributes: { speed: 83, power: 84, accuracy: 81, spin: 80, stamina: 85, volley: 78 }
  },
  {
    id: 72,
    name: "Paula Badosa",
    country: "ESP",
    attributes: { speed: 86, power: 88, accuracy: 85, spin: 84, stamina: 87, volley: 82 }
  },
  {
    id: 73,
    name: "Joel Schwärzler",
    country: "AUT",
    attributes: { speed: 80, power: 78, accuracy: 79, spin: 77, stamina: 82, volley: 81 }
  },
  {
    id: 74,
    name: "Lukas Neumayer",
    country: "AUT",
    attributes: { speed: 81, power: 80, accuracy: 78, spin: 76, stamina: 83, volley: 80 }
  },
  {
    id: 75,
    name: "Maximilian Marterer",
    country: "GER",
    attributes: { speed: 82, power: 81, accuracy: 80, spin: 78, stamina: 84, volley: 79 }
  },
  {
    id: 76,
    name: "Nico Langmann",
    country: "AUT",
    attributes: { speed: 79, power: 77, accuracy: 78, spin: 75, stamina: 81, volley: 80 }
  },
  {
    id: 77,
    name: "Sebastian Ofner",
    country: "AUT",
    attributes: { speed: 80, power: 79, accuracy: 77, spin: 76, stamina: 82, volley: 81 }
  },
  {
    id: 78,
    name: "Filip Misolic",
    country: "AUT",
    attributes: { speed: 81, power: 80, accuracy: 79, spin: 77, stamina: 83, volley: 82 }
  },
  {
    id: 79,
    name: "Frances Tiafoe",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 85, spin: 84, stamina: 89, volley: 83 }
  },
  {
    id: 80,
    name: "Jenson Brooksby",
    country: "USA",
    attributes: { speed: 87, power: 86, accuracy: 84, spin: 83, stamina: 88, volley: 82 }
  },
  {
    id: 81,
    name: "Brandon Nakashima",
    country: "USA",
    attributes: { speed: 86, power: 85, accuracy: 83, spin: 82, stamina: 87, volley: 81 }
  },
  {
    id: 82,
    name: "Tommy Haas",
    country: "GER",
    attributes: { speed: 85, power: 84, accuracy: 82, spin: 81, stamina: 86, volley: 80 }
  },
  {
    id: 83,
    name: "Philipp Kohlschreiber",
    country: "GER",
    attributes: { speed: 84, power: 83, accuracy: 81, spin: 80, stamina: 85, volley: 79 }
  },
  {
    id: 84,
    name: "Jan-Lennard Struff",
    country: "GER",
    attributes: { speed: 83, power: 82, accuracy: 80, spin: 79, stamina: 84, volley: 78 }
  },
  {
    id: 85,
    name: "Rod Laver",
    country: "AUS",
    attributes: { speed: 90, power: 92, accuracy: 91, spin: 90, stamina: 93, volley: 89 }
  },
  {
    id: 86,
    name: "Bjorn Borg",
    country: "SWE",
    attributes: { speed: 88, power: 89, accuracy: 87, spin: 86, stamina: 90, volley: 85 }
  },
  {
    id: 87,
    name: "Andre Agassi",
    country: "USA",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 84 }
  },
  {
    id: 88,
    name: "Pete Sampras",
    country: "USA",
    attributes: { speed: 89, power: 90, accuracy: 88, spin: 87, stamina: 91, volley: 86 }
  },
  {
    id: 89,
    name: "Steffi Graf",
    country: "GER",
    attributes: { speed: 90, power: 91, accuracy: 89, spin: 88, stamina: 92, volley: 87 }
  },
  {
    id: 90,
    name: "Martina Navratilova",
    country: "USA",
    attributes: { speed: 88, power: 89, accuracy: 87, spin: 86, stamina: 90, volley: 85 }
  },
  {
    id: 91,
    name: "Chris Evert",
    country: "USA",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 84 }
  },
  {
    id: 92,
    name: "Billie Jean King",
    country: "USA",
    attributes: { speed: 86, power: 87, accuracy: 85, spin: 84, stamina: 88, volley: 83 }
  },
  {
    id: 93,
    name: "Margaret Court",
    country: "AUS",
    attributes: { speed: 85, power: 86, accuracy: 84, spin: 83, stamina: 87, volley: 82 }
  },
  {
    id: 94,
    name: "Arantxa Sanchez Vicario",
    country: "ESP",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 82, stamina: 86, volley: 81 }
  },
  {
    id: 95,
    name: "Martina Hingis",
    country: "SUI",
    attributes: { speed: 83, power: 84, accuracy: 82, spin: 81, stamina: 85, volley: 80 }
  },
  {
    id: 96,
    name: "Justine Henin",
    country: "BEL",
    attributes: { speed: 82, power: 83, accuracy: 81, spin: 80, stamina: 84, volley: 79 }
  },
];