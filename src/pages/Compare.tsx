import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Trophy, TrendingUp, Zap, Target, Award, Clock, Flag } from 'lucide-react';
import { f1Api, Driver } from '../services/api';

const Compare: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(['Max Verstappen', 'Lewis Hamilton']);
  const [loading, setLoading] = useState(true);
  const [comparisonMode, setComparisonMode] = useState<'season' | 'career' | 'performance'>('season');

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

  const getDriverData = (driverName: string) => {
    return drivers.find(d => d.name === driverName);
  };

  const getComparisonData = () => {
    const driver1 = getDriverData(selectedDrivers[0]);
    const driver2 = getDriverData(selectedDrivers[1]);
    
    if (!driver1 || !driver2) return [];

    switch (comparisonMode) {
      case 'season':
        return [
          { category: 'Points', driver1: driver1.points, driver2: driver2.points },
          { category: 'Wins', driver1: driver1.wins, driver2: driver2.wins },
          { category: 'Podiums', driver1: driver1.podiums, driver2: driver2.podiums },
          { category: 'Poles', driver1: driver1.poles, driver2: driver2.poles },
          { category: 'Fastest Laps', driver1: driver1.fastestLaps, driver2: driver2.fastestLaps }
        ];
      case 'career':
        return [
          { category: 'Career Wins', driver1: driver1.careerWins, driver2: driver2.careerWins },
          { category: 'Career Podiums', driver1: driver1.careerPodiums, driver2: driver2.careerPodiums },
          { category: 'Championships', driver1: driver1.championships, driver2: driver2.championships },
          { category: 'Experience', driver1: driver1.experience, driver2: driver2.experience }
        ];
      case 'performance':
        return [
          { category: 'Speed', driver1: driver1.speed, driver2: driver2.speed },
          { category: 'Consistency', driver1: driver1.consistency, driver2: driver2.consistency },
          { category: 'Racecraft', driver1: driver1.racecraft, driver2: driver2.racecraft },
          { category: 'Qualifying', driver1: driver1.qualifying, driver2: driver2.qualifying },
          { category: 'Pressure', driver1: driver1.pressure, driver2: driver2.pressure }
        ];
      default:
        return [];
    }
  };

  const getRadarData = () => {
    const driver1 = getDriverData(selectedDrivers[0]);
    const driver2 = getDriverData(selectedDrivers[1]);
    
    if (!driver1 || !driver2) return [];

    return [
      { attribute: 'Speed', driver1: driver1.speed, driver2: driver2.speed },
      { attribute: 'Consistency', driver1: driver1.consistency, driver2: driver2.consistency },
      { attribute: 'Racecraft', driver1: driver1.racecraft, driver2: driver2.racecraft },
      { attribute: 'Qualifying', driver1: driver1.qualifying, driver2: driver2.qualifying },
      { attribute: 'Pressure', driver1: driver1.pressure, driver2: driver2.pressure },
      { attribute: 'Experience', driver1: driver1.experience, driver2: driver2.experience }
    ];
  };

  const getAIAnalysis = () => {
    const driver1 = getDriverData(selectedDrivers[0]);
    const driver2 = getDriverData(selectedDrivers[1]);
    
    if (!driver1 || !driver2) return { strengths: [], prediction: '', keyFactors: [] };

    const analyses = [
      {
        condition: driver1.points > driver2.points * 1.5,
        strengths: [
          `${driver1.name} dominates with ${driver1.points} points vs ${driver2.points}`,
          `Superior consistency rating: ${driver1.consistency}/100`,
          `${driver1.wins} wins this season showcase race-winning pace`
        ],
        prediction: `${driver1.name} has an 85% win probability in head-to-head battles`,
        keyFactors: ['Championship form', 'Car performance advantage', 'Mental strength under pressure']
      },
      {
        condition: driver1.experience > driver2.experience + 10,
        strengths: [
          `${driver1.name} brings veteran experience (${driver1.experience}/100)`,
          `${driver1.careerWins} career wins demonstrate proven race craft`,
          `Superior pressure handling in crucial moments`
        ],
        prediction: `Experience gives ${driver1.name} a 70% advantage in challenging conditions`,
        keyFactors: ['Weather adaptability', 'Strategic decision making', 'Tire management']
      },
      {
        condition: driver2.qualifying > driver1.qualifying + 5,
        strengths: [
          `${driver2.name} excels in qualifying with ${driver2.qualifying}/100 rating`,
          `Better one-lap pace gives grid position advantage`,
          `Strong Saturday performance translates to Sunday success`
        ],
        prediction: `${driver2.name} has a 65% chance of outqualifying ${driver1.name}`,
        keyFactors: ['Track layout', 'Weather conditions', 'Car setup optimization']
      },
      {
        condition: Math.abs(driver1.speed - driver2.speed) < 3,
        strengths: [
          `Evenly matched on pure speed (${driver1.speed} vs ${driver2.speed})`,
          `Race outcome will depend on strategy and execution`,
          `Both drivers capable of race-winning performances`
        ],
        prediction: `Extremely close battle - 52% vs 48% probability split`,
        keyFactors: ['Pit stop strategy', 'Tire degradation', 'Safety car timing']
      }
    ];

    return analyses.find(a => a.condition) || analyses[analyses.length - 1];
  };

  const getWinProbability = () => {
    const driver1 = getDriverData(selectedDrivers[0]);
    const driver2 = getDriverData(selectedDrivers[1]);
    
    if (!driver1 || !driver2) return [50, 50];

    const score1 = (driver1.points * 0.3) + (driver1.speed * 0.2) + (driver1.consistency * 0.2) + 
                   (driver1.racecraft * 0.15) + (driver1.experience * 0.15);
    const score2 = (driver2.points * 0.3) + (driver2.speed * 0.2) + (driver2.consistency * 0.2) + 
                   (driver2.racecraft * 0.15) + (driver2.experience * 0.15);
    
    const total = score1 + score2;
    const prob1 = Math.round((score1 / total) * 100);
    const prob2 = 100 - prob1;
    
    return [prob1, prob2];
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
          <p className="text-gray-600 dark:text-gray-300">Loading driver data...</p>
        </div>
      </div>
    );
  }

  const comparisonData = getComparisonData();
  const radarData = getRadarData();
  const analysis = getAIAnalysis();
  const [prob1, prob2] = getWinProbability();
  const driver1 = getDriverData(selectedDrivers[0]);
  const driver2 = getDriverData(selectedDrivers[1]);

  const pieData = [
    { name: selectedDrivers[0], value: prob1, color: '#dc2626' },
    { name: selectedDrivers[1], value: prob2, color: '#2563eb' }
  ];

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
            Driver Comparison Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI-powered head-to-head driver analysis with comprehensive performance metrics
          </p>
        </motion.div>

        {/* Driver Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="mr-2" size={24} />
            Select Drivers to Compare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Driver 1
              </label>
              <select
                value={selectedDrivers[0]}
                onChange={(e) => setSelectedDrivers([e.target.value, selectedDrivers[1]])}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.name}>{driver.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Driver 2
              </label>
              <select
                value={selectedDrivers[1]}
                onChange={(e) => setSelectedDrivers([selectedDrivers[0], e.target.value])}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.name}>{driver.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Mode Toggle */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['season', 'career', 'performance'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setComparisonMode(mode as any)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 capitalize ${
                    comparisonMode === mode
                      ? 'bg-white dark:bg-gray-600 text-red-600 dark:text-red-400 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  {mode} Stats
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Driver Profile Cards */}
        {driver1 && driver2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[driver1, driver2].map((driver, index) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {driver.name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-2xl mr-2">{driver.flag}</span>
                      <span>{driver.team}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      #{driver.position}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Position</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {driver.points}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Comparison Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart className="mr-2" size={20} />
              {comparisonMode.charAt(0).toUpperCase() + comparisonMode.slice(1)} Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="driver1" fill="#dc2626" name={selectedDrivers[0]} />
                <Bar dataKey="driver2" fill="#2563eb" name={selectedDrivers[1]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Win Probability Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="mr-2" size={20} />
              Win Probability
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="mr-2" size={20} />
              Performance Profile
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name={selectedDrivers[0]}
                  dataKey="driver1"
                  stroke="#dc2626"
                  fill="#dc2626"
                  fillOpacity={0.2}
                />
                <Radar
                  name={selectedDrivers[1]}
                  dataKey="driver2"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Career Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="mr-2" size={20} />
              Career Achievements
            </h3>
            <div className="space-y-4">
              {[driver1, driver2].map((driver, index) => (
                <div key={driver?.id} className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {driver?.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>Championships: {driver?.championships}</div>
                    <div>Career Wins: {driver?.careerWins}</div>
                    <div>Career Podiums: {driver?.careerPodiums}</div>
                    <div>Age: {driver?.age}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-2" size={24} />
            AI Analysis: {selectedDrivers[0]} vs {selectedDrivers[1]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Trophy className="mr-2" size={20} />
                Key Strengths
              </h4>
              <ul className="space-y-2 text-blue-100">
                {analysis.strengths.map((strength, index) => (
                  <li key={index}>• {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Target className="mr-2" size={20} />
                Race Prediction
              </h4>
              <div className="space-y-2 text-blue-100">
                <p>{analysis.prediction}</p>
                <div className="bg-white/20 rounded-lg p-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{selectedDrivers[0]}</span>
                    <span className="font-bold">{prob1}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{selectedDrivers[1]}</span>
                    <span className="font-bold">{prob2}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Flag className="mr-2" size={20} />
                Key Factors
              </h4>
              <ul className="space-y-2 text-blue-100">
                {analysis.keyFactors.map((factor, index) => (
                  <li key={index}>• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Compare;