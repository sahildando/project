import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Flag, Clock, Zap } from 'lucide-react';

interface TrackSelectorProps {
  tracks: TrackData[];
  selectedTrack: string;
  onTrackSelect: (trackId: string) => void;
}

interface TrackData {
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
  corners_data: any[];
  sectors_data: any[];
  drs_zones: any[];
  facilities: any[];
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ 
  tracks, 
  selectedTrack, 
  onTrackSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'street' | 'permanent'>('all');

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || 
                       (filterType === 'street' && track.type === 'Street Circuit') ||
                       (filterType === 'permanent' && track.type === 'Permanent Circuit');
    return matchesSearch && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Extreme': return 'bg-red-500';
      case 'Hard': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Easy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Select F1 Circuit
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Choose a Formula 1 circuit to explore in 3D
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search circuits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Circuits' },
            { key: 'permanent', label: 'Permanent' },
            { key: 'street', label: 'Street' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterType(key as any)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterType === key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track, index) => (
          <motion.button
            key={track.id}
            onClick={() => onTrackSelect(track.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedTrack === track.id
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300 dark:hover:border-red-600'
            }`}
          >
            {/* Track Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{track.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {track.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {track.location}
                  </div>
                </div>
              </div>
              
              <div className={`w-3 h-3 rounded-full ${getDifficultyColor(track.difficulty)}`} />
            </div>

            {/* Track Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {track.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Length</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {track.corners}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Corners</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">DRS Zones:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {track.drsZones}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Elevation:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {track.elevation.change}m
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Type:</span>
                <span className="font-medium text-gray-900 dark:text-white text-xs">
                  {track.type}
                </span>
              </div>
            </div>

            {/* Lap Record */}
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={16} className="text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {track.lapRecord}
                  </span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {track.recordHolder}
                </span>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedTrack === track.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4 flex items-center justify-center text-red-600 dark:text-red-400"
              >
                <Flag size={16} className="mr-2" />
                <span className="text-sm font-medium">Selected</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No circuits found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackSelector;