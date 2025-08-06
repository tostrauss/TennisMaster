export const courts = [
  {
    id: "australian_open",
    name: "Australian Open",
    location: "Melbourne",
    surface: "hard",
    color: "#0085CA",
    bounceHeight: 0.8,
    speed: 0.75,
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
    speed: 0.5,
    model: "court_rg.glb",
    ambient: "#FFA07A"
  },
  {
    id: "wimbledon",
    name: "Wimbledon",
    location: "London",
    surface: "grass",
    color: "#2E8B57",
    bounceHeight: 0.7,
    speed: 0.9,
    model: "court_wimbledon.glb",
    ambient: "#90EE90"
  },
  {
    id: "us_open",
    name: "US Open",
    location: "New York",
    surface: "hard",
    color: "#1B4B9F",
    bounceHeight: 0.75,
    speed: 0.8,
    model: "court_uso.glb",
    ambient: "#4169E1"
  }
];

export const topPlayers = [
  {
    id: 1,
    name: "Novak Djokovic",
    country: "SRB",
    attributes: { speed: 95, power: 90, accuracy: 98, spin: 92, stamina: 96, volley: 88 },
    model: "player_djokovic.glb"
  },
  {
    id: 2,
    name: "Carlos Alcaraz",
    country: "ESP",
    attributes: { speed: 94, power: 88, accuracy: 90, spin: 88, stamina: 92, volley: 85 },
    model: "player_alcaraz.glb"
  },
  {
    id: 3,
    name: "Daniil Medvedev",
    country: "RUS",
    attributes: { speed: 88, power: 85, accuracy: 92, spin: 86, stamina: 90, volley: 82 },
    model: "player_medvedev.glb"
  },
  {
    id: 4,
    name: "Jannik Sinner",
    country: "ITA",
    attributes: { speed: 90, power: 88, accuracy: 89, spin: 87, stamina: 88, volley: 84 },
    model: "player_sinner.glb"
  },
  {
    id: 5,
    name: "Alexander Zverev",
    country: "GER",
    attributes: { speed: 87, power: 89, accuracy: 85, spin: 84, stamina: 88, volley: 82 },
    model: "player_zverev.glb"
  },
  {
    id: 6,
    name: "Andrey Rublev",
    country: "RUS",
    attributes: { speed: 86, power: 92, accuracy: 84, spin: 83, stamina: 87, volley: 80 },
    model: "player_rublev.glb"
  },
  {
    id: 7,
    name: "Holger Rune",
    country: "DEN",
    attributes: { speed: 88, power: 86, accuracy: 85, spin: 84, stamina: 86, volley: 81 },
    model: "player_rune.glb"
  },
  {
    id: 8,
    name: "Hubert Hurkacz",
    country: "POL",
    attributes: { speed: 85, power: 88, accuracy: 86, spin: 83, stamina: 85, volley: 84 },
    model: "player_hurkacz.glb"
  },
  {
    id: 9,
    name: "Taylor Fritz",
    country: "USA",
    attributes: { speed: 86, power: 87, accuracy: 85, spin: 82, stamina: 84, volley: 81 },
    model: "player_fritz.glb"
  },
  {
    id: 10,
    name: "Stefanos Tsitsipas",
    country: "GRE",
    attributes: { speed: 87, power: 86, accuracy: 88, spin: 85, stamina: 86, volley: 83 },
    model: "player_tsitsipas.glb"
  },
  {
    id: 11,
    name: "Casper Ruud",
    country: "NOR",
    attributes: { speed: 85, power: 84, accuracy: 87, spin: 88, stamina: 85, volley: 82 },
    model: "player_ruud.glb"
  },
  {
    id: 12,
    name: "Felix Auger-Aliassime",
    country: "CAN",
    attributes: { speed: 89, power: 90, accuracy: 84, spin: 83, stamina: 87, volley: 80 },
    model: "player_augers.glb"
  },
  {
    id: 13,
    name: "Jakob Strauss", 
    country: "AUT",
    attributes: { speed: 82, power: 80, accuracy: 81, spin: 79, stamina: 83, volley: 78 },
    model: "player_strauss.glb"
  },
  {
    id: 14,
    name: "Tobias Strauss",
    country: "AUT",
    attributes: { speed: 81, power: 79, accuracy: 80, spin: 74, stamina: 82, volley: 89 },
    model: "player_strauss.glb"
  },
  {
    id: 15,
    name: "Alexander Bublik",
    country: "KAZ",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 80, stamina: 81, volley: 83 },
    model: "player_bublik.glb"
  }, 
  {
    id: 16,
    name: "Jiri Lehecka",
    country: "CZE",
    attributes: { speed: 83, power: 84, accuracy: 81, spin: 78, stamina: 80, volley: 82 },
    model: "player_lehecka.glb"
  },
  {
    id: 17,
    name: "Sebastian Korda",
    country: "USA",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 79, stamina: 84, volley: 81 },
    model: "player_korda.glb"
  },
  {
    id: 18,
    name: "Ben Shelton",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 84, spin: 82, stamina: 85, volley: 80 },
    model: "player_shelton.glb"
  },
  {
    id: 19,
    name: "Tommy Paul",
    country: "USA",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 80, stamina: 83, volley: 79 },
    model: "player_paul.glb"
  },
  {
    id: 20,
    name: "Alex de Minaur",
    country: "AUS",
    attributes: { speed: 87, power: 84, accuracy: 85, spin: 81, stamina: 86, volley: 82 },
    model: "player_deminaur.glb"
  },
  {
    id: 21,
    name: "Reilly Opelka",
    country: "USA",
    attributes: { speed: 82, power: 90, accuracy: 80, spin: 78, stamina: 81, volley: 84 },
    model: "player_opelka.glb"
  },
  {
    id: 22,
    name: "Aslan Karatsev",
    country: "RUS",
    attributes: { speed: 83, power: 88, accuracy: 82, spin: 79, stamina: 80, volley: 85 },
    model: "player_karatsev.glb"
  },
  {
    id: 23,
    name: "Dan Evans",
    country: "GBR",
    attributes: { speed: 84, power: 82, accuracy: 83, spin: 80, stamina: 81, volley: 86 },
    model: "player_evans.glb"
  },
  {
    id: 24,
    name: "Diego Schwartzman",
    country: "ARG",
    attributes: { speed: 85, power: 80, accuracy: 84, spin: 82, stamina: 83, volley: 79 },
    model: "player_schwartzman.glb"
  },
  {
    id: 25,
    name: "Grigor Dimitrov",
    country: "BUL",
    attributes: { speed: 86, power: 85, accuracy: 87, spin: 84, stamina: 82, volley: 88 },
    model: "player_dimitrov.glb"
  },
  {
    id: 26, 
    name: "Joao Fonseca",
    country: "BRA",
    attributes: { speed: 80, power: 92, accuracy: 85, spin: 78, stamina: 79, volley: 85 },
    model: "player_fonseca.glb"
  },
  {
    id: 27,
    name: "Lorenzo Sonego",
    country: "ITA",
    attributes: { speed: 82, power: 88, accuracy: 84, spin: 80, stamina: 81, volley: 83 },
    model: "player_sonego.glb"
  },
  {
    id: 28,
    name: "Marton Fucsovics",
    country: "HUN",
    attributes: { speed: 81, power: 87, accuracy: 83, spin: 79, stamina: 80, volley: 84 },
    model: "player_fucsovics.glb"
  },
  {
    id: 29,
    name: "Nicolas Jarry",
    country: "CHI",
    attributes: { speed: 83, power: 90, accuracy: 82, spin: 81, stamina: 84, volley: 80 },
    model: "player_jarry.glb"
  },
  {
    id: 30,
    name: "Pablo Carreno Busta",
    country: "ESP",
    attributes: { speed: 84, power: 85, accuracy: 86, spin: 83, stamina: 82, volley: 81 },
    model: "player_carreno.glb"
  },
  {
    id: 31,
    name: "Roberto Bautista Agut",
    country: "ESP",
    attributes: { speed: 85, power: 84, accuracy: 87, spin: 82, stamina: 83, volley: 80 },
    model: "player_bautista.glb"
  },
  {
    id: 32,
    name: "Sebastian Baez",
    country: "ARG",
    attributes: { speed: 86, power: 83, accuracy: 85, spin: 81, stamina: 84, volley: 79 },
    model: "player_baez.glb"
  },
  {
    id: 33,
    name: "Thanasi Kokkinakis",
    country: "AUS",
    attributes: { speed: 87, power: 88, accuracy: 84, spin: 80, stamina: 85, volley: 82 },
    model: "player_kokkinakis.glb"
  },
  {
    id: 34,
    name: "Yannick Hanfmann",
    country: "GER",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 79, stamina: 84, volley: 81 },
    model: "player_hanfmann.glb"
  },
  {
    id: 35,
    name: "Zizou Bergs",
    country: "BEL",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 78, stamina: 83, volley: 80 },
    model: "player_bergs.glb"
  },
  {
  id: 36,
  name: "Nick Kyrgios",
  country: "AUS",
  attributes: { speed: 90, power: 95, accuracy: 88, spin: 87, stamina: 89, volley: 91 },
  model: "player_kyrgios.glb"
  },
  {
    id: 37,
    name: "Dominic Thiem",
    country: "AUT",
    attributes: { speed: 88, power: 92, accuracy: 90, spin: 89, stamina: 87, volley: 85 },
    model: "player_thiem.glb"
  },
  {
    id: 38,
    name: "Andreas Seppi",
    country: "ITA",
    attributes: { speed: 82, power: 84, accuracy: 83, spin: 81, stamina: 80, volley: 79 },
    model: "player_seppi.glb"
  },
  {
    id: 39,
    name: "Feliciano Lopez",
    country: "ESP",
    attributes: { speed: 83, power: 85, accuracy: 84, spin: 82, stamina: 81, volley: 80 },
    model: "player_lopez.glb"
  },
  {
    id: 40,
    name: "Fernando Verdasco",
    country: "ESP",
    attributes: { speed: 84, power: 86, accuracy: 85, spin: 83, stamina: 82, volley: 81 },
    model: "player_verdasco.glb"
  },
  {
    id: 41,
    name: "David Goffin",
    country: "BEL",
    attributes: { speed: 85, power: 87, accuracy: 86, spin: 84, stamina: 83, volley: 82 },
    model: "player_goffin.glb"
  },
  {
    id: 42,
    name: "Alex Molcan",
    country: "SVK",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 81, stamina: 80, volley: 79 },
    model: "player_molcan.glb"
  }, 
  {
    id: 43,
    name: "Borna Coric",
    country: "CRO",
    attributes: { speed: 86, power: 88, accuracy: 85, spin: 82, stamina: 84, volley: 81 },
    model: "player_coric.glb"
  },
  {
    id: 44,
    name: "Flavio Cobolli",
    country: "ITA",
    attributes: { speed: 85, power: 90, accuracy: 82, spin: 84, stamina: 81, volley: 88 },
    model: "player_cobolli.glb"
  },
  {
    id: 45,
    name: "Lorenzo Musetti",
    country: "ITA",
    attributes: { speed: 87, power: 89, accuracy: 86, spin: 85, stamina: 84, volley: 83 },
    model: "player_musetti.glb"
  },
  {
    id: 46,
    name: "Tommy Robredo",
    country: "ESP",
    attributes: { speed: 84, power: 82, accuracy: 85, spin: 83, stamina: 80, volley: 79 },
    model: "player_robredo.glb"
  },
  {
    id: 47,
    name: "Pablo Andujar",
    country: "ESP",
    attributes: { speed: 83, power: 81, accuracy: 84, spin: 82, stamina: 79, volley: 78 },
    model: "player_andujar.glb"
  },
  {
    id: 48,
    name: "Albert Ramos-Vinolas",
    country: "ESP",
    attributes: { speed: 85, power: 83, accuracy: 86, spin: 84, stamina: 82, volley: 80 },
    model: "player_ramos.glb"
  },
  {
    id: 49,
    name: "Martina Trevisan",
    country: "ITA",
    attributes: { speed: 82, power: 80, accuracy: 81, spin: 79, stamina: 83, volley: 78 },
    model: "player_trevisan.glb"
  },
  {
    id: 50,
    name: "Elena Rybakina",
    country: "KAZ",
    attributes: { speed: 88, power: 90, accuracy: 85, spin: 84, stamina: 87, volley: 86 },
    model: "player_rybakina.glb"
  },
  {
    id: 51,
    name: "Aryna Sabalenka",
    country: "BLR",
    attributes: { speed: 89, power: 92, accuracy: 88, spin: 87, stamina: 90, volley: 85 },
    model: "player_sabalenka.glb" 
  },
  {
    id: 52,
    name: "Iga Swiatek",
    country: "POL",
    attributes: { speed: 90, power: 91, accuracy: 89, spin: 88, stamina: 92, volley: 84 },
    model: "player_swiatek.glb"
  },
  {
    id: 53,
    name: "Ons Jabeur",
    country: "TUN",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 83 },
    model: "player_jabeur.glb"
  },
  {
    id: 54,
    name: "Jessica Pegula",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 85, spin: 84, stamina: 90, volley: 82 },
    model: "player_pegula.glb"
  },
  {
    id: 55,
    name: "Coco Gauff",
    country: "USA",
    attributes: { speed: 89, power: 90, accuracy: 88, spin: 87, stamina: 91, volley: 85 },
    model: "player_gauff.glb"
  },
  {
    id: 56,
    name: "Maria Sakkari",
    country: "GRE",
    attributes: { speed: 90, power: 89, accuracy: 87, spin: 86, stamina: 92, volley: 84 },
    model: "player_sakkari.glb"
  },
  {
    id: 57,
    name: "Elina Svitolina",
    country: "UKR",
    attributes: { speed: 88, power: 86, accuracy: 85, spin: 84, stamina: 89, volley: 83 },
    model: "player_svitolina.glb"
  },
  {
    id: 58,
    name: "Barbora Krejcikova",
    country: "CZE",
    attributes: { speed: 87, power: 85, accuracy: 84, spin: 83, stamina: 88, volley: 82 },
    model: "player_krejcikova.glb"
  },
  {
    id: 59,
    name: "Maria Sharapova",
    country: "RUS",
    attributes: { speed: 89, power: 93, accuracy: 90, spin: 88, stamina: 91, volley: 87 },
    model: "player_sharapova.glb"
  },
  {
    id: 60,
    name: "Victoria Azarenka",
    country: "BLR",
    attributes: { speed: 88, power: 90, accuracy: 87, spin: 86, stamina: 89, volley: 85 },
    model: "player_azarenka.glb"
  },
  {
    id: 61,
    name: "Angelique Kerber",
    country: "GER",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 90, volley: 84 },
    model: "player_kerber.glb"
  },
  {
    id: 62,
    name: "Karolína Plíšková",
    country: "CZE",
    attributes: { speed: 86, power: 89, accuracy: 85, spin: 84, stamina: 88, volley: 83 },
    model: "player_pliskova.glb"
  },
  {
    id: 63,
    name: "Sofia Kenin",
    country: "USA",
    attributes: { speed: 85, power: 87, accuracy: 84, spin: 83, stamina: 86, volley: 82 },
    model: "player_kenin.glb"
  },
  {
    id: 64,
    name: "Elena Vesnina",
    country: "RUS",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 82, stamina: 85, volley: 81 },
    model: "player_vesnina.glb"
  },
  {
    id: 65,
    name: "Daria Kasatkina",
    country: "RUS",
    attributes: { speed: 86, power: 84, accuracy: 85, spin: 83, stamina: 87, volley: 80 },
    model: "player_kasatkina.glb"
  },
  {
    id: 66,
    name: "Marketa Vondrousova",
    country: "CZE",
    attributes: { speed: 85, power: 83, accuracy: 84, spin: 82, stamina: 86, volley: 79 },
    model: "player_vondrousova.glb"
  },
  {
    id: 67,
    name: "Bianca Andreescu",
    country: "CAN",
    attributes: { speed: 87, power: 88, accuracy: 85, spin: 84, stamina: 89, volley: 82 },
    model: "player_andreescu.glb"
  },
  {
    id: 68,
    name: "Leylah Fernandez",
    country: "CAN",
    attributes: { speed: 86, power: 87, accuracy: 84, spin: 83, stamina: 88, volley: 81 },
    model: "player_fernandez.glb"
  },
  {
    id: 69,
    name: "Emma Raducanu",
    country: "GBR",
    attributes: { speed: 85, power: 86, accuracy: 83, spin: 82, stamina: 87, volley: 80 },
    model: "player_raducanu.glb"
  },
  {
    id: 70,
    name: "Maria Osorio Serrano",
    country: "COL",
    attributes: { speed: 84, power: 85, accuracy: 82, spin: 81, stamina: 86, volley: 79 },
    model: "player_osorio.glb"
  },
  {
    id: 71,
    name: "Amanda Anisimova",
    country: "USA",
    attributes: { speed: 83, power: 84, accuracy: 81, spin: 80, stamina: 85, volley: 78 },
    model: "player_anisimova.glb"
  },
  {
    id: 72,
    name: "Paula Badosa",
    country: "ESP",
    attributes: { speed: 86, power: 88, accuracy: 85, spin: 84, stamina: 87, volley: 82 },
    model: "player_badosa.glb"
  },
  {
    id: 73,
    name: "Joel Schwärzler",
    country: "AUT",
    attributes: { speed: 80, power: 78, accuracy: 79, spin: 77, stamina: 82, volley: 81 },
    model: "player_schwarzler.glb"
  },
  {
    id: 74,
    name: "Lukas Neumayer",
    country: "AUT",
    attributes: { speed: 81, power: 80, accuracy: 78, spin: 76, stamina: 83, volley: 80 },
    model: "player_neumayer.glb"
  },
  {
    id: 75,
    name: "Maximilian Marterer",
    country: "GER",
    attributes: { speed: 82, power: 81, accuracy: 80, spin: 78, stamina: 84, volley: 79 },
    model: "player_marterer.glb"
  },
  {
    id: 76,
    name: "Nico Langmann",
    country: "AUT",
    attributes: { speed: 79, power: 77, accuracy: 78, spin: 75, stamina: 81, volley: 80 },
    model: "player_langmann.glb"
  },
  {
    id: 77,
    name: "Sebastian Ofner",
    country: "AUT",
    attributes: { speed: 80, power: 79, accuracy: 77, spin: 76, stamina: 82, volley: 81 },
    model: "player_ofner.glb"
  },
  {
    id: 78,
    name: "Filip Misolic",
    country: "AUT",
    attributes: { speed: 81, power: 80, accuracy: 79, spin: 77, stamina: 83, volley: 82 },
    model: "player_misolic.glb"
  },
  {
    id: 79,
    name: "Frances Tiafoe",
    country: "USA",
    attributes: { speed: 88, power: 87, accuracy: 85, spin: 84, stamina: 89, volley: 83 },
    model: "player_tiafoe.glb"
  },
  {
    id: 80,
    name: "Jenson Brooksby",
    country: "USA",
    attributes: { speed: 87, power: 86, accuracy: 84, spin: 83, stamina: 88, volley: 82 },
    model: "player_brooksby.glb"
  },
  {
    id: 81,
    name: "Brandon Nakashima",
    country: "USA",
    attributes: { speed: 86, power: 85, accuracy: 83, spin: 82, stamina: 87, volley: 81 },
    model: "player_nakashima.glb"
  },
  {
    id: 82,
    name: "Tommy Haas",
    country: "GER",
    attributes: { speed: 85, power: 84, accuracy: 82, spin: 81, stamina: 86, volley: 80 },
    model: "player_haas.glb"
  },
  {
    id: 83,
    name: "Philipp Kohlschreiber",
    country: "GER",
    attributes: { speed: 84, power: 83, accuracy: 81, spin: 80, stamina: 85, volley: 79 },
    model: "player_kohlschreiber.glb"
  },
  {
    id: 84,
    name: "Jan-Lennard Struff",
    country: "GER",
    attributes: { speed: 83, power: 82, accuracy: 80, spin: 79, stamina: 84, volley: 78 },
    model: "player_struff.glb"
  },
  {
    id: 85,
    name: "Rod Laver",
    country: "AUS",
    attributes: { speed: 90, power: 92, accuracy: 91, spin: 90, stamina: 93, volley: 89 },
    model: "player_laver.glb"
  },
  {
    id: 86,
    name: "Bjorn Borg",
    country: "SWE",
    attributes: { speed: 88, power: 89, accuracy: 87, spin: 86, stamina: 90, volley: 85 },
    model: "player_borg.glb"
  },
  {
    id: 87,
    name: "Andre Agassi",
    country: "USA",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 84 },
    model: "player_agassi.glb"
  },
  {
    id: 88,
    name: "Pete Sampras",
    country: "USA",
    attributes: { speed: 89, power: 90, accuracy: 88, spin: 87, stamina: 91, volley: 86 },
    model: "player_sampras.glb"
  },
  {
    id: 89,
    name: "Steffi Graf",
    country: "GER",
    attributes: { speed: 90, power: 91, accuracy: 89, spin: 88, stamina: 92, volley: 87 },
    model: "player_graf.glb"
  },
  {
    id: 90,
    name: "Martina Navratilova",
    country: "USA",
    attributes: { speed: 88, power: 89, accuracy: 87, spin: 86, stamina: 90, volley: 85 },
    model: "player_navratilova.glb"
  },
  {
    id: 91,
    name: "Chris Evert",
    country: "USA",
    attributes: { speed: 87, power: 88, accuracy: 86, spin: 85, stamina: 89, volley: 84 },
    model: "player_evert.glb"
  },
  {
    id: 92,
    name: "Billie Jean King",
    country: "USA",
    attributes: { speed: 86, power: 87, accuracy: 85, spin: 84, stamina: 88, volley: 83 },
    model: "player_king.glb"
  },
  {
    id: 93,
    name: "Margaret Court",
    country: "AUS",
    attributes: { speed: 85, power: 86, accuracy: 84, spin: 83, stamina: 87, volley: 82 },
    model: "player_court.glb"
  },
  {
    id: 94,
    name: "Arantxa Sanchez Vicario",
    country: "ESP",
    attributes: { speed: 84, power: 85, accuracy: 83, spin: 82, stamina: 86, volley: 81 },
    model: "player_sanchezvicario.glb"
  },
  {
    id: 95,
    name: "Martina Hingis",
    country: "SUI",
    attributes: { speed: 83, power: 84, accuracy: 82, spin: 81, stamina: 85, volley: 80 },
    model: "player_hingis.glb"
  },
  {
    id: 96,
    name: "Justine Henin",
    country: "BEL",
    attributes: { speed: 82, power: 83, accuracy: 81, spin: 80, stamina: 84, volley: 79 },
    model: "player_henin.glb"
  },
  
];