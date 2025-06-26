import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Flag, TrendingUp, Eye, BarChart3, MapPin, Calendar } from 'lucide-react';
import { f1Api, Constructor } from '../services/api';

const Constructors: React.FC = () => {
  const [constructors, setConstructors] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConstructors = async () => {
      try {
        const data = await f1Api.getConstructors();
        setConstructors(data);
      } catch (error) {
        console.error('Error fetching constructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructors();
  }, []);

  const handleViewTeamDetails = (constructorId: string) => {
    // Navigate to constructor detail page (to be implemented)
    console.log('View team details for:', constructorId);
  };

  const handleCompareTeams = () => {
    navigate('/compare');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300">Loading constructors...</p>
        </div>
      </div>
    );
  }

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
            F1 Constructors
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Team profiles, championship history, and performance statistics for all Formula 1 constructors
          </p>
        </motion.div>

        {/* Championship Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            2024 Championship Battle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {constructors[0]?.name || 'Red Bull Racing'}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                Leading with {constructors[0]?.points || 860} points
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {constructors.reduce((sum, c) => sum + c.wins, 0)} Total Wins
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Across all teams this season
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {constructors.length} Teams
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Competing for the title
              </div>
            </div>
          </div>
        </motion.div>

        {/* Constructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {constructors.map((constructor, index) => (
            <motion.div
              key={constructor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Team Header */}
              <div className="relative h-32 bg-gradient-to-br from-red-500 to-red-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{constructor.name}</h3>
                    <div className="flex items-center text-red-100">
                      <Flag size={14} className="mr-1" />
                      <span className="text-sm">{constructor.nationality}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">
                        #{constructor.position}
                      </span>
                    </div>
                  </div>
                </div>
                {constructor.championships > 0 && (
                  <div className="absolute top-4 right-16 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {constructor.championships}x WCC
                  </div>
                )}
              </div>

              {/* Team Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="text-red-500 mr-1" size={16} />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {constructor.points}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="text-yellow-500 mr-1" size={16} />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {constructor.wins}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wins</p>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {constructor.podiums}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Podiums</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {constructor.poles}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Poles</p>
                  </div>
                </div>

                {/* Team Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar size={14} className="mr-2" />
                    <span>Founded: {constructor.founded}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin size={14} className="mr-2" />
                    <span>{constructor.headquarters}</span>
                  </div>
                </div>

                {/* Drivers */}
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <Users size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Current Drivers
                    </span>
                  </div>
                  <div className="space-y-2">
                    {constructor.drivers.map((driver, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white flex items-center justify-between"
                      >
                        <span>{driver}</span>
                        <button
                          onClick={() => navigate(`/drivers?search=${encodeURIComponent(driver)}`)}
                          className="text-red-600 dark:text-red-400 hover:underline text-xs"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleViewTeamDetails(constructor.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Eye size={14} className="mr-1" />
                    Details
                  </motion.button>
                  <motion.button
                    onClick={handleCompareTeams}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <BarChart3 size={14} className="mr-1" />
                    Compare
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
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              Championship Standings
            </motion.button>
            <motion.button
              onClick={() => navigate('/drivers')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Users size={20} className="mr-2" />
              View All Drivers
            </motion.button>
            <motion.button
              onClick={() => navigate('/compare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <BarChart3 size={20} className="mr-2" />
              Compare Teams
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Constructors;