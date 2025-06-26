import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle, Play, Eye, Trophy, Flag } from 'lucide-react';
import { f1Api, Race } from '../services/api';

const Calendar: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'live'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await f1Api.getRaces();
        setRaces(data);
      } catch (error) {
        console.error('Error fetching races:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  const getStatusIcon = (status: Race['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'live':
        return <Play className="text-red-500" size={20} />;
      default:
        return <Clock className="text-blue-500" size={20} />;
    }
  };

  const getStatusColor = (status: Race['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'live':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const filteredRaces = races.filter(race => {
    if (filter === 'all') return true;
    return race.status === filter;
  });

  const handleViewResults = (raceId: string, status: Race['status']) => {
    if (status === 'completed') {
      // Navigate to race results page (to be implemented)
      console.log('View results for race:', raceId);
    } else {
      // Navigate to race details page (to be implemented)
      console.log('View details for race:', raceId);
    }
  };

  const handleSetReminder = (raceId: string) => {
    // Implement reminder functionality
    console.log('Set reminder for race:', raceId);
    alert('Reminder set! You will be notified before the race starts.');
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
          <p className="text-gray-600 dark:text-gray-300">Loading race calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            F1 Race Calendar 2024
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete Formula 1 race schedule with results and upcoming events
          </p>
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
              { key: 'all', label: 'All Races' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'live', label: 'Live' },
              { key: 'completed', label: 'Completed' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Season Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Season Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {races.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {races.filter(r => r.status === 'upcoming').length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {races.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Races</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {Math.round((races.filter(r => r.status === 'completed').length / races.length) * 100)}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Complete</p>
            </div>
          </div>
        </motion.div>

        {/* Race Cards */}
        <div className="space-y-6">
          {filteredRaces.map((race, index) => (
            <motion.div
              key={race.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="md:flex">
                {/* Race Image */}
                <div className="md:w-1/3">
                  {race.circuit && (
                    <img
                      src={race.circuit}
                      alt={race.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/8962877/pexels-photo-8962877.jpeg';
                      }}
                    />
                  )}
                  {!race.circuit && (
                    <div className="w-full h-48 md:h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <CalendarIcon size={48} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Race Details */}
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {race.name}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin size={16} className="mr-2" />
                        <span>{race.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                        <CalendarIcon size={16} className="mr-2" />
                        <span>{new Date(race.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {race.lapRecord && (
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={16} className="mr-2" />
                          <span>Lap Record: {race.lapRecord}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(race.status)}`}>
                        <div className="flex items-center">
                          {getStatusIcon(race.status)}
                          <span className="ml-2 capitalize">{race.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Race Stats */}
                  {(race.laps || race.distance) && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {race.laps && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {race.laps}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Laps</p>
                        </div>
                      )}
                      {race.distance && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {race.distance}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Weather Info */}
                  {race.weather && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <Flag size={16} className="mr-2" />
                        Weather Conditions
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">{race.weather}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      onClick={() => handleViewResults(race.id, race.status)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      {race.status === 'completed' ? (
                        <>
                          <Trophy size={16} className="mr-2" />
                          View Results
                        </>
                      ) : (
                        <>
                          <Eye size={16} className="mr-2" />
                          Race Details
                        </>
                      )}
                    </motion.button>
                    
                    {race.status === 'upcoming' && (
                      <motion.button
                        onClick={() => handleSetReminder(race.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Clock size={16} className="mr-2" />
                        Set Reminder
                      </motion.button>
                    )}

                    <motion.button
                      onClick={() => navigate('/tracks')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <MapPin size={16} className="mr-2" />
                      Track Info
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No races found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try selecting a different filter
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
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              Championship Standings
            </motion.button>
            <motion.button
              onClick={() => navigate('/tracks')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <MapPin size={20} className="mr-2" />
              All Circuits
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calendar;