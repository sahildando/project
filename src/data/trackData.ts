// Comprehensive F1 track data with 3D specifications
export interface TrackData {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  length: string;
  corners: number;
  sectors: number;
  drsZones: number;
  lapRecord: string;
  recordHolder: string;
  firstGP: number;
  type: 'Street Circuit' | 'Permanent Circuit';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  elevation: {
    min: number;
    max: number;
    change: number;
  };
  corners_data: CornerData[];
  sectors_data: SectorData[];
  drs_zones: DRSZone[];
  facilities: Facility[];
}

export interface CornerData {
  number: number;
  name: string;
  type: 'left' | 'right' | 'chicane';
  angle: number;
  banking: number;
  speed: 'slow' | 'medium' | 'fast';
  difficulty: number;
  x: number;
  y: number;
  z: number;
}

export interface SectorData {
  number: number;
  start: number;
  end: number;
  length: string;
  characteristics: string[];
}

export interface DRSZone {
  number: number;
  start: number;
  end: number;
  length: number;
  detection: number;
}

export interface Facility {
  type: 'grandstand' | 'pit' | 'paddock' | 'media' | 'safety';
  name: string;
  x: number;
  y: number;
  z: number;
  capacity?: number;
}

export const trackDatabase: TrackData[] = [
  {
    id: 'monaco',
    name: 'Monaco Grand Prix',
    location: 'Monte Carlo, Monaco',
    country: 'Monaco',
    flag: '🇲🇨',
    length: '3.337 km',
    corners: 19,
    sectors: 3,
    drsZones: 1,
    lapRecord: '1:14.260',
    recordHolder: 'Lewis Hamilton',
    firstGP: 1950,
    type: 'Street Circuit',
    difficulty: 'Extreme',
    elevation: { min: 7, max: 42, change: 35 },
    corners_data: [
      { number: 1, name: 'Sainte Devote', type: 'right', angle: 90, banking: 0, speed: 'slow', difficulty: 4, x: 0, y: 0, z: 0 },
      { number: 2, name: 'Massenet', type: 'right', angle: 45, banking: 0, speed: 'medium', difficulty: 3, x: 20, y: 15, z: 5 },
      { number: 3, name: 'Casino Square', type: 'left', angle: 60, banking: 0, speed: 'slow', difficulty: 5, x: 35, y: 25, z: 8 },
      { number: 4, name: 'Mirabeau', type: 'right', angle: 120, banking: 0, speed: 'slow', difficulty: 4, x: 45, y: 40, z: 12 },
      { number: 5, name: 'Grand Hotel Hairpin', type: 'right', angle: 180, banking: 0, speed: 'slow', difficulty: 5, x: 50, y: 55, z: 15 },
      { number: 6, name: 'Portier', type: 'left', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 45, y: 70, z: 10 },
      { number: 7, name: 'Tunnel', type: 'left', angle: 30, banking: 0, speed: 'fast', difficulty: 2, x: 35, y: 85, z: 5 },
      { number: 8, name: 'Chicane', type: 'chicane', angle: 45, banking: 0, speed: 'medium', difficulty: 4, x: 20, y: 95, z: 2 },
      { number: 9, name: 'Tabac', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 3, x: 5, y: 90, z: 0 },
      { number: 10, name: 'Swimming Pool', type: 'chicane', angle: 60, banking: 0, speed: 'slow', difficulty: 5, x: -10, y: 80, z: -2 },
      { number: 11, name: 'La Rascasse', type: 'right', angle: 90, banking: 0, speed: 'slow', difficulty: 4, x: -20, y: 65, z: 0 },
      { number: 12, name: 'Anthony Noghes', type: 'left', angle: 120, banking: 0, speed: 'medium', difficulty: 3, x: -15, y: 50, z: 2 },
      { number: 13, name: 'Start/Finish', type: 'right', angle: 15, banking: 0, speed: 'fast', difficulty: 1, x: -5, y: 35, z: 0 },
      { number: 14, name: 'Turn 14', type: 'left', angle: 30, banking: 0, speed: 'medium', difficulty: 2, x: 0, y: 20, z: 0 },
      { number: 15, name: 'Turn 15', type: 'right', angle: 45, banking: 0, speed: 'medium', difficulty: 2, x: 5, y: 10, z: 0 },
      { number: 16, name: 'Turn 16', type: 'left', angle: 60, banking: 0, speed: 'slow', difficulty: 3, x: 0, y: 5, z: 0 },
      { number: 17, name: 'Turn 17', type: 'right', angle: 30, banking: 0, speed: 'medium', difficulty: 2, x: -5, y: 2, z: 0 },
      { number: 18, name: 'Turn 18', type: 'left', angle: 45, banking: 0, speed: 'medium', difficulty: 2, x: -2, y: -2, z: 0 },
      { number: 19, name: 'Turn 19', type: 'right', angle: 30, banking: 0, speed: 'fast', difficulty: 1, x: 0, y: -5, z: 0 }
    ],
    sectors_data: [
      { number: 1, start: 1, end: 6, length: '1.2 km', characteristics: ['Uphill', 'Technical', 'Narrow'] },
      { number: 2, start: 7, end: 12, length: '1.1 km', characteristics: ['Tunnel section', 'Harbor chicane', 'Precision required'] },
      { number: 3, start: 13, end: 19, length: '1.0 km', characteristics: ['Swimming pool complex', 'Final corners', 'Overtaking opportunity'] }
    ],
    drs_zones: [
      { number: 1, start: 19, end: 1, length: 650, detection: 18 }
    ],
    facilities: [
      { type: 'grandstand', name: 'Casino Grandstand', x: 35, y: 25, z: 8, capacity: 5000 },
      { type: 'grandstand', name: 'Harbor Grandstand', x: 20, y: 95, z: 2, capacity: 8000 },
      { type: 'pit', name: 'Monaco Pits', x: -5, y: 35, z: 0 },
      { type: 'paddock', name: 'Monaco Paddock', x: -10, y: 30, z: 0 },
      { type: 'media', name: 'Media Center', x: -8, y: 32, z: 0 },
      { type: 'safety', name: 'Race Control', x: -6, y: 33, z: 0 }
    ]
  },
  {
    id: 'silverstone',
    name: 'Silverstone Circuit',
    location: 'Silverstone, UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    length: '5.891 km',
    corners: 18,
    sectors: 3,
    drsZones: 2,
    lapRecord: '1:27.097',
    recordHolder: 'Max Verstappen',
    firstGP: 1950,
    type: 'Permanent Circuit',
    difficulty: 'Hard',
    elevation: { min: 150, max: 170, change: 20 },
    corners_data: [
      { number: 1, name: 'Abbey', type: 'right', angle: 90, banking: 0, speed: 'fast', difficulty: 3, x: 0, y: 0, z: 0 },
      { number: 2, name: 'Farm Curve', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 2, x: 30, y: 20, z: 2 },
      { number: 3, name: 'Village', type: 'right', angle: 120, banking: 0, speed: 'medium', difficulty: 4, x: 60, y: 35, z: 5 },
      { number: 4, name: 'The Loop', type: 'left', angle: 180, banking: 0, speed: 'slow', difficulty: 3, x: 80, y: 60, z: 8 },
      { number: 5, name: 'Aintree', type: 'right', angle: 60, banking: 0, speed: 'medium', difficulty: 2, x: 75, y: 85, z: 10 },
      { number: 6, name: 'Wellington Straight', type: 'left', angle: 30, banking: 0, speed: 'fast', difficulty: 1, x: 65, y: 110, z: 12 },
      { number: 7, name: 'Brooklands', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 50, y: 130, z: 15 },
      { number: 8, name: 'Luffield', type: 'right', angle: 120, banking: 0, speed: 'slow', difficulty: 4, x: 30, y: 140, z: 18 },
      { number: 9, name: 'Woodcote', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 10, y: 135, z: 20 },
      { number: 10, name: 'Copse', type: 'right', angle: 75, banking: 0, speed: 'fast', difficulty: 4, x: -10, y: 120, z: 18 },
      { number: 11, name: 'Maggotts', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 5, x: -25, y: 100, z: 15 },
      { number: 12, name: 'Becketts', type: 'right', angle: 60, banking: 0, speed: 'fast', difficulty: 5, x: -35, y: 80, z: 12 },
      { number: 13, name: 'Chapel Curve', type: 'left', angle: 30, banking: 0, speed: 'fast', difficulty: 3, x: -40, y: 60, z: 10 },
      { number: 14, name: 'Hangar Straight', type: 'left', angle: 15, banking: 0, speed: 'fast', difficulty: 1, x: -35, y: 40, z: 8 },
      { number: 15, name: 'Stowe', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: -25, y: 20, z: 5 },
      { number: 16, name: 'Vale', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 2, x: -15, y: 10, z: 3 },
      { number: 17, name: 'Club', type: 'right', angle: 120, banking: 0, speed: 'slow', difficulty: 4, x: -5, y: 5, z: 2 },
      { number: 18, name: 'Abbey Return', type: 'left', angle: 45, banking: 0, speed: 'medium', difficulty: 2, x: 0, y: 0, z: 0 }
    ],
    sectors_data: [
      { number: 1, start: 1, end: 6, length: '2.1 km', characteristics: ['High-speed', 'Technical sequence', 'Elevation changes'] },
      { number: 2, start: 7, end: 12, length: '1.9 km', characteristics: ['Maggotts-Becketts complex', 'Challenging corners', 'Driver skill test'] },
      { number: 3, start: 13, end: 18, length: '1.9 km', characteristics: ['Hangar straight', 'Heavy braking zones', 'Overtaking opportunities'] }
    ],
    drs_zones: [
      { number: 1, start: 18, end: 3, length: 770, detection: 17 },
      { number: 2, start: 6, end: 7, length: 650, detection: 5 }
    ],
    facilities: [
      { type: 'grandstand', name: 'International Pits Grandstand', x: 0, y: 0, z: 0, capacity: 15000 },
      { type: 'grandstand', name: 'Copse Grandstand', x: -10, y: 120, z: 18, capacity: 12000 },
      { type: 'grandstand', name: 'Maggotts Grandstand', x: -25, y: 100, z: 15, capacity: 10000 },
      { type: 'pit', name: 'Silverstone Pits', x: 0, y: -5, z: 0 },
      { type: 'paddock', name: 'Silverstone Paddock', x: -5, y: -10, z: 0 },
      { type: 'media', name: 'Media Center', x: -3, y: -8, z: 0 },
      { type: 'safety', name: 'Race Control', x: -2, y: -6, z: 0 }
    ]
  },
  {
    id: 'spa',
    name: 'Spa-Francorchamps',
    location: 'Spa, Belgium',
    country: 'Belgium',
    flag: '🇧🇪',
    length: '7.004 km',
    corners: 20,
    sectors: 3,
    drsZones: 3,
    lapRecord: '1:46.286',
    recordHolder: 'Valtteri Bottas',
    firstGP: 1950,
    type: 'Permanent Circuit',
    difficulty: 'Hard',
    elevation: { min: 320, max: 460, change: 140 },
    corners_data: [
      { number: 1, name: 'La Source', type: 'right', angle: 180, banking: 0, speed: 'slow', difficulty: 3, x: 0, y: 0, z: 0 },
      { number: 2, name: 'Eau Rouge', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 5, x: 20, y: 30, z: -15 },
      { number: 3, name: 'Raidillon', type: 'right', angle: 60, banking: 0, speed: 'fast', difficulty: 5, x: 35, y: 60, z: -25 },
      { number: 4, name: 'Kemmel Straight', type: 'left', angle: 15, banking: 0, speed: 'fast', difficulty: 1, x: 50, y: 120, z: -30 },
      { number: 5, name: 'Les Combes', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 4, x: 80, y: 150, z: -35 },
      { number: 6, name: 'Malmedy', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 3, x: 110, y: 170, z: -40 },
      { number: 7, name: 'Rivage', type: 'left', angle: 120, banking: 0, speed: 'slow', difficulty: 4, x: 140, y: 180, z: -45 },
      { number: 8, name: 'Pouhon', type: 'left', angle: 90, banking: 0, speed: 'fast', difficulty: 5, x: 160, y: 160, z: -50 },
      { number: 9, name: 'Fagnes', type: 'right', angle: 45, banking: 0, speed: 'fast', difficulty: 3, x: 180, y: 140, z: -55 },
      { number: 10, name: 'Campus', type: 'left', angle: 60, banking: 0, speed: 'medium', difficulty: 2, x: 190, y: 110, z: -60 },
      { number: 11, name: 'Stavelot', type: 'left', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 185, y: 80, z: -65 },
      { number: 12, name: 'Blanchimont', type: 'left', angle: 30, banking: 0, speed: 'fast', difficulty: 4, x: 170, y: 50, z: -70 },
      { number: 13, name: 'Bus Stop Chicane', type: 'chicane', angle: 90, banking: 0, speed: 'slow', difficulty: 4, x: 150, y: 20, z: -65 },
      { number: 14, name: 'Turn 14', type: 'right', angle: 45, banking: 0, speed: 'medium', difficulty: 2, x: 130, y: 10, z: -60 },
      { number: 15, name: 'Turn 15', type: 'left', angle: 60, banking: 0, speed: 'medium', difficulty: 2, x: 110, y: 5, z: -55 },
      { number: 16, name: 'Turn 16', type: 'right', angle: 30, banking: 0, speed: 'fast', difficulty: 2, x: 90, y: 0, z: -50 },
      { number: 17, name: 'Turn 17', type: 'left', angle: 45, banking: 0, speed: 'medium', difficulty: 2, x: 70, y: -5, z: -45 },
      { number: 18, name: 'Turn 18', type: 'right', angle: 60, banking: 0, speed: 'medium', difficulty: 3, x: 50, y: -10, z: -40 },
      { number: 19, name: 'Turn 19', type: 'left', angle: 90, banking: 0, speed: 'slow', difficulty: 3, x: 30, y: -15, z: -35 },
      { number: 20, name: 'Turn 20', type: 'right', angle: 120, banking: 0, speed: 'medium', difficulty: 3, x: 10, y: -10, z: -30 }
    ],
    sectors_data: [
      { number: 1, start: 1, end: 7, length: '2.8 km', characteristics: ['Eau Rouge-Raidillon', 'Kemmel straight', 'Massive elevation drop'] },
      { number: 2, start: 8, end: 13, length: '2.2 km', characteristics: ['Pouhon complex', 'Forest section', 'High-speed corners'] },
      { number: 3, start: 14, end: 20, length: '2.0 km', characteristics: ['Bus stop chicane', 'Final sector', 'Preparation for start/finish'] }
    ],
    drs_zones: [
      { number: 1, start: 20, end: 2, length: 700, detection: 19 },
      { number: 2, start: 3, end: 5, length: 850, detection: 2 },
      { number: 3, start: 11, end: 13, length: 650, detection: 10 }
    ],
    facilities: [
      { type: 'grandstand', name: 'Eau Rouge Grandstand', x: 20, y: 30, z: -15, capacity: 20000 },
      { type: 'grandstand', name: 'La Source Grandstand', x: 0, y: 0, z: 0, capacity: 15000 },
      { type: 'grandstand', name: 'Bus Stop Grandstand', x: 150, y: 20, z: -65, capacity: 12000 },
      { type: 'pit', name: 'Spa Pits', x: -5, y: -5, z: 5 },
      { type: 'paddock', name: 'Spa Paddock', x: -10, y: -10, z: 10 },
      { type: 'media', name: 'Media Center', x: -8, y: -8, z: 8 },
      { type: 'safety', name: 'Race Control', x: -6, y: -6, z: 6 }
    ]
  },
  {
    id: 'suzuka',
    name: 'Suzuka Circuit',
    location: 'Suzuka, Japan',
    country: 'Japan',
    flag: '🇯🇵',
    length: '5.807 km',
    corners: 18,
    sectors: 3,
    drsZones: 2,
    lapRecord: '1:30.983',
    recordHolder: 'Lewis Hamilton',
    firstGP: 1987,
    type: 'Permanent Circuit',
    difficulty: 'Hard',
    elevation: { min: 45, max: 95, change: 50 },
    corners_data: [
      { number: 1, name: 'Turn 1', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 0, y: 0, z: 0 },
      { number: 2, name: 'Turn 2', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 3, x: 25, y: 20, z: 2 },
      { number: 3, name: 'S Curves', type: 'right', angle: 60, banking: 0, speed: 'fast', difficulty: 4, x: 45, y: 45, z: 5 },
      { number: 4, name: 'S Curves', type: 'left', angle: 60, banking: 0, speed: 'fast', difficulty: 4, x: 60, y: 70, z: 8 },
      { number: 5, name: 'S Curves', type: 'right', angle: 45, banking: 0, speed: 'fast', difficulty: 4, x: 70, y: 95, z: 10 },
      { number: 6, name: 'S Curves', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 4, x: 75, y: 120, z: 12 },
      { number: 7, name: 'Dunlop Curve', type: 'left', angle: 90, banking: 0, speed: 'fast', difficulty: 5, x: 70, y: 145, z: 15 },
      { number: 8, name: 'Degner Curve 1', type: 'left', angle: 120, banking: 0, speed: 'medium', difficulty: 4, x: 50, y: 165, z: 18 },
      { number: 9, name: 'Degner Curve 2', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 25, y: 175, z: 20 },
      { number: 10, name: 'Hairpin', type: 'right', angle: 180, banking: 0, speed: 'slow', difficulty: 3, x: 0, y: 170, z: 22 },
      { number: 11, name: 'Spoon Curve', type: 'left', angle: 135, banking: 0, speed: 'medium', difficulty: 4, x: -25, y: 150, z: 20 },
      { number: 12, name: 'Spoon Curve Exit', type: 'right', angle: 45, banking: 0, speed: 'fast', difficulty: 3, x: -40, y: 125, z: 18 },
      { number: 13, name: '130R', type: 'left', angle: 30, banking: 0, speed: 'fast', difficulty: 5, x: -50, y: 100, z: 15 },
      { number: 14, name: 'Casio Triangle', type: 'right', angle: 90, banking: 0, speed: 'slow', difficulty: 4, x: -55, y: 75, z: 12 },
      { number: 15, name: 'Casio Triangle', type: 'left', angle: 60, banking: 0, speed: 'medium', difficulty: 3, x: -50, y: 50, z: 10 },
      { number: 16, name: 'Casio Triangle', type: 'right', angle: 75, banking: 0, speed: 'medium', difficulty: 3, x: -40, y: 30, z: 8 },
      { number: 17, name: 'Turn 17', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 2, x: -25, y: 15, z: 5 },
      { number: 18, name: 'Turn 18', type: 'right', angle: 60, banking: 0, speed: 'medium', difficulty: 2, x: -10, y: 5, z: 2 }
    ],
    sectors_data: [
      { number: 1, start: 1, end: 6, length: '1.9 km', characteristics: ['S-curves complex', 'Technical section', 'Rhythm important'] },
      { number: 2, start: 7, end: 13, length: '2.1 km', characteristics: ['Dunlop-Degner', 'Spoon curve', '130R corner'] },
      { number: 3, start: 14, end: 18, length: '1.8 km', characteristics: ['Casio triangle', 'Final chicane', 'Main straight preparation'] }
    ],
    drs_zones: [
      { number: 1, start: 18, end: 1, length: 650, detection: 17 },
      { number: 2, start: 12, end: 14, length: 550, detection: 11 }
    ],
    facilities: [
      { type: 'grandstand', name: 'Main Grandstand', x: 0, y: 0, z: 0, capacity: 25000 },
      { type: 'grandstand', name: 'S-Curves Grandstand', x: 60, y: 70, z: 8, capacity: 15000 },
      { type: 'grandstand', name: '130R Grandstand', x: -50, y: 100, z: 15, capacity: 18000 },
      { type: 'pit', name: 'Suzuka Pits', x: -5, y: -5, z: 0 },
      { type: 'paddock', name: 'Suzuka Paddock', x: -10, y: -10, z: 0 },
      { type: 'media', name: 'Media Center', x: -8, y: -8, z: 0 },
      { type: 'safety', name: 'Race Control', x: -6, y: -6, z: 0 }
    ]
  },
  {
    id: 'interlagos',
    name: 'Interlagos',
    location: 'São Paulo, Brazil',
    country: 'Brazil',
    flag: '🇧🇷',
    length: '4.309 km',
    corners: 15,
    sectors: 3,
    drsZones: 2,
    lapRecord: '1:10.540',
    recordHolder: 'Valtteri Bottas',
    firstGP: 1973,
    type: 'Permanent Circuit',
    difficulty: 'Medium',
    elevation: { min: 760, max: 805, change: 45 },
    corners_data: [
      { number: 1, name: 'Senna S', type: 'right', angle: 90, banking: 0, speed: 'medium', difficulty: 4, x: 0, y: 0, z: 0 },
      { number: 2, name: 'Senna S', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 4, x: 20, y: 15, z: -5 },
      { number: 3, name: 'Curva do Sol', type: 'left', angle: 120, banking: 0, speed: 'slow', difficulty: 3, x: 35, y: 35, z: -10 },
      { number: 4, name: 'Reta Oposta', type: 'right', angle: 45, banking: 0, speed: 'fast', difficulty: 2, x: 45, y: 60, z: -15 },
      { number: 5, name: 'Descida do Lago', type: 'left', angle: 60, banking: 0, speed: 'fast', difficulty: 3, x: 50, y: 85, z: -20 },
      { number: 6, name: 'Ferradura', type: 'right', angle: 180, banking: 0, speed: 'slow', difficulty: 4, x: 45, y: 110, z: -25 },
      { number: 7, name: 'Laranja', type: 'left', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: 25, y: 125, z: -30 },
      { number: 8, name: 'Pinheirinho', type: 'left', angle: 75, banking: 0, speed: 'medium', difficulty: 3, x: 5, y: 130, z: -35 },
      { number: 9, name: 'Bico de Pato', type: 'right', angle: 120, banking: 0, speed: 'slow', difficulty: 4, x: -15, y: 125, z: -40 },
      { number: 10, name: 'Mergulho', type: 'left', angle: 90, banking: 0, speed: 'fast', difficulty: 5, x: -30, y: 110, z: -35 },
      { number: 11, name: 'Subida dos Boxes', type: 'right', angle: 60, banking: 0, speed: 'fast', difficulty: 4, x: -40, y: 85, z: -25 },
      { number: 12, name: 'Arquibancadas', type: 'left', angle: 45, banking: 0, speed: 'fast', difficulty: 3, x: -45, y: 60, z: -15 },
      { number: 13, name: 'Turn 13', type: 'right', angle: 75, banking: 0, speed: 'medium', difficulty: 2, x: -40, y: 35, z: -10 },
      { number: 14, name: 'Juncao', type: 'left', angle: 90, banking: 0, speed: 'medium', difficulty: 3, x: -25, y: 15, z: -5 },
      { number: 15, name: 'Turn 15', type: 'right', angle: 60, banking: 0, speed: 'fast', difficulty: 2, x: -10, y: 5, z: 0 }
    ],
    sectors_data: [
      { number: 1, start: 1, end: 5, length: '1.4 km', characteristics: ['Senna S complex', 'Elevation drop', 'Technical section'] },
      { number: 2, start: 6, end: 10, length: '1.5 km', characteristics: ['Ferradura hairpin', 'Challenging corners', 'Altitude changes'] },
      { number: 3, start: 11, end: 15, length: '1.4 km', characteristics: ['Uphill section', 'Main straight approach', 'Overtaking zone'] }
    ],
    drs_zones: [
      { number: 1, start: 15, end: 1, length: 800, detection: 14 },
      { number: 2, start: 11, end: 12, length: 400, detection: 10 }
    ],
    facilities: [
      { type: 'grandstand', name: 'Arquibancadas', x: -45, y: 60, z: -15, capacity: 30000 },
      { type: 'grandstand', name: 'Senna S Grandstand', x: 20, y: 15, z: -5, capacity: 15000 },
      { type: 'grandstand', name: 'Mergulho Grandstand', x: -30, y: 110, z: -35, capacity: 12000 },
      { type: 'pit', name: 'Interlagos Pits', x: -5, y: -5, z: 5 },
      { type: 'paddock', name: 'Interlagos Paddock', x: -10, y: -10, z: 10 },
      { type: 'media', name: 'Media Center', x: -8, y: -8, z: 8 },
      { type: 'safety', name: 'Race Control', x: -6, y: -6, z: 6 }
    ]
  }
];

export const getTrackById = (id: string): TrackData | undefined => {
  return trackDatabase.find(track => track.id === id);
};

export const getTracksByType = (type: 'Street Circuit' | 'Permanent Circuit'): TrackData[] => {
  return trackDatabase.filter(track => track.type === type);
};

export const getTracksByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme'): TrackData[] => {
  return trackDatabase.filter(track => track.difficulty === difficulty);
};