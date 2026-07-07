import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Zap,
  Target,
  Shield,
  Cloud,
  TrendingUp,
  Cpu,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Applications Processed', icon: CreditCard },
  { value: 96, suffix: '%', label: 'Prediction Accuracy', icon: Target },
  { value: 4, suffix: '', label: 'ML Algorithms', icon: Cpu },
  { value: 50000, suffix: '+', label: 'Users Served', icon: Users }
];

const features = [
  {
    icon: Zap,
    title: 'Instant Prediction',
    description: 'Get credit card approval predictions in seconds using our advanced ML models.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Target,
    title: 'High Accuracy',
    description: '96% prediction accuracy using XGBoost algorithm trained on extensive data.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared. Enterprise-grade security.',
    color: 'from-green-400 to-emerald-600'
  },
  {
    icon: Cloud,
    title: 'Cloud Ready',
    description: 'Deployed on IBM Watson ML for scalable, enterprise predictions.',
    color: 'from-purple-400 to-indigo-600'
  }
];

const models = [
  { name: 'Logistic Regression', accuracy: 82.5, color: '#94a3b8' },
  { name: 'Decision Tree', accuracy: 85.3, color: '#60a5fa' },
  { name: 'Random Forest', accuracy: 91.2, color: '#34d399' },
  { name: 'XGBoost', accuracy: 96.4, color: '#0A3D62', featured: true }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,61,98,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,61,98,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by Machine Learning</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">AI Powered</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 bg-clip-text text-transparent">
                  Credit Card Approval
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Prediction</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Predict Credit Card Eligibility in Seconds Using Machine Learning.
                Our XGBoost model achieves 96% accuracy on approval predictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/predict">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Try Prediction</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <span>Learn More</span>
                  </motion.button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>No Credit Check Required</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Credit Card Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[320px] h-[200px] rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6 shadow-2xl shadow-blue-900/50"
                >
                  {/* Card Content */}
                  <div className="h-full flex flex-col justify-between">
                    {/* Chip */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-10 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-0.5">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-yellow-600 rounded-sm" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-300 text-xs font-medium">PLATINUM</p>
                        <p className="text-white text-lg font-bold tracking-wider">VISA</p>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="space-y-4">
                      <p className="text-white text-lg tracking-widest font-mono">
                        4532 •••• •••• 8901
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-blue-300 text-xs">CARD HOLDER</p>
                          <p className="text-white text-sm font-medium">AI APPROVED</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-300 text-xs">VALID THRU</p>
                          <p className="text-white text-sm font-medium">12/28</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hologram Effect */}
                  <div className="absolute top-4 right-16 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 opacity-60" />
                </motion.div>

                {/* Background Card */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-8 w-[280px] h-[180px] rounded-2xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 shadow-xl opacity-60 -rotate-6"
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-10 -left-10 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                >
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-10 -left-5 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                >
                  <Shield className="w-6 h-6 text-blue-500" />
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 rounded-xl bg-green-500 text-white shadow-lg"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="stat-card"
                >
                  <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Advanced machine learning technology meets enterprise-grade security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card group"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ML Models Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Machine Learning Models
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Compare the accuracy of different ML algorithms used in our system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl ${
                  model.featured
                    ? 'bg-gradient-to-br from-blue-900 to-blue-800 text-white shadow-2xl shadow-blue-900/30'
                    : 'glass-card'
                }`}
              >
                {model.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                    BEST MODEL
                  </div>
                )}
                <h3 className={`text-lg font-semibold mb-4 ${model.featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {model.name}
                </h3>
                <div className="relative h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${model.accuracy}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: model.featured ? '#00C853' : model.color }}
                  />
                </div>
                <p className={`text-2xl font-bold ${model.featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {model.accuracy}%
                </p>
                <p className={`text-sm ${model.featured ? 'text-blue-200' : 'text-gray-500'}`}>
                  Accuracy
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/models"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <span>View detailed model comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                About The Project
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Banks receive thousands of credit card applications every day. Many are rejected due to
                insufficient income, poor credit history, high outstanding loans, or excessive credit inquiries.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                This system automates the approval process using Machine Learning, comparing multiple
                algorithms to provide instant, accurate predictions.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="feature-card">
                    <TrendingUp className="w-8 h-8 text-blue-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fast Processing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Instant predictions</p>
                  </div>
                  <div className="feature-card">
                    <Shield className="w-8 h-8 text-green-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Secure</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise security</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="feature-card">
                    <Cpu className="w-8 h-8 text-purple-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI Powered</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">XGBoost algorithm</p>
                  </div>
                  <div className="feature-card">
                    <Cloud className="w-8 h-8 text-cyan-500 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Cloud Ready</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">IBM Watson ML</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1.5px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Check Your Eligibility?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get an instant prediction of your credit card approval chances using our
              advanced machine learning system.
            </p>
            <Link to="/predict">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-white text-blue-900 font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Prediction</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
