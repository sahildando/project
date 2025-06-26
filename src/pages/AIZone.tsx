import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, Target, Zap, Eye, BarChart3, Users, Trophy } from 'lucide-react';

const AIZone: React.FC = () => {
  const navigate = useNavigate();

  const aiFeatures = [
    {
      title: "Race Predictions",
      description: "AI race outcome forecasts based on historical data",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      accuracy: "87%",
      features: ["Weather analysis", "Driver form", "Car performance", "Track history"],
      onClick: () => console.log('Race Predictions')
    },
    {
      title: "Strategy Analysis",
      description: "Optimal pit stop timing and tire strategy",
      icon: Target,
      color: "from-red-500 to-red-600",
      accuracy: "92%",
      features: ["Tire degradation", "Fuel consumption", "Safety car probability", "Track position"],
      onClick: () => console.log('Strategy Analysis')
    },
    {
      title: "Performance Insights",
      description: "Driver potential analysis and team comparisons",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      accuracy: "89%",
      features: ["Lap time analysis", "Sector performance", "Qualifying pace", "Race craft"],
      onClick: () => navigate('/compare')
    }
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
            F1 AI Zone
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI-powered predictions, insights, and advanced racing analytics
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.button
              key={feature.title}
              onClick={feature.onClick}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-gradient-to-br ${feature.color} rounded-xl p-8 text-white hover:shadow-2xl transition-all duration-300 cursor-pointer text-left w-full`}
            >
              <div className="flex items-center justify-between mb-6">
                <feature.icon size={32} />
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold">{feature.accuracy}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/90 mb-4">{feature.description}</p>
              <ul className="space-y-1 text-sm text-white/80">
                {feature.features.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center text-sm font-medium">
                <span>Explore Feature</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main AI Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-12 text-center text-white mb-8"
        >
          <Brain size={64} className="mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">Advanced AI Analytics Available Now</h2>
          <p className="text-xl text-purple-100 mb-8">
            Experience cutting-edge machine learning models for F1 predictions and analysis
          </p>
          
          {/* AI Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">10M+</div>
              <div className="text-purple-200">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
              <div className="text-purple-200">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-purple-200">Seasons Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">Real-time</div>
              <div className="text-purple-200">Predictions</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/compare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <BarChart3 size={20} className="mr-2" />
              Try Driver Comparison
            </motion.button>
            <motion.button
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              Championship Analysis
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Explore AI-Powered Features
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/drivers')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Users size={20} className="mr-2" />
              Driver Analytics
            </motion.button>
            <motion.button
              onClick={() => navigate('/compare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <BarChart3 size={20} className="mr-2" />
              Performance Comparison
            </motion.button>
            <motion.button
              onClick={() => navigate('/standings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Trophy size={20} className="mr-2" />
              Championship Predictions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIZone;