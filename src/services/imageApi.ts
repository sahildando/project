// Image API service for fetching real F1 images
const GETTY_API_KEY = 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6';
const PIXFETCH_API_KEY = 'b2d076e455mshfe347f249e99333p1ac10ejsn88a8545faaf6';

interface GettyImageResult {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface PixfetchResult {
  url: string;
  title: string;
  description: string;
}

class ImageAPI {
  private imageCache: Map<string, string> = new Map();
  private driverImageCache: Map<string, string> = new Map();
  private trackImageCache: Map<string, string> = new Map();

  // Getty Images API for high-quality F1 driver photos
  async fetchGettyImages(query: string): Promise<string[]> {
    const cacheKey = `getty_${query}`;
    if (this.imageCache.has(cacheKey)) {
      return [this.imageCache.get(cacheKey)!];
    }

    try {
      const formData = new URLSearchParams();
      formData.append('query', `${query} Formula 1 F1 racing driver portrait professional`);
      formData.append('number_of_images', '5');
      formData.append('country', 'us');
      formData.append('language', 'en');

      const response = await fetch('https://gettyimagesraygorodskijv1.p.rapidapi.com/search', {
        method: 'POST',
        headers: {
          'X-Rapidapi-Key': GETTY_API_KEY,
          'X-Rapidapi-Host': 'gettyimagesraygorodskijv1.p.rapidapi.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          const imageUrl = data.images[0].url || data.images[0].display_url;
          if (imageUrl) {
            this.imageCache.set(cacheKey, imageUrl);
            return [imageUrl];
          }
        }
      }
    } catch (error) {
      console.warn(`Getty Images API error for ${query}:`, error);
    }

    // Fallback to curated F1 driver images
    return this.getFallbackDriverImage(query);
  }

  // Pixfetch API for F1 track images
  async fetchPixfetchImages(query: string): Promise<string[]> {
    const cacheKey = `pixfetch_${query}`;
    if (this.imageCache.has(cacheKey)) {
      return [this.imageCache.get(cacheKey)!];
    }

    try {
      const searchQuery = `${query} Formula 1 F1 circuit track racing`;
      const response = await fetch('https://pixfetch-api.p.rapidapi.com/search', {
        method: 'POST',
        headers: {
          'X-Rapidapi-Key': PIXFETCH_API_KEY,
          'X-Rapidapi-Host': 'pixfetch-api.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: searchQuery,
          per_page: 5,
          orientation: 'landscape'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          const imageUrl = data.photos[0].src?.large || data.photos[0].src?.medium;
          if (imageUrl) {
            this.imageCache.set(cacheKey, imageUrl);
            return [imageUrl];
          }
        }
      }
    } catch (error) {
      console.warn(`Pixfetch API error for ${query}:`, error);
    }

    // Fallback to curated F1 track images
    return this.getFallbackTrackImage(query);
  }

  // Get specific driver image with fallbacks
  async getDriverImage(driverName: string): Promise<string> {
    if (this.driverImageCache.has(driverName)) {
      return this.driverImageCache.get(driverName)!;
    }

    // Try Getty Images first
    const gettyImages = await this.fetchGettyImages(driverName);
    if (gettyImages.length > 0 && gettyImages[0] !== '') {
      this.driverImageCache.set(driverName, gettyImages[0]);
      return gettyImages[0];
    }

    // Fallback to curated images
    const fallbackImage = this.getFallbackDriverImage(driverName)[0];
    this.driverImageCache.set(driverName, fallbackImage);
    return fallbackImage;
  }

  // Get track image
  async getTrackImage(trackName: string): Promise<string> {
    if (this.trackImageCache.has(trackName)) {
      return this.trackImageCache.get(trackName)!;
    }

    // Try Pixfetch first
    const pixfetchImages = await this.fetchPixfetchImages(trackName);
    if (pixfetchImages.length > 0 && pixfetchImages[0] !== '') {
      this.trackImageCache.set(trackName, pixfetchImages[0]);
      return pixfetchImages[0];
    }

    // Fallback to curated images
    const fallbackImage = this.getFallbackTrackImage(trackName)[0];
    this.trackImageCache.set(trackName, fallbackImage);
    return fallbackImage;
  }

  // Curated F1 driver images as fallbacks
  private getFallbackDriverImage(driverName: string): string[] {
    const driverImages: Record<string, string> = {
      'Max Verstappen': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Lewis Hamilton': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Charles Leclerc': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Sergio Perez': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'George Russell': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Carlos Sainz': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Lando Norris': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Fernando Alonso': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Oscar Piastri': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Lance Stroll': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Pierre Gasly': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Esteban Ocon': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Nico Hulkenberg': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Kevin Magnussen': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Daniel Ricciardo': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Yuki Tsunoda': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Alexander Albon': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Logan Sargeant': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Valtteri Bottas': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Zhou Guanyu': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Michael Schumacher': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Ayrton Senna': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Alain Prost': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Sebastian Vettel': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Kimi Raikkonen': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800'
    };

    return [driverImages[driverName] || 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=800'];
  }

  // Curated F1 track images as fallbacks
  private getFallbackTrackImage(trackName: string): string[] {
    const trackImages: Record<string, string> = {
      'Monaco Grand Prix': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Silverstone Circuit': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Spa-Francorchamps': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Suzuka Circuit': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Interlagos': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Las Vegas Strip Circuit': 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Yas Marina Circuit': 'https://images.pexels.com/photos/163407/f-1-racing-car-vehicle-163407.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Circuit de Barcelona-Catalunya': 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Hungaroring': 'https://images.pexels.com/photos/12799780/pexels-photo-12799780.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Circuit de Spa-Francorchamps': 'https://images.pexels.com/photos/8813455/pexels-photo-8813455.jpeg?auto=compress&cs=tinysrgb&w=1200'
    };

    return [trackImages[trackName] || 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg?auto=compress&cs=tinysrgb&w=1200'];
  }

  // Batch load images for better performance
  async preloadDriverImages(driverNames: string[]): Promise<void> {
    const promises = driverNames.map(name => this.getDriverImage(name));
    await Promise.allSettled(promises);
  }

  async preloadTrackImages(trackNames: string[]): Promise<void> {
    const promises = trackNames.map(name => this.getTrackImage(name));
    await Promise.allSettled(promises);
  }
}

export const imageAPI = new ImageAPI();