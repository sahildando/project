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
  Flag,
  Camera,
  Download,
  Share2
} from 'lucide-react';
import Track3DRenderer from './Track3DRenderer';

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
  const [isRotating, setIsRotating] = useState(false);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'technical'>('overview');
  const [showLayers, setShowLayers] = useState({
    track: true,
    elevation: true,
    facilities: true,
    drsZones: true,
    sectors: true,
    corners: true,
    barriers: true,
    lighting: false
  });
  const [selectedCorner, setSelectedCorner] = useState<CornerData | null>(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 50, z: 100, rotation: 0 });
  const [zoom, setZoom] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const rotationIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRotating) {
      rotationIntervalRef.current = setInterval(() => {
        setCameraPosition(prev => ({
          ...prev,
          rotation: (prev.rotation + 1) % 360
        }));
      }, 50);
    } else {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isRotating]);

  const handleCornerClick = (corner: CornerData) => {
    setSelectedCorner(corner);
  };

  const resetCamera = () => {
    setCameraPosition({ x: 0, y: 50, z: 100, rotation: 0 });
    setZoom(1);
  };

  const toggleLayer = (layer: keyof typeof showLayers) => {
    setShowLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const handleExport = () => {
    // Implement 3D model export functionality
    console.log('Exporting 3D model...');
    alert('3D model export feature coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `F1 3D Track: ${trackData.name}`,
        text: `Check out this amazing 3D visualization of ${trackData.name}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const presetViews = [
    { name: 'Overview', rotation: 0, zoom: 1 },
    { name: 'Start/Finish', rotation: 90, zoom: 1.5 },
    { name: 'Sector 1', rotation: 180, zoom: 2 },
    { name: 'Sector 2', rotation: 270, zoom: 2 },
    { name: 'Bird\'s Eye', rotation: 0, zoom: 0.5 }
  ];

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* 3D Renderer */}
      <Track3DRenderer
        trackData={trackData}
        viewMode={viewMode}
        showLayers={showLayers}
        cameraPosition={cameraPosition}
        zoom={zoom}
        isRotating={isRotating}
        onCornerClick={handleCornerClick}
      />

      {/* Track Information Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm"
      >
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

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-white/10 rounded">
              <div className="font-bold text-red-400">{trackData.sectors}</div>
              <div className="text-gray-300">Sectors</div>
            </div>
            <div className="text-center p-2 bg-white/10 rounded">
              <div className="font-bold text-blue-400">{trackData.facilities.length}</div>
              <div className="text-gray-300">Facilities</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Controls */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 flex flex-col gap-2"
        >
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
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.3))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-lg hover:bg-black/90 transition-colors"
          >
            <ZoomOut size={20} />
          </motion.button>

          <motion.button
            onClick={handleExport}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-green-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-green-700/80 transition-colors"
          >
            <Download size={20} />
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-700/80 transition-colors"
          >
            <Share2 size={20} />
          </motion.button>
        </motion.div>
      )}

      {/* Preset Views */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white"
      >
        <h4 className="text-sm font-semibold mb-2 flex items-center">
          <Camera className="mr-2" size={16} />
          Preset Views
        </h4>
        <div className="flex gap-2">
          {presetViews.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setCameraPosition(prev => ({ ...prev, rotation: preset.rotation }));
                setZoom(preset.zoom);
              }}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Layer Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs"
      >
        <h4 className="text-sm font-semibold mb-3 flex items-center">
          <Layers className="mr-2" size={16} />
          Display Layers
        </h4>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(showLayers).map(([key, value]) => (
            <label key={key} className="flex items-center cursor-pointer hover:bg-white/10 p-1 rounded">
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
      </motion.div>

      {/* View Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 center-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white"
      >
        <div className="flex gap-1">
          {['overview', 'detailed', 'technical'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-2 text-sm rounded-md transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-red-600 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Controls Toggle */}
      <motion.button
        onClick={() => setShowControls(!showControls)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-colors"
      >
        <Eye size={16} />
      </motion.button>

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
              <Flag className="mr-2" size={16} />
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