import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Trophy, Flag, Users, Eye, BarChart3 } from 'lucide-react';
import { f1Api, Driver } from '../services/api';

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [sortBy, setSortBy] = useState<'position' | 'points' | 'wins' | 'name'>('position');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await f1Api.getDrivers();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const filteredDrivers = drivers
    .filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === '' || driver.team === selectedTeam;
      return matchesSearch && matchesTeam;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'position':
          return a.position - b.position;
        case 'points':
          return b.points - a.points;
        case 'wins':
          return b.wins - a.wins;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.position - b.position;
      }
    });

  const teams = [...new Set(drivers.map(driver => driver.team))];

  const handleViewProfile = (driverId: string) => {
    // Navigate to driver detail page (to be implemented)
    console.log('View profile for driver:', driverId);
  };

  const handleCompareDriver = (driverName: string) => {
    navigate(`/compare?driver=${encodeURIComponent(driverName)}`);
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
          <p className="text-gray-600 dark:text-gray-300">Loading drivers...</p>
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
            F1 Drivers Database
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete profiles, statistics, and performance data for 45+ Formula 1 drivers including current grid and legends
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col lg:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search drivers or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="">All Teams</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="position">Sort by Position</option>
            <option value="points">Sort by Points</option>
            <option value="wins">Sort by Wins</option>
            <option value="name">Sort by Name</option>
          </select>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{drivers.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Drivers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{teams.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Teams</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {drivers.filter(d => d.position <= 20).length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Drivers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {drivers.filter(d => d.championships > 0).length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Champions</p>
            </div>
          </div>
        </motion.div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Driver Header */}
              <div className="relative h-24 bg-gradient-to-br from-red-500 to-red-600 p-4">
                <div className="flex items-center justify-between h-full">
                  <div className="text-white">
                    <div className="text-2xl mb-1">{driver.flag}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <span className="text-white font-bold text-lg">
                      #{driver.position}
                    </span>
                  </div>
                </div>
                {driver.championships > 0 && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {driver.championships}x WDC
                  </div>
                )}
              </div>

              {/* Driver Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {driver.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Trophy size={16} />
                    <span className="text-sm font-semibold">{driver.wins}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <Users size={16} className="mr-2" />
                  <span className="text-sm truncate">{driver.team}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      {driver.points}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {driver.podiums}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Podiums</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {driver.age}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Flag size={14} className="mr-1" />
                    <span className="text-xs">{driver.nationality}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Career: {driver.careerWins} wins
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleViewProfile(driver.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Eye size={14} className="mr-1" />
                    Profile
                  </motion.button>
                  <motion.button
                    onClick={() => handleCompareDriver(driver.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <BarChart3 size={14} className="mr-1" />
                    Compare
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No drivers found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/compare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <BarChart3 size={20} className="mr-2" />
              Compare Drivers
            </motion.button>
            <motion.button
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              View Standings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Drivers;