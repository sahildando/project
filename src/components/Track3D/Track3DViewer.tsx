import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Settings, 
  Info,
  Eye,
  Layers,
  MapPin,
  Clock,
  Gauge,
  Flag
} from 'lucide-react';

interface Track3DViewerProps {
  trackData: TrackData;
  onTrackSelect?: (trackId: string) => void;
}

interface TrackData {
  id: string;
  name: string;
  location: string;
  length: string;
  corners: number;
  sectors: number;
  drsZones: number;
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

interface CornerData {
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

interface SectorData {
  number: number;
  start: number;
  end: number;
  length: string;
  characteristics: string[];
}

interface DRSZone {
  number: number;
  start: number;
  end: number;
  length: number;
  detection: number;
}

interface Facility {
  type: 'grandstand' | 'pit' | 'paddock' | 'media' | 'safety';
  name: string;
  x: number;
  y: number;
  z: number;
  capacity?: number;
}

const Track3DViewer: React.FC<Track3DViewerProps> = ({ trackData, onTrackSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'technical'>('overview');
  const [showLayers, setShowLayers] = useState({
    track: true,
    elevation: true,
    facilities: true,
    drsZones: true,
    sectors: true,
    corners: true
  });
  const [selectedCorner, setSelectedCorner] = useState<CornerData | null>(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 50, z: 100 });
  const [zoom, setZoom] = useState(1);

  // 3D Track Rendering Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw track layout
      drawTrackLayout(ctx, trackData, showLayers, zoom, cameraPosition);
      
      if (isRotating) {
        setCameraPosition(prev => ({
          ...prev,
          x: prev.x + 0.5
        }));
      }
    };

    const animationFrame = requestAnimationFrame(function animate() {
      render();
      if (isRotating) {
        requestAnimationFrame(animate);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [trackData, showLayers, zoom, cameraPosition, isRotating]);

  const drawTrackLayout = (
    ctx: CanvasRenderingContext2D, 
    track: TrackData, 
    layers: typeof showLayers,
    zoomLevel: number,
    camera: typeof cameraPosition
  ) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const scale = zoomLevel * 2;

    // Draw track surface
    if (layers.track) {
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 8 * scale;
      ctx.beginPath();
      
      // Create track path based on corners
      track.corners_data.forEach((corner, index) => {
        const x = centerX + (corner.x * scale * Math.cos(camera.x * 0.01));
        const y = centerY + (corner.y * scale);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.stroke();

      // Draw track boundaries
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();
    }

    // Draw elevation changes
    if (layers.elevation) {
      track.corners_data.forEach((corner) => {
        const x = centerX + (corner.x * scale * Math.cos(camera.x * 0.01));
        const y = centerY + (corner.y * scale);
        const elevation = corner.z;
        
        // Color based on elevation
        const elevationColor = elevation > 0 ? '#f56565' : '#4299e1';
        ctx.fillStyle = elevationColor;
        ctx.beginPath();
        ctx.arc(x, y, Math.abs(elevation) * scale * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw DRS zones
    if (layers.drsZones) {
      track.drs_zones.forEach((drs) => {
        ctx.strokeStyle = '#48bb78';
        ctx.lineWidth = 4 * scale;
        ctx.setLineDash([5, 5]);
        
        const startCorner = track.corners_data[drs.start];
        const endCorner = track.corners_data[drs.end];
        
        if (startCorner && endCorner) {
          const startX = centerX + (startCorner.x * scale * Math.cos(camera.x * 0.01));
          const startY = centerY + (startCorner.y * scale);
          const endX = centerX + (endCorner.x * scale * Math.cos(camera.x * 0.01));
          const endY = centerY + (endCorner.y * scale);
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
      });
    }

    // Draw corners with numbers
    if (layers.corners) {
      track.corners_data.forEach((corner) => {
        const x = centerX + (corner.x * scale * Math.cos(camera.x * 0.01));
        const y = centerY + (corner.y * scale);
        
        // Corner marker
        ctx.fillStyle = corner.type === 'left' ? '#f56565' : corner.type === 'right' ? '#4299e1' : '#ed8936';
        ctx.beginPath();
        ctx.arc(x, y, 6 * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Corner number
        ctx.fillStyle = '#ffffff';
        ctx.font = `${12 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(corner.number.toString(), x, y + 4);
      });
    }

    // Draw facilities
    if (layers.facilities) {
      track.facilities.forEach((facility) => {
        const x = centerX + (facility.x * scale * Math.cos(camera.x * 0.01));
        const y = centerY + (facility.y * scale);
        
        const facilityColors = {
          grandstand: '#805ad5',
          pit: '#e53e3e',
          paddock: '#38a169',
          media: '#3182ce',
          safety: '#d69e2e'
        };
        
        ctx.fillStyle = facilityColors[facility.type];
        ctx.fillRect(x - 4 * scale, y - 4 * scale, 8 * scale, 8 * scale);
      });
    }

    // Draw sectors
    if (layers.sectors) {
      track.sectors_data.forEach((sector, index) => {
        const sectorColors = ['#f56565', '#48bb78', '#4299e1'];
        ctx.strokeStyle = sectorColors[index % 3];
        ctx.lineWidth = 2 * scale;
        ctx.setLineDash([10, 5]);
        
        // Draw sector boundaries (simplified)
        const sectorY = centerY - 100 + (index * 30);
        ctx.beginPath();
        ctx.moveTo(50, sectorY);
        ctx.lineTo(ctx.canvas.width - 50, sectorY);
        ctx.stroke();
        
        ctx.setLineDash([]);
      });
    }
  };

  const handleCornerClick = (corner: CornerData) => {
    setSelectedCorner(corner);
  };

  const resetCamera = () => {
    setCameraPosition({ x: 0, y: 50, z: 100 });
    setZoom(1);
  };

  const toggleLayer = (layer: keyof typeof showLayers) => {
    setShowLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: '600px' }}
      />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <MapPin className="mr-2" size={20} />
          {trackData.name}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Length:</span>
            <span className="font-medium">{trackData.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Corners:</span>
            <span className="font-medium">{trackData.corners}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>DRS Zones:</span>
            <span className="font-medium">{trackData.drsZones}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Elevation:</span>
            <span className="font-medium">{trackData.elevation.change}m</span>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          onClick={() => setIsRotating(!isRotating)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-lg backdrop-blur-sm transition-colors ${
            isRotating 
              ? 'bg-red-600/80 text-white' 
              : 'bg-black/80 text-white hover:bg-black/90'
          }`}
        >
          {isRotating ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          onClick={resetCamera}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-lg hover:bg-black/90 transition-colors"
        >
          <RotateCcw size={20} />
        </motion.button>

        <motion.button
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-lg hover:bg-black/90 transition-colors"
        >
          <ZoomIn size={20} />
        </motion.button>

        <motion.button
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-lg hover:bg-black/90 transition-colors"
        >
          <ZoomOut size={20} />
        </motion.button>
      </div>

      {/* Layer Controls */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
        <h4 className="text-sm font-semibold mb-3 flex items-center">
          <Layers className="mr-2" size={16} />
          Layers
        </h4>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(showLayers).map(([key, value]) => (
            <label key={key} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleLayer(key as keyof typeof showLayers)}
                className="mr-2 rounded"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white">
        <div className="flex gap-1">
          {['overview', 'detailed', 'technical'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-3 py-2 text-xs rounded-md transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-red-600 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Corner Details Modal */}
      {selectedCorner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCorner(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Corner {selectedCorner.number}: {selectedCorner.name}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Type:</span>
                <span className="font-medium capitalize text-gray-900 dark:text-white">
                  {selectedCorner.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Angle:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedCorner.angle}°
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Banking:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedCorner.banking}°
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Speed:</span>
                <span className={`font-medium capitalize ${
                  selectedCorner.speed === 'fast' ? 'text-green-600' :
                  selectedCorner.speed === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedCorner.speed}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Difficulty:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full mr-1 ${
                        i < selectedCorner.difficulty ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedCorner(null)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Technical Specifications Panel */}
      {viewMode === 'technical' && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-sm text-white p-6 overflow-y-auto"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Settings className="mr-2" size={20} />
            Technical Specifications
          </h3>
          
          {/* Track Specifications */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Gauge className="mr-2" size={16} />
              Track Data
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Length:</span>
                <span>{trackData.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Track Width:</span>
                <span>12-15m</span>
              </div>
              <div className="flex justify-between">
                <span>Pit Lane Length:</span>
                <span>320m</span>
              </div>
              <div className="flex justify-between">
                <span>Max Elevation:</span>
                <span>{trackData.elevation.max}m</span>
              </div>
              <div className="flex justify-between">
                <span>Min Elevation:</span>
                <span>{trackData.elevation.min}m</span>
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Flag className="mr-2" size={16} />
              Sectors
            </h4>
            {trackData.sectors_data.map((sector) => (
              <div key={sector.number} className="mb-3 p-3 bg-white/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Sector {sector.number}</span>
                  <span className="text-sm">{sector.length}</span>
                </div>
                <div className="text-xs text-gray-300">
                  {sector.characteristics.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* DRS Zones */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="mr-2" size={16} />
              DRS Zones
            </h4>
            {trackData.drs_zones.map((drs) => (
              <div key={drs.number} className="mb-2 p-2 bg-green-900/30 rounded">
                <div className="flex justify-between text-sm">
                  <span>Zone {drs.number}</span>
                  <span>{drs.length}m</span>
                </div>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Eye className="mr-2" size={16} />
              Facilities
            </h4>
            {trackData.facilities.map((facility, index) => (
              <div key={index} className="mb-2 p-2 bg-white/5 rounded text-sm">
                <div className="flex justify-between">
                  <span className="capitalize">{facility.type}</span>
                  {facility.capacity && (
                    <span>{facility.capacity.toLocaleString()}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400">{facility.name}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Track3DViewer;