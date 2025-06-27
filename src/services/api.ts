import { imageAPI } from './imageApi';

const API_KEYS = {
  HYPRACE: 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6',
  F1_LIVE_PULSE: 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6',
  F1_MOTORSPORT: 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6',
  GETTY_IMAGES: 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6'
};

const BASE_URLS = {
  HYPRACE: 'https://hyprace-api.p.rapidapi.com',
  F1_LIVE_PULSE: 'https://f1-live-pulse.p.rapidapi.com',
  F1_MOTORSPORT: 'https://f1-motorsport-data.p.rapidapi.com',
  GETTY_IMAGES: 'https://gettyimagesraygorodskijv1.p.rapidapi.com'
};

export interface Driver {
  id: string;
  name: string;
  team: string;
  nationality: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  image?: string;
  helmet?: string;
  flag?: string;
  age: number;
  championships: number;
  careerWins: number;
  careerPodiums: number;
  experience: number;
  racecraft: number;
  qualifying: number;
  consistency: number;
  speed: number;
  pressure: number;
}

export interface Constructor {
  id: string;
  name: string;
  nationality: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  poles: number;
  logo?: string;
  car?: string;
  drivers: string[];
  founded: number;
  championships: number;
  headquarters: string;
}

export interface Race {
  id: string;
  name: string;
  location: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  circuit?: string;
  weather?: string;
  results?: any[];
  laps: number;
  distance: string;
  lapRecord: string;
}

class F1API {
  private driverImages: Map<string, string> = new Map();
  private trackImages: Map<string, string> = new Map();

  private async fetchWithHeaders(url: string, apiType: keyof typeof API_KEYS) {
    const headers: Record<string, string> = {
      'X-Rapidapi-Key': API_KEYS[apiType],
      'X-Rapidapi-Host': url.split('/')[2]
    };

    if (apiType === 'GETTY_IMAGES') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        if (response.status === 429) {
          console.warn(`Rate limit exceeded for ${apiType}. Using mock data instead.`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error(`API Error for ${apiType}:`, error);
    }
    
    return this.getMockData(apiType);
  }

  private getMockData(apiType: keyof typeof API_KEYS) {
    switch (apiType) {
      case 'F1_MOTORSPORT':
        return this.getMockDrivers();
      case 'HYPRACE':
        return this.getMockRaces();
      default:
        return [];
    }
  }

  private async getMockDrivers(): Promise<Driver[]> {
    const drivers = [
      // Current F1 Grid 2024
      { name: 'Max Verstappen', team: 'Red Bull Racing', nationality: 'Netherlands', points: 575, position: 1, wins: 19, podiums: 21, poles: 7, fastestLaps: 5, flag: '🇳🇱', age: 26, championships: 3, careerWins: 54, careerPodiums: 98, experience: 95, racecraft: 98, qualifying: 92, consistency: 98, speed: 98, pressure: 96 },
      { name: 'Sergio Perez', team: 'Red Bull Racing', nationality: 'Mexico', points: 285, position: 2, wins: 0, podiums: 8, poles: 0, fastestLaps: 1, flag: '🇲🇽', age: 34, championships: 0, careerWins: 6, careerPodiums: 35, experience: 88, racecraft: 85, qualifying: 78, consistency: 82, speed: 84, pressure: 86 },
      { name: 'Lewis Hamilton', team: 'Mercedes', nationality: 'United Kingdom', points: 234, position: 3, wins: 2, podiums: 8, poles: 1, fastestLaps: 1, flag: '🇬🇧', age: 39, championships: 7, careerWins: 103, careerPodiums: 197, experience: 98, racecraft: 98, qualifying: 88, consistency: 92, speed: 90, pressure: 98 },
      { name: 'George Russell', team: 'Mercedes', nationality: 'United Kingdom', points: 175, position: 4, wins: 1, podiums: 3, poles: 1, fastestLaps: 0, flag: '🇬🇧', age: 26, championships: 0, careerWins: 2, careerPodiums: 12, experience: 78, racecraft: 82, qualifying: 88, consistency: 85, speed: 86, pressure: 84 },
      { name: 'Charles Leclerc', team: 'Ferrari', nationality: 'Monaco', points: 206, position: 5, wins: 1, podiums: 5, poles: 2, fastestLaps: 2, flag: '🇲🇨', age: 26, championships: 0, careerWins: 5, careerPodiums: 29, experience: 82, racecraft: 88, qualifying: 94, consistency: 78, speed: 92, pressure: 85 },
      { name: 'Carlos Sainz', team: 'Ferrari', nationality: 'Spain', points: 200, position: 6, wins: 1, podiums: 4, poles: 0, fastestLaps: 1, flag: '🇪🇸', age: 30, championships: 0, careerWins: 3, careerPodiums: 18, experience: 85, racecraft: 86, qualifying: 82, consistency: 88, speed: 85, pressure: 87 },
      { name: 'Lando Norris', team: 'McLaren', nationality: 'United Kingdom', points: 205, position: 7, wins: 1, podiums: 8, poles: 1, fastestLaps: 2, flag: '🇬🇧', age: 24, championships: 0, careerWins: 1, careerPodiums: 13, experience: 75, racecraft: 84, qualifying: 86, consistency: 82, speed: 88, pressure: 80 },
      { name: 'Oscar Piastri', team: 'McLaren', nationality: 'Australia', points: 97, position: 8, wins: 0, podiums: 2, poles: 0, fastestLaps: 0, flag: '🇦🇺', age: 23, championships: 0, careerWins: 0, careerPodiums: 2, experience: 65, racecraft: 78, qualifying: 80, consistency: 76, speed: 82, pressure: 74 },
      { name: 'Fernando Alonso', team: 'Aston Martin', nationality: 'Spain', points: 62, position: 9, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, flag: '🇪🇸', age: 42, championships: 2, careerWins: 32, careerPodiums: 98, experience: 98, racecraft: 96, qualifying: 85, consistency: 90, speed: 88, pressure: 95 },
      { name: 'Lance Stroll', team: 'Aston Martin', nationality: 'Canada', points: 24, position: 10, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇨🇦', age: 25, championships: 0, careerWins: 0, careerPodiums: 3, experience: 72, racecraft: 70, qualifying: 68, consistency: 72, speed: 74, pressure: 70 },
      { name: 'Pierre Gasly', team: 'Alpine', nationality: 'France', points: 9, position: 11, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇫🇷', age: 28, championships: 0, careerWins: 1, careerPodiums: 4, experience: 80, racecraft: 82, qualifying: 78, consistency: 76, speed: 80, pressure: 78 },
      { name: 'Esteban Ocon', team: 'Alpine', nationality: 'France', points: 5, position: 12, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇫🇷', age: 27, championships: 0, careerWins: 1, careerPodiums: 3, experience: 78, racecraft: 80, qualifying: 76, consistency: 78, speed: 78, pressure: 76 },
      { name: 'Nico Hulkenberg', team: 'Haas', nationality: 'Germany', points: 31, position: 13, wins: 0, podiums: 0, poles: 1, fastestLaps: 0, flag: '🇩🇪', age: 36, championships: 0, careerWins: 0, careerPodiums: 0, experience: 88, racecraft: 84, qualifying: 82, consistency: 86, speed: 80, pressure: 82 },
      { name: 'Kevin Magnussen', team: 'Haas', nationality: 'Denmark', points: 16, position: 14, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇩🇰', age: 31, championships: 0, careerWins: 0, careerPodiums: 1, experience: 82, racecraft: 78, qualifying: 76, consistency: 74, speed: 78, pressure: 76 },
      { name: 'Daniel Ricciardo', team: 'RB', nationality: 'Australia', points: 12, position: 15, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇦🇺', age: 35, championships: 0, careerWins: 8, careerPodiums: 32, experience: 90, racecraft: 88, qualifying: 80, consistency: 76, speed: 84, pressure: 86 },
      { name: 'Yuki Tsunoda', team: 'RB', nationality: 'Japan', points: 22, position: 16, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇯🇵', age: 24, championships: 0, careerWins: 0, careerPodiums: 0, experience: 68, racecraft: 74, qualifying: 78, consistency: 70, speed: 80, pressure: 72 },
      { name: 'Alexander Albon', team: 'Williams', nationality: 'Thailand', points: 12, position: 17, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇹🇭', age: 28, championships: 0, careerWins: 0, careerPodiums: 2, experience: 76, racecraft: 78, qualifying: 74, consistency: 76, speed: 76, pressure: 74 },
      { name: 'Logan Sargeant', team: 'Williams', nationality: 'United States', points: 1, position: 18, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇺🇸', age: 23, championships: 0, careerWins: 0, careerPodiums: 0, experience: 60, racecraft: 65, qualifying: 68, consistency: 62, speed: 70, pressure: 64 },
      { name: 'Valtteri Bottas', team: 'Alfa Romeo', nationality: 'Finland', points: 10, position: 19, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇫🇮', age: 34, championships: 0, careerWins: 10, careerPodiums: 67, experience: 88, racecraft: 84, qualifying: 86, consistency: 88, speed: 84, pressure: 82 },
      { name: 'Zhou Guanyu', team: 'Alfa Romeo', nationality: 'China', points: 6, position: 20, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇨🇳', age: 25, championships: 0, careerWins: 0, careerPodiums: 0, experience: 68, racecraft: 72, qualifying: 70, consistency: 74, speed: 72, pressure: 70 },
      
      // F1 Legends and Former Champions
      { name: 'Michael Schumacher', team: 'Ferrari (Retired)', nationality: 'Germany', points: 0, position: 21, wins: 91, podiums: 155, poles: 68, fastestLaps: 77, flag: '🇩🇪', age: 55, championships: 7, careerWins: 91, careerPodiums: 155, experience: 98, racecraft: 98, qualifying: 92, consistency: 96, speed: 94, pressure: 98 },
      { name: 'Ayrton Senna', team: 'McLaren (Retired)', nationality: 'Brazil', points: 0, position: 22, wins: 41, podiums: 80, poles: 65, fastestLaps: 19, flag: '🇧🇷', age: 34, championships: 3, careerWins: 41, careerPodiums: 80, experience: 95, racecraft: 98, qualifying: 98, consistency: 88, speed: 98, pressure: 96 },
      { name: 'Alain Prost', team: 'McLaren (Retired)', nationality: 'France', points: 0, position: 23, wins: 51, podiums: 106, poles: 33, fastestLaps: 41, flag: '🇫🇷', age: 69, championships: 4, careerWins: 51, careerPodiums: 106, experience: 96, racecraft: 96, qualifying: 85, consistency: 98, speed: 88, pressure: 94 },
      { name: 'Sebastian Vettel', team: 'Red Bull (Retired)', nationality: 'Germany', points: 0, position: 24, wins: 53, podiums: 122, poles: 57, fastestLaps: 38, flag: '🇩🇪', age: 36, championships: 4, careerWins: 53, careerPodiums: 122, experience: 94, racecraft: 92, qualifying: 94, consistency: 90, speed: 92, pressure: 88 },
      { name: 'Kimi Raikkonen', team: 'Ferrari (Retired)', nationality: 'Finland', points: 0, position: 25, wins: 21, podiums: 103, poles: 18, fastestLaps: 46, flag: '🇫🇮', age: 44, championships: 1, careerWins: 21, careerPodiums: 103, experience: 92, racecraft: 88, qualifying: 82, consistency: 86, speed: 90, pressure: 94 },
      { name: 'Jenson Button', team: 'Brawn GP (Retired)', nationality: 'United Kingdom', points: 0, position: 26, wins: 15, podiums: 50, poles: 8, fastestLaps: 8, flag: '🇬🇧', age: 44, championships: 1, careerWins: 15, careerPodiums: 50, experience: 90, racecraft: 86, qualifying: 78, consistency: 88, speed: 82, pressure: 84 },
      { name: 'Nico Rosberg', team: 'Mercedes (Retired)', nationality: 'Germany', points: 0, position: 27, wins: 23, podiums: 57, poles: 30, fastestLaps: 20, flag: '🇩🇪', age: 38, championships: 1, careerWins: 23, careerPodiums: 57, experience: 86, racecraft: 84, qualifying: 88, consistency: 86, speed: 86, pressure: 82 },
      { name: 'Felipe Massa', team: 'Ferrari (Retired)', nationality: 'Brazil', points: 0, position: 28, wins: 11, podiums: 41, poles: 16, fastestLaps: 15, flag: '🇧🇷', age: 42, championships: 0, careerWins: 11, careerPodiums: 41, experience: 88, racecraft: 84, qualifying: 84, consistency: 80, speed: 86, pressure: 78 },
      { name: 'Rubens Barrichello', team: 'Ferrari (Retired)', nationality: 'Brazil', points: 0, position: 29, wins: 11, podiums: 68, poles: 14, fastestLaps: 17, flag: '🇧🇷', age: 51, championships: 0, careerWins: 11, careerPodiums: 68, experience: 94, racecraft: 86, qualifying: 80, consistency: 88, speed: 82, pressure: 84 },
      { name: 'Juan Pablo Montoya', team: 'McLaren (Retired)', nationality: 'Colombia', points: 0, position: 30, wins: 7, podiums: 30, poles: 13, fastestLaps: 12, flag: '🇨🇴', age: 48, championships: 0, careerWins: 7, careerPodiums: 30, experience: 82, racecraft: 88, qualifying: 86, consistency: 76, speed: 90, pressure: 80 },
      
      // Rising Stars and Test Drivers
      { name: 'Mick Schumacher', team: 'Mercedes (Reserve)', nationality: 'Germany', points: 0, position: 31, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇩🇪', age: 25, championships: 0, careerWins: 0, careerPodiums: 0, experience: 70, racecraft: 76, qualifying: 74, consistency: 72, speed: 78, pressure: 74 },
      { name: 'Nyck de Vries', team: 'AlphaTauri (Former)', nationality: 'Netherlands', points: 0, position: 32, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇳🇱', age: 29, championships: 0, careerWins: 0, careerPodiums: 0, experience: 68, racecraft: 72, qualifying: 74, consistency: 70, speed: 76, pressure: 68 },
      { name: 'Antonio Giovinazzi', team: 'Ferrari (Reserve)', nationality: 'Italy', points: 0, position: 33, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, flag: '🇮🇹', age: 30, championships: 0, careerWins: 0, careerPodiums: 0, experience: 74, racecraft: 76, qualifying: 72, consistency: 74, speed: 76, pressure: 72 },
      { name: 'Robert Kubica', team: 'Alfa Romeo (Reserve)', nationality: 'Poland', points: 0, position: 34, wins: 1, podiums: 12, poles: 1, fastestLaps: 1, flag: '🇵🇱', age: 39, championships: 0, careerWins: 1, careerPodiums: 12, experience: 86, racecraft: 84, qualifying: 80, consistency: 82, speed: 82, pressure: 86 },
      { name: 'Stoffel Vandoorne', team: 'Mercedes (Reserve)', nationality: 'Belgium', points: 0, position: 35, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, flag: '🇧🇪', age: 32, championships: 0, careerWins: 0, careerPodiums: 1, experience: 76, racecraft: 78, qualifying: 80, consistency: 78, speed: 80, pressure: 76 }
    ];

    // Add real images to drivers using the image API
    for (const driver of drivers) {
      try {
        driver.image = await imageAPI.getDriverImage(driver.name);
      } catch (error) {
        console.warn(`Failed to load image for ${driver.name}:`, error);
        driver.image = 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800';
      }
    }

    return drivers;
  }

  private getMockConstructors(): Constructor[] {
    return [
      {
        id: '1',
        name: 'Red Bull Racing',
        nationality: 'Austria',
        points: 860,
        position: 1,
        wins: 20,
        podiums: 29,
        poles: 7,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Max Verstappen', 'Sergio Perez'],
        founded: 2005,
        championships: 6,
        headquarters: 'Milton Keynes, UK'
      },
      {
        id: '2',
        name: 'Mercedes',
        nationality: 'Germany',
        points: 409,
        position: 2,
        wins: 3,
        podiums: 11,
        poles: 2,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Lewis Hamilton', 'George Russell'],
        founded: 2010,
        championships: 8,
        headquarters: 'Brackley, UK'
      },
      {
        id: '3',
        name: 'Ferrari',
        nationality: 'Italy',
        points: 406,
        position: 3,
        wins: 2,
        podiums: 9,
        poles: 2,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Charles Leclerc', 'Carlos Sainz'],
        founded: 1950,
        championships: 16,
        headquarters: 'Maranello, Italy'
      },
      {
        id: '4',
        name: 'McLaren',
        nationality: 'United Kingdom',
        points: 302,
        position: 4,
        wins: 1,
        podiums: 10,
        poles: 1,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Lando Norris', 'Oscar Piastri'],
        founded: 1966,
        championships: 8,
        headquarters: 'Woking, UK'
      },
      {
        id: '5',
        name: 'Aston Martin',
        nationality: 'United Kingdom',
        points: 86,
        position: 5,
        wins: 0,
        podiums: 1,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Fernando Alonso', 'Lance Stroll'],
        founded: 2021,
        championships: 0,
        headquarters: 'Silverstone, UK'
      },
      {
        id: '6',
        name: 'Alpine',
        nationality: 'France',
        points: 14,
        position: 6,
        wins: 0,
        podiums: 0,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Pierre Gasly', 'Esteban Ocon'],
        founded: 2021,
        championships: 0,
        headquarters: 'Enstone, UK'
      },
      {
        id: '7',
        name: 'Haas',
        nationality: 'United States',
        points: 47,
        position: 7,
        wins: 0,
        podiums: 0,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Nico Hulkenberg', 'Kevin Magnussen'],
        founded: 2016,
        championships: 0,
        headquarters: 'Kannapolis, USA'
      },
      {
        id: '8',
        name: 'RB',
        nationality: 'Italy',
        points: 34,
        position: 8,
        wins: 0,
        podiums: 0,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Daniel Ricciardo', 'Yuki Tsunoda'],
        founded: 2020,
        championships: 0,
        headquarters: 'Faenza, Italy'
      },
      {
        id: '9',
        name: 'Williams',
        nationality: 'United Kingdom',
        points: 13,
        position: 9,
        wins: 0,
        podiums: 0,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Alexander Albon', 'Logan Sargeant'],
        founded: 1977,
        championships: 9,
        headquarters: 'Grove, UK'
      },
      {
        id: '10',
        name: 'Alfa Romeo',
        nationality: 'Switzerland',
        points: 16,
        position: 10,
        wins: 0,
        podiums: 0,
        poles: 0,
        logo: 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg',
        drivers: ['Valtteri Bottas', 'Zhou Guanyu'],
        founded: 2019,
        championships: 0,
        headquarters: 'Hinwil, Switzerland'
      }
    ];
  }

  private async getMockRaces(): Promise<Race[]> {
    const races = [
      {
        id: '1',
        name: 'Abu Dhabi Grand Prix',
        location: 'Yas Marina Circuit',
        date: '2024-12-08',
        status: 'upcoming' as const,
        laps: 58,
        distance: '305.355 km',
        lapRecord: '1:26.103',
        weather: 'Clear, 28°C'
      },
      {
        id: '2',
        name: 'Las Vegas Grand Prix',
        location: 'Las Vegas Strip Circuit',
        date: '2024-11-23',
        status: 'completed' as const,
        laps: 50,
        distance: '305.354 km',
        lapRecord: '1:35.490',
        weather: 'Clear, 15°C'
      },
      {
        id: '3',
        name: 'Brazilian Grand Prix',
        location: 'Interlagos',
        date: '2024-11-03',
        status: 'completed' as const,
        laps: 71,
        distance: '305.909 km',
        lapRecord: '1:10.540',
        weather: 'Partly cloudy, 26°C'
      },
      {
        id: '4',
        name: 'Monaco Grand Prix',
        location: 'Circuit de Monaco',
        date: '2024-05-26',
        status: 'completed' as const,
        laps: 78,
        distance: '260.286 km',
        lapRecord: '1:14.260',
        weather: 'Sunny, 24°C'
      },
      {
        id: '5',
        name: 'British Grand Prix',
        location: 'Silverstone Circuit',
        date: '2024-07-07',
        status: 'completed' as const,
        laps: 52,
        distance: '306.198 km',
        lapRecord: '1:27.097',
        weather: 'Overcast, 18°C'
      },
      {
        id: '6',
        name: 'Belgian Grand Prix',
        location: 'Spa-Francorchamps',
        date: '2024-07-28',
        status: 'completed' as const,
        laps: 44,
        distance: '308.052 km',
        lapRecord: '1:46.286',
        weather: 'Mixed conditions, 16°C'
      }
    ];

    // Add real track images
    for (const race of races) {
      try {
        race.circuit = await imageAPI.getTrackImage(race.name);
      } catch (error) {
        console.warn(`Failed to load track image for ${race.name}:`, error);
        race.circuit = 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=1200';
      }
    }

    return races;
  }

  async getDrivers(): Promise<Driver[]> {
    return await this.fetchWithHeaders(`${BASE_URLS.F1_MOTORSPORT}/drivers`, 'F1_MOTORSPORT');
  }

  async getConstructors(): Promise<Constructor[]> {
    return this.getMockConstructors();
  }

  async getRaces(): Promise<Race[]> {
    return await this.fetchWithHeaders(`${BASE_URLS.HYPRACE}/races`, 'HYPRACE');
  }

  async getStandings() {
    const drivers = await this.getDrivers();
    const constructors = await this.getConstructors();
    return { drivers, constructors };
  }

  // Preload images for better performance
  async preloadImages(): Promise<void> {
    const drivers = await this.getMockDrivers();
    const races = await this.getMockRaces();
    
    const driverNames = drivers.map(d => d.name);
    const trackNames = races.map(r => r.name);
    
    await Promise.allSettled([
      imageAPI.preloadDriverImages(driverNames),
      imageAPI.preloadTrackImages(trackNames)
    ]);
  }
}

export const f1Api = new F1API();