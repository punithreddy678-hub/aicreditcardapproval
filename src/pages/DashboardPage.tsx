import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  CheckCircle2,
  XCircle,
  BarChart3,
  Download,
  Search,
  Calendar,
  Filter,
  RefreshCcw,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { modelMetrics, featureImportance } from '../utils/prediction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface PredictionRecord {
  id: string;
  created_at: string;
  prediction_result: 'Approved' | 'Rejected';
  probability: number;
  confidence: number;
  age: number;
  annual_income: number;
  gender: string;
  employment_type: string;
  education: string;
}

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<'all' | 'Approved' | 'Rejected'>('all');

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('predictions')
      .select('id, created_at, prediction_result, probability, confidence, age, annual_income, gender, employment_type, education')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error && data) {
      setPredictions(data as PredictionRecord[]);
    }
    setLoading(false);
  };

  // Calculate stats
  const totalPredictions = predictions.length;
  const approvedCount = predictions.filter(p => p.prediction_result === 'Approved').length;
  const rejectedCount = predictions.filter(p => p.prediction_result === 'Rejected').length;
  const approvalRate = totalPredictions > 0 ? (approvedCount / totalPredictions) * 100 : 0;
  const avgConfidence = totalPredictions > 0
    ? predictions.reduce((acc, p) => acc + p.confidence, 0) / totalPredictions
    : 0;

  // Filter predictions
  const filteredPredictions = predictions.filter(p => {
    const matchesSearch = p.employment_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.education?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.gender?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterResult === 'all' || p.prediction_result === filterResult;
    return matchesSearch && matchesFilter;
  });

  // Chart data - Approval vs Rejection
  const approvalData = {
    labels: ['Approved', 'Rejected'],
    datasets: [
      {
        data: [approvedCount, rejectedCount],
        backgroundColor: ['#10B981', '#EF4444'],
        borderColor: ['#10B981', '#EF4444'],
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  // Model accuracy comparison
  const modelAccuracyData = {
    labels: modelMetrics.map(m => m.name),
    datasets: [
      {
        label: 'Accuracy',
        data: modelMetrics.map(m => m.accuracy),
        backgroundColor: modelMetrics.map(m => m.is_best ? '#0A3D62' : '#60a5fa'),
        borderRadius: 8
      }
    ]
  };

  // Feature importance data
  const featureData = {
    labels: featureImportance.slice(0, 8).map(f => f.feature),
    datasets: [
      {
        label: 'Importance',
        data: featureImportance.slice(0, 8).map(f => f.importance * 100),
        backgroundColor: 'rgba(14, 165, 233, 0.6)',
        borderColor: '#0ea5e9',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  // Predictions over time (mock data for demo)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const predictionTrendData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Approved',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Rejected',
        data: [8, 12, 10, 15, 18, 12, 15],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#6B7280'
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          callback: (value: number) => value + '%',
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Result', 'Probability', 'Confidence', 'Age', 'Income', 'Employment', 'Education'];
    const rows = filteredPredictions.map(p => [
      new Date(p.created_at).toLocaleDateString(),
      p.prediction_result,
      (p.probability * 100).toFixed(1) + '%',
      p.confidence.toFixed(1) + '%',
      p.age,
      p.annual_income,
      p.employment_type,
      p.education
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `predictions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Analytics Dashboard</span>
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Prediction Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={fetchPredictions}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCcw className="w-4 h-4" />
              )}
              <span className="text-sm">Refresh</span>
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Export CSV</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Predictions', value: totalPredictions, icon: CreditCard, color: 'from-blue-500 to-blue-600', change: '+12%' },
            { label: 'Approved', value: approvedCount, icon: CheckCircle2, color: 'from-green-500 to-emerald-600', change: '+8%' },
            { label: 'Rejected', value: rejectedCount, icon: XCircle, color: 'from-red-500 to-rose-600', change: '-5%' },
            { label: 'Avg Confidence', value: avgConfidence.toFixed(1) + '%', icon: TrendingUp, color: 'from-purple-500 to-indigo-600', change: '+3%' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Approval Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Approval Rate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Based on {totalPredictions} predictions</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-green-600">{approvalRate.toFixed(1)}%</span>
              <p className="text-sm text-gray-500">approval rate</p>
            </div>
          </div>
          <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${approvalRate}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Approval Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Approval Distribution
            </h3>
            <div className="h-64">
              <Doughnut data={approvalData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Model Accuracy Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Model Accuracy Comparison
            </h3>
            <div className="h-64">
              <Bar data={modelAccuracyData} options={barChartOptions} />
            </div>
          </motion.div>

          {/* Prediction Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Predictions Trend (Last 7 Days)
            </h3>
            <div className="h-64">
              <Line data={predictionTrendData} options={lineChartOptions} />
            </div>
          </motion.div>

          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Feature Importance
            </h3>
            <div className="h-64">
              <Bar data={featureData} options={barChartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Prediction History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Prediction History
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search predictions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <select
                  value={filterResult}
                  onChange={(e) => setFilterResult(e.target.value as 'all' | 'Approved' | 'Rejected')}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <option value="all">All Results</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Probability</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Income</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                      <p className="text-gray-500 mt-2">Loading predictions...</p>
                    </td>
                  </tr>
                ) : filteredPredictions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No predictions found. Make some predictions to see them here.
                    </td>
                  </tr>
                ) : (
                  filteredPredictions.slice(0, 10).map((prediction) => (
                    <tr key={prediction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {new Date(prediction.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          prediction.prediction_result === 'Approved'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                          {prediction.prediction_result === 'Approved' ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {prediction.prediction_result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${prediction.probability * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {(prediction.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {prediction.confidence.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {prediction.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${prediction.annual_income?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {prediction.employment_type}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
