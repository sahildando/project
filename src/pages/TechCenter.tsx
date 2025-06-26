import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, Zap, Gauge, Wrench, Eye, BarChart3, Users, Calendar } from 'lucide-react';

const TechCenter: React.FC = () => {
  const navigate = useNavigate();

  const techCategories = [
    {
      title: "Power Units",
      description: "Engine specifications and hybrid technology",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      features: ["1.6L V6 Turbo", "ERS-K & ERS-H", "MGU-K & MGU-H", "Fuel efficiency"],
      onClick: () => console.log('Power Units details')
    },
    {
      title: "Aerodynamics",
      description: "Car design analysis and wind tunnel data",
      icon: Gauge,
      color: "from-blue-500 to-blue-600",
      features: ["Front wing", "Rear wing", "Floor design", "DRS system"],
      onClick: () => console.log('Aerodynamics details')
    },
    {
      title: "Regulations",
      description: "FIA technical rules and specifications",
      icon: Wrench,
      color: "from-green-500 to-green-600",
      features: ["Weight limits", "Dimension rules", "Safety standards", "Technical directives"],
      onClick: () => console.log('Regulations details')
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
            F1 Tech Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Technical specifications, regulations, and car development insights
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={category.onClick}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-gradient-to-br ${category.color} rounded-xl p-8 text-white hover:shadow-2xl transition-all duration-300 cursor-pointer text-left w-full`}
            >
              <div className="flex items-center justify-between mb-6">
                <category.icon size={32} />
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye size={20} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
              <p className="text-white/90 mb-4">{category.description}</p>
              <ul className="space-y-1 text-sm text-white/80">
                {category.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-12 text-center text-white mb-8"
        >
          <Settings size={64} className="mx-auto mb-6 text-red-500" />
          <h2 className="text-3xl font-bold mb-4">Advanced Features Coming Soon</h2>
          <p className="text-xl text-gray-300 mb-8">
            Comprehensive technical analysis and car specifications database
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Zap className="mx-auto mb-2 text-yellow-500" size={32} />
              <h3 className="font-semibold mb-1">Power Unit Analysis</h3>
              <p className="text-sm text-gray-400">Detailed engine performance data</p>
            </div>
            <div className="text-center">
              <Gauge className="mx-auto mb-2 text-blue-500" size={32} />
              <h3 className="font-semibold mb-1">Aerodynamic Efficiency</h3>
              <p className="text-sm text-gray-400">Wind tunnel and CFD analysis</p>
            </div>
            <div className="text-center">
              <Wrench className="mx-auto mb-2 text-green-500" size={32} />
              <h3 className="font-semibold mb-1">Technical Regulations</h3>
              <p className="text-sm text-gray-400">Complete FIA rule database</p>
            </div>
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
            Explore More F1 Data
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/drivers')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Users size={20} className="mr-2" />
              Driver Profiles
            </motion.button>
            <motion.button
              onClick={() => navigate('/compare')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <BarChart3 size={20} className="mr-2" />
              Performance Analysis
            </motion.button>
            <motion.button
              onClick={() => navigate('/calendar')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Calendar size={20} className="mr-2" />
              Race Calendar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechCenter;