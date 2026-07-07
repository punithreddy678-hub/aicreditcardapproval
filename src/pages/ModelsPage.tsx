import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  GitBranch,
  Brain,
  Cpu,
  CheckCircle2,
  XCircle,
  Zap,
  Award,
  AlertTriangle
} from 'lucide-react';
import { modelMetrics } from '../utils/prediction';

const modelDetails = [
  {
    name: 'Logistic Regression',
    icon: BarChart3,
    description: 'A statistical model that uses a logistic function to model binary dependent variables. It estimates the probability of an event occurring based on a linear combination of predictor variables.',
    advantages: [
      'Simple to implement and interpret',
      'Computationally efficient',
      'Works well with linearly separable data',
      'Provides probability estimates',
      'Low risk of overfitting with small datasets'
    ],
    disadvantages: [
      'Assumes linear relationship between features',
      'Cannot handle complex non-linear patterns',
      'Sensitive to outliers',
      'Requires feature scaling for optimal performance'
    ],
    useCases: [
      'Initial baseline model',
      'Quick probability estimates',
      'When interpretability is crucial'
    ],
    color: '#94a3b8',
    gradient: 'from-slate-400 to-slate-600'
  },
  {
    name: 'Decision Tree',
    icon: GitBranch,
    description: 'A tree-like model of decisions and their possible consequences. It breaks down a problem into smaller sub-problems using a hierarchy of if-then-else decision rules.',
    advantages: [
      'Easy to understand and visualize',
      'Handles both numerical and categorical data',
      'No need for feature scaling',
      'Can capture non-linear relationships',
      'Provides feature importance rankings'
    ],
    disadvantages: [
      'Prone to overfitting',
      'Can be unstable with small data changes',
      'May create biased trees with imbalanced data',
      'Greedy algorithm may not find optimal tree'
    ],
    useCases: [
      'When interpretability is needed',
      'Feature selection and importance',
      'Handling mixed data types'
    ],
    color: '#60a5fa',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Random Forest',
    icon: Brain,
    description: 'An ensemble learning method that constructs multiple decision trees at training time. It combines the predictions of many decision trees to produce a more accurate and stable prediction.',
    advantages: [
      'Reduces overfitting compared to single decision trees',
      'High accuracy on most problems',
      'Handles large datasets efficiently',
      'Provides feature importance measures',
      'Works well with missing values'
    ],
    disadvantages: [
      'Less interpretable than single decision trees',
      'Slower to train and predict',
      'Requires more computational resources',
      'May be too complex for simple problems'
    ],
    useCases: [
      'Classification with high dimensionality',
      'When accuracy is more important than interpretability',
      'Feature importance analysis'
    ],
    color: '#34d399',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  {
    name: 'XGBoost',
    icon: Zap,
    description: 'Extreme Gradient Boosting is an optimized distributed gradient boosting library. It implements machine learning algorithms under the Gradient Boosting framework, known for its efficiency and performance.',
    advantages: [
      'Exceptionally high accuracy',
      'Built-in regularization to prevent overfitting',
      'Handles missing values automatically',
      'Parallel processing for faster training',
      'Excellent performance on tabular data'
    ],
    disadvantages: [
      'Can be complex to tune',
      'May overfit with improper parameters',
      'Requires more computational power',
      'Less interpretable than simpler models'
    ],
    useCases: [
      'Competitive machine learning',
      'Large tabular datasets',
      'Real-time prediction systems',
      'Winner of many ML competitions'
    ],
    color: '#0A3D62',
    gradient: 'from-blue-700 to-blue-900',
    isBest: true
  }
];

export default function ModelsPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-medium">Machine Learning</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ML Models <span className="gradient-text">Comparison</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore and compare the performance of different machine learning algorithms
            used in our credit card approval prediction system.
          </p>
        </motion.div>

        {/* Best Model Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1.5px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-xl bg-white/20">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">XGBoost - Best Performing Model</h2>
                <p className="text-blue-200">Selected for production deployment</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-4xl font-bold">96.4%</p>
                <p className="text-blue-200 text-sm">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">95.9%</p>
                <p className="text-blue-200 text-sm">F1 Score</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accuracy Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden mb-12"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              Performance Metrics Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Precision</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Recall</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">F1 Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {modelMetrics.map((model) => (
                  <tr
                    key={model.name}
                    className={`${model.is_best ? 'bg-blue-50 dark:bg-blue-900/20' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: model.is_best ? '#00C853' : '#94a3b8' }}
                        />
                        <span className={`font-semibold ${model.is_best ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                          {model.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${model.accuracy}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${model.is_best ? 'bg-green-500' : 'bg-blue-500'}`}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {model.accuracy}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {model.precision}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {model.recall}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {model.f1_score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {model.is_best ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                          <Award className="w-3 h-3 mr-1" />
                          Best
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                          Evaluated
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Model Details Cards */}
        <div className="space-y-8">
          {modelDetails.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-2xl overflow-hidden ${model.isBest ? 'ring-2 ring-green-500' : ''}`}
              >
                <div className={`bg-gradient-to-r ${model.gradient} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{model.name}</h3>
                        {model.isBest && (
                          <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-white/20">
                            <Award className="w-3 h-3 mr-1" />
                            Best Model
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        {modelMetrics.find(m => m.name === model.name)?.accuracy}%
                      </p>
                      <p className="text-sm opacity-80">Accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {model.description}
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Advantages */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Advantages
                      </h4>
                      <ul className="space-y-2">
                        {model.advantages.map((adv, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disadvantages */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                        Disadvantages
                      </h4>
                      <ul className="space-y-2">
                        {model.disadvantages.map((dis, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <Target className="w-4 h-4 mr-2 text-blue-500" />
                        Best Use Cases
                      </h4>
                      <ul className="space-y-2">
                        {model.useCases.map((use, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Confusion Matrix Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
            Understanding Model Metrics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Accuracy',
                formula: '(TP + TN) / Total',
                description: 'Overall correctness of predictions. High accuracy means the model correctly predicts most outcomes.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Precision',
                formula: 'TP / (TP + FP)',
                description: 'How many selected items are relevant. High precision means few false positives.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                title: 'Recall',
                formula: 'TP / (TP + FN)',
                description: 'How many relevant items are selected. High recall means few false negatives.',
                color: 'from-purple-500 to-indigo-600'
              },
              {
                title: 'F1 Score',
                formula: '2 * (P * R) / (P + R)',
                description: 'Harmonic mean of precision and recall. Balanced measure for imbalanced datasets.',
                color: 'from-orange-500 to-red-600'
              }
            ].map((metric) => (
              <div key={metric.title} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${metric.color} text-white mb-3`}>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{metric.title}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-mono mb-2">{metric.formula}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
