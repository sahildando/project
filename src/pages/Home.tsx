import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Trophy, Calendar, Users, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    {
      title: "Current Champion",
      value: "Max Verstappen",
      subtitle: "Red Bull Racing",
      icon: Trophy,
      color: "from-yellow-500 to-yellow-600",
      onClick: () => navigate('/standings')
    },
    {
      title: "Next Race",
      value: "Abu Dhabi GP",
      subtitle: "Dec 8, 2024",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      onClick: () => navigate('/calendar')
    },
    {
      title: "Active Drivers",
      value: "45+",
      subtitle: "10 Teams",
      icon: Users,
      color: "from-green-500 to-green-600",
      onClick: () => navigate('/drivers')
    },
    {
      title: "Season Progress",
      value: "95%",
      subtitle: "22/23 Races",
      icon: TrendingUp,
      color: "from-red-500 to-red-600",
      onClick: () => navigate('/calendar')
    }
  ];

  const featuredCards = [
    {
      title: "Driver Profiles",
      description: "Complete driver statistics, career highlights, and performance analytics",
      icon: Users,
      gradient: "from-red-500 to-red-600",
      count: "45+",
      action: "Explore Drivers",
      onClick: () => navigate('/drivers')
    },
    {
      title: "Championship",
      description: "Live standings, points tables, and championship battle analysis",
      icon: Trophy,
      gradient: "from-blue-500 to-blue-600",
      count: "#1",
      action: "View Standings",
      onClick: () => navigate('/standings')
    },
    {
      title: "Race Calendar",
      description: "Full race schedule, results, and upcoming event information",
      icon: Calendar,
      gradient: "from-green-500 to-green-600",
      count: "23",
      action: "View Schedule",
      onClick: () => navigate('/calendar')
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      
      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Season at a Glance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real-time F1 statistics and championship insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <motion.button
                key={stat.title}
                onClick={stat.onClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.subtitle}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore F1LiveX
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive deep into the world of Formula 1 with comprehensive data, analytics, and insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCards.map((card, index) => (
              <motion.button
                key={card.title}
                onClick={card.onClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group bg-gradient-to-br ${card.gradient} rounded-xl p-8 text-white hover:shadow-2xl transition-all duration-300 cursor-pointer text-left w-full`}
              >
                <div className="flex items-center justify-between mb-6">
                  <card.icon size={32} />
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold">{card.count}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-white/90 mb-4">
                  {card.description}
                </p>
                <div className="flex items-center text-sm font-medium">
                  <span>{card.action}</span>
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
        </div>
      </section>
    </div>
  );
};

export default Home;