import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Zap, Eye, Calendar, Trophy, Flag, Car, Cuboid as Cube } from 'lucide-react';

const Tracks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'all' | 'street' | 'permanent'>('all');

  const tracks = [
    {
      id: '1',
      name: 'Monaco Grand Prix',
      location: 'Monte Carlo, Monaco',
      country: 'Monaco',
      flag: '🇲🇨',
      length: '3.337 km',
      lapRecord: '1:14.260',
      recordHolder: 'Lewis Hamilton',
      drsZones: 1,
      turns: 19,
      type: 'Street Circuit',
      firstGP: 1950,
      difficulty: 'Extreme',
      characteristics: ['Narrow', 'Prestigious', 'Overtaking difficult']
    },
    {
      id: '2',
      name: 'Silverstone Circuit',
      location: 'Silverstone, UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      length: '5.891 km',
      lapRecord: '1:27.097',
      recordHolder: 'Max Verstappen',
      drsZones: 2,
      turns: 18,
      type: 'Permanent Circuit',
      firstGP: 1950,
      difficulty: 'High',
      characteristics: ['High-speed', 'Historic', 'Challenging corners']
    },
    {
      id: '3',
      name: 'Spa-Francorchamps',
      location: 'Spa, Belgium',
      country: 'Belgium',
      flag: '🇧🇪',
      length: '7.004 km',
      lapRecord: '1:46.286',
      recordHolder: 'Valtteri Bottas',
      drsZones: 3,
      turns: 20,
      type: 'Permanent Circuit',
      firstGP: 1950,
      difficulty: 'High',
      characteristics: ['Longest track', 'Weather changes', 'Eau Rouge']
    },
    {
      id: '4',
      name: 'Suzuka Circuit',
      location: 'Suzuka, Japan',
      country: 'Japan',
      flag: '🇯🇵',
      length: '5.807 km',
      lapRecord: '1:30.983',
      recordHolder: 'Lewis Hamilton',
      drsZones: 2,
      turns: 18,
      type: 'Permanent Circuit',
      firstGP: 1987,
      difficulty: 'High',
      characteristics: ['Figure-8 layout', 'Technical', 'Driver favorite']
    },
    {
      id: '5',
      name: 'Interlagos',
      location: 'São Paulo, Brazil',
      country: 'Brazil',
      flag: '🇧🇷',
      length: '4.309 km',
      lapRecord: '1:10.540',
      recordHolder: 'Valtteri Bottas',
      drsZones: 2,
      turns: 15,
      type: 'Permanent Circuit',
      firstGP: 1973,
      difficulty: 'Medium',
      characteristics: ['Anti-clockwise', 'Elevation changes', 'Passionate fans']
    },
    {
      id: '6',
      name: 'Las Vegas Strip Circuit',
      location: 'Las Vegas, USA',
      country: 'United States',
      flag: '🇺🇸',
      length: '6.201 km',
      lapRecord: '1:35.490',
      recordHolder: 'Oscar Piastri',
      drsZones: 3,
      turns: 17,
      type: 'Street Circuit',
      firstGP: 2023,
      difficulty: 'Medium',
      characteristics: ['Night race', 'Long straights', 'Entertainment capital']
    },
    {
      id: '7',
      name: 'Circuit de Barcelona-Catalunya',
      location: 'Barcelona, Spain',
      country: 'Spain',
      flag: '🇪🇸',
      length: '4.675 km',
      lapRecord: '1:18.149',
      recordHolder: 'Max Verstappen',
      drsZones: 2,
      turns: 16,
      type: 'Permanent Circuit',
      firstGP: 1991,
      difficulty: 'Medium',
      characteristics: ['Technical', 'Testing venue', 'Overtaking challenges']
    },
    {
      id: '8',
      name: 'Hungaroring',
      location: 'Budapest, Hungary',
      country: 'Hungary',
      flag: '🇭🇺',
      length: '4.381 km',
      lapRecord: '1:16.627',
      recordHolder: 'Lewis Hamilton',
      drsZones: 1,
      turns: 14,
      type: 'Permanent Circuit',
      firstGP: 1986,
      difficulty: 'Medium',
      characteristics: ['Twisty', 'Monaco without walls', 'Strategy crucial']
    },
    {
      id: '9',
      name: 'Monza Circuit',
      location: 'Monza, Italy',
      country: 'Italy',
      flag: '🇮🇹',
      length: '5.793 km',
      lapRecord: '1:21.046',
      recordHolder: 'Rubens Barrichello',
      drsZones: 3,
      turns: 11,
      type: 'Permanent Circuit',
      firstGP: 1950,
      difficulty: 'Medium',
      characteristics: ['Temple of Speed', 'Low downforce', 'Slipstream battles']
    },
    {
      id: '10',
      name: 'Marina Bay Street Circuit',
      location: 'Singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      length: '5.063 km',
      lapRecord: '1:35.867',
      recordHolder: 'Kevin Magnussen',
      drsZones: 3,
      turns: 23,
      type: 'Street Circuit',
      firstGP: 2008,
      difficulty: 'High',
      characteristics: ['Night race', 'Humid conditions', 'Bumpy surface']
    }
  ];

  const filteredTracks = tracks.filter(track => {
    if (selectedType === 'all') return true;
    return selectedType === 'street' ? track.type === 'Street Circuit' : track.type === 'Permanent Circuit';
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Extreme':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const handleExploreTrack = (trackId: string) => {
    console.log('Explore track:', trackId);
  };

  const handleViewRaceHistory = (trackName: string) => {
    navigate(`/calendar?track=${encodeURIComponent(trackName)}`);
  };

  const handleView3D = () => {
    navigate('/tracks/3d');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            F1 Circuits
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore iconic Formula 1 tracks with detailed layouts, statistics, and racing history
          </p>
        </motion.div>

        {/* 3D Visualization CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 mb-8 text-white text-center"
        >
          <Cube size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Experience Tracks in 3D</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Explore Formula 1 circuits like never before with our interactive 3D visualization. 
            See elevation changes, corner details, DRS zones, and facilities in stunning detail.
          </p>
          <motion.button
            onClick={handleView3D}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center mx-auto"
          >
            <Cube size={20} className="mr-2" />
            Launch 3D Track Viewer
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: 'all', label: 'All Circuits' },
              { key: 'permanent', label: 'Permanent' },
              { key: 'street', label: 'Street Circuits' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedType(key as any)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedType === key
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Track Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{tracks.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Circuits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {tracks.filter(t => t.type === 'Street Circuit').length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Street Circuits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.max(...tracks.map(t => parseFloat(t.length)))} km
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Longest Track</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {Math.min(...tracks.map(t => t.firstGP))}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">First GP</p>
            </div>
          </div>
        </motion.div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Track Header */}
              <div className="relative h-24 bg-gradient-to-br from-blue-500 to-blue-600 p-4">
                <div className="flex items-center justify-between h-full">
                  <div className="text-white">
                    <div className="text-2xl mb-1">{track.flag}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Car size={20} className="text-white" />
                  </div>
                </div>
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(track.difficulty)}`}>
                  {track.difficulty}
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {track.type}
                </div>
              </div>

              {/* Track Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {track.name}
                </h3>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{track.location}</span>
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
                      {track.turns}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Turns</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Lap Record
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {track.lapRecord}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {track.recordHolder}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap size={16} className="text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        DRS Zones
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {track.drsZones}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Flag size={16} className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        First GP
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {track.firstGP}
                    </span>
                  </div>
                </div>

                {/* Track Characteristics */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Characteristics
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {track.characteristics.map((char, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleExploreTrack(track.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Eye size={14} className="mr-1" />
                    Explore
                  </motion.button>
                  <motion.button
                    onClick={() => handleViewRaceHistory(track.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Calendar size={14} className="mr-1" />
                    Races
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleView3D}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Cube size={20} className="mr-2" />
              3D Track Viewer
            </motion.button>
            <motion.button
              onClick={() => navigate('/calendar')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Calendar size={20} className="mr-2" />
              Race Calendar
            </motion.button>
            <motion.button
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              Championship
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tracks;