import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Settings, Info } from 'lucide-react';
import Track3DViewer from '../components/Track3D/Track3DViewer';
import TrackSelector from '../components/Track3D/TrackSelector';
import { trackDatabase, getTrackById, TrackData } from '../data/trackData';

const Track3D: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('monaco');
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const track = getTrackById(selectedTrackId);
    setSelectedTrack(track || null);
    setIsLoading(false);
  }, [selectedTrackId]);

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrackId(trackId);
    setShowSelector(false);
  };

  const handleDownload = () => {
    // Implement 3D model download functionality
    console.log('Download 3D model for:', selectedTrack?.name);
    alert('3D model download feature coming soon!');
  };

  const handleShare = () => {
    // Implement sharing functionality
    if (navigator.share && selectedTrack) {
      navigator.share({
        title: `F1 3D Track: ${selectedTrack.name}`,
        text: `Check out this amazing 3D visualization of ${selectedTrack.name}!`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300">Loading 3D track visualization...</p>
        </div>
      </div>
    );
  }

  if (showSelector) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={() => setShowSelector(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to 3D View
            </motion.button>
          </div>

          <TrackSelector
            tracks={trackDatabase}
            selectedTrack={selectedTrackId}
            onTrackSelect={handleTrackSelect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.button
              onClick={() => navigate('/tracks')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors mr-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Tracks
            </motion.button>

            {selectedTrack && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedTrack.name} - 3D Visualization
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive 3D track model with technical specifications
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setShowSelector(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Settings size={16} className="mr-2" />
              Change Track
            </motion.button>

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </motion.button>

            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Download size={16} className="mr-2" />
              Download
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="h-screen">
        {selectedTrack ? (
          <Track3DViewer
            trackData={selectedTrack}
            onTrackSelect={handleTrackSelect}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Info size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Track not found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The selected track could not be loaded.
              </p>
              <motion.button
                onClick={() => setShowSelector(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Select Different Track
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Track Information Panel */}
      {selectedTrack && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Length</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedTrack.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Corners</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedTrack.corners}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">DRS Zones</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedTrack.drsZones}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Elevation</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedTrack.elevation.change}m</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lap Record</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedTrack.lapRecord}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Record Holder</p>
                <p className="font-bold text-gray-900 dark:text-white text-xs">{selectedTrack.recordHolder}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Track3D;