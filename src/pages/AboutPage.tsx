import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Shield,
  Cpu,
  Database,
  GitBranch,
  Server,
  Cloud,
  Zap,
  BarChart3,
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileSearch,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Time-Consuming Manual Process',
    description: 'Traditional manual screening takes days or weeks to process each application.'
  },
  {
    icon: XCircle,
    title: 'Human Error',
    description: 'Manual reviews are prone to inconsistencies and errors in judgment.'
  },
  {
    icon: DollarSign,
    title: 'High Operational Costs',
    description: 'Staffing dedicated teams for application review is expensive.'
  },
  {
    icon: Users,
    title: 'Scalability Issues',
    description: 'Managing thousands of applications manually becomes impossible at scale.'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Instant Predictions',
    description: 'Get approval predictions in seconds, not days or weeks.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Target,
    title: '96% Accuracy',
    description: 'XGBoost model trained on extensive datasets for high accuracy.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solution',
    description: 'Handle thousands of applications simultaneously with cloud deployment.',
    color: 'from-green-400 to-emerald-600'
  },
  {
    icon: Shield,
    title: 'Reduced Fraud',
    description: 'ML models can detect patterns that humans might miss.',
    color: 'from-purple-400 to-indigo-600'
  }
];

const objectives = [
  'Develop an automated credit card approval prediction system',
  'Compare multiple machine learning algorithms (Logistic Regression, Decision Tree, Random Forest, XGBoost)',
  'Achieve high prediction accuracy (96%+) using the best model',
  'Provide instant, explainable predictions with confidence scores',
  'Deploy the solution for real-world banking applications'
];

const techStack = [
  { name: 'Python', category: 'Language', icon: '🐍' },
  { name: 'Scikit-learn', category: 'ML Framework', icon: '🔬' },
  { name: 'XGBoost', category: 'Algorithm', icon: '⚡' },
  { name: 'Pandas', category: 'Data Processing', icon: '🐼' },
  { name: 'NumPy', category: 'Computation', icon: '🔢' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'Frontend', icon: '📘' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
  { name: 'Supabase', category: 'Backend', icon: '⚡' },
  { name: 'Chart.js', category: 'Visualization', icon: '📊' },
  { name: 'IBM Watson', category: 'Cloud ML', icon: '☁️' },
  { name: 'Docker', category: 'Deployment', icon: '🐳' }
];

const workflow = [
  { step: 1, title: 'Data Collection', description: 'Gather historical credit card application data', icon: Database },
  { step: 2, title: 'Data Preprocessing', description: 'Clean, transform, and prepare data for training', icon: Cpu },
  { step: 3, title: 'Feature Engineering', description: 'Extract relevant features for prediction', icon: GitBranch },
  { step: 4, title: 'Model Training', description: 'Train multiple ML algorithms', icon: Brain },
  { step: 5, title: 'Model Evaluation', description: 'Compare accuracy, precision, recall, F1 scores', icon: BarChart3 },
  { step: 6, title: 'Deployment', description: 'Deploy best model to production', icon: Server }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-400/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6">
              <FileSearch className="w-4 h-4" />
              <span className="text-sm font-medium">Project Overview</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About The <span className="gradient-text">Project</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Understanding the problem, the solution, and the technology behind
              AI-powered credit card approval prediction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Problem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Traditional credit card application screening faces significant challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card border-l-4 border-red-500"
                >
                  <div className="p-3 rounded-xl bg-red-500/10 inline-block mb-4">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {problem.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Machine Learning transforms the approval process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="feature-card bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/20">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Machine Learning Approach</h3>
                    <p className="text-blue-100">
                      Train models on historical data to identify patterns and predict
                      approval outcomes with high accuracy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Automated Decision Making
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remove manual bias and inconsistency from the process
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Instant Results
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get predictions in seconds instead of days
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Scalable Infrastructure
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Handle thousands of applications simultaneously
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`feature-card ${index === 1 ? 'mt-8' : ''}`}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Objectives
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="feature-card space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-1">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with modern technologies for performance and scalability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="feature-card text-center hover:scale-105 transition-transform"
              >
                <span className="text-3xl mb-2 inline-block">{tech.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-500">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Workflow
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hidden lg:block" />

            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
              {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="feature-card text-center relative z-10">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-3 mt-2">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* IBM Watson Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8 md:p-12 text-white"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1.5px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 mb-6">
                  <Cloud className="w-4 h-4" />
                  <span className="text-sm">Cloud Deployment Ready</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  IBM Watson Machine Learning
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  The trained XGBoost model can be deployed to IBM Watson ML for
                  enterprise-grade predictions with automatic scaling and monitoring.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>REST API Integration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Automatic Model Scaling</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Real-time Monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Enterprise Security</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/30 flex items-center justify-center">
                    <Cloud className="w-24 h-24 text-white/80" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-white/20 backdrop-blur"
                  >
                    <Server className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
