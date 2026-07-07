import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  Car,
  CreditCard,
  DollarSign,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCcw,
  Sparkles,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';
import { predictEligibility, savePredictionToDatabase, featureImportance } from '../utils/prediction';
import { PredictionInput } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const initialFormState: PredictionInput = {
  gender: 'Male',
  age: 30,
  annual_income: 50000,
  employment_type: 'Salaried',
  employment_years: 5,
  education: 'Bachelor',
  marital_status: 'Single',
  own_house: false,
  own_car: false,
  credit_history: 3,
  loan_amount: 0,
  previous_defaults: 0,
  credit_inquiries: 2,
  monthly_income: 4000,
  outstanding_loan: 0,
  debt_ratio: 0.3
};

export default function PredictPage() {
  const [formData, setFormData] = useState<PredictionInput>(initialFormState);
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<{
    prediction: 'Approved' | 'Rejected';
    probability: number;
    confidence: number;
    riskFactors: string[];
    recommendations: string[];
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (formData.annual_income < 0) {
      newErrors.annual_income = 'Annual income must be positive';
    }
    if (formData.monthly_income < 0) {
      newErrors.monthly_income = 'Monthly income must be positive';
    }
    if (formData.debt_ratio < 0 || formData.debt_ratio > 1) {
      newErrors.debt_ratio = 'Debt ratio must be between 0 and 1';
    }
    if (formData.employment_years < 0) {
      newErrors.employment_years = 'Employment years cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPredicting(true);
    setResult(null);

    // Simulate processing time for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const prediction = predictEligibility(formData);
    setResult(prediction);

    // Save to database
    await savePredictionToDatabase(formData, prediction, user?.id);

    setIsPredicting(false);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setResult(null);
    setErrors({});
  };

  const handleInputChange = (field: keyof PredictionInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Prediction</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Credit Card Approval <span className="gradient-text">Prediction</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter your details to get an instant prediction of your credit card approval chances
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Applicant Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Personal Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="input-field"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      className={`input-field ${errors.age ? 'border-red-500' : ''}`}
                      min={18}
                      max={100}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Marital Status
                    </label>
                    <select
                      value={formData.marital_status}
                      onChange={(e) => handleInputChange('marital_status', e.target.value)}
                      className="input-field"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-1" />
                      Education Level
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="input-field"
                    >
                      <option value="High School">High School</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Employment Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Employment Type
                    </label>
                    <select
                      value={formData.employment_type}
                      onChange={(e) => handleInputChange('employment_type', e.target.value)}
                      className="input-field"
                    >
                      <option value="Salaried">Salaried Employee</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Business">Business Owner</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years of Employment
                    </label>
                    <input
                      type="number"
                      value={formData.employment_years}
                      onChange={(e) => handleInputChange('employment_years', parseInt(e.target.value) || 0)}
                      className={`input-field ${errors.employment_years ? 'border-red-500' : ''}`}
                      min={0}
                      max={50}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Home className="w-4 h-4 inline mr-1" />
                      Own House
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('own_house', true)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          formData.own_house
                            ? 'border-blue-500 bg-blue-500/10 text-blue-600'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('own_house', false)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          !formData.own_house
                            ? 'border-red-500 bg-red-500/10 text-red-600'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Car className="w-4 h-4 inline mr-1" />
                      Own Car
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('own_car', true)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          formData.own_car
                            ? 'border-blue-500 bg-blue-500/10 text-blue-600'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('own_car', false)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          !formData.own_car
                            ? 'border-red-500 bg-red-500/10 text-red-600'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Income Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Annual Income ($)
                    </label>
                    <input
                      type="number"
                      value={formData.annual_income}
                      onChange={(e) => handleInputChange('annual_income', parseFloat(e.target.value) || 0)}
                      className={`input-field ${errors.annual_income ? 'border-red-500' : ''}`}
                      min={0}
                      step={1000}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Income ($)
                    </label>
                    <input
                      type="number"
                      value={formData.monthly_income}
                      onChange={(e) => handleInputChange('monthly_income', parseFloat(e.target.value) || 0)}
                      className={`input-field ${errors.monthly_income ? 'border-red-500' : ''}`}
                      min={0}
                      step={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Outstanding Loan Amount ($)
                    </label>
                    <input
                      type="number"
                      value={formData.outstanding_loan}
                      onChange={(e) => handleInputChange('outstanding_loan', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      min={0}
                      step={1000}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Debt-to-Income Ratio
                    </label>
                    <input
                      type="number"
                      value={formData.debt_ratio}
                      onChange={(e) => handleInputChange('debt_ratio', parseFloat(e.target.value) || 0)}
                      className={`input-field ${errors.debt_ratio ? 'border-red-500' : ''}`}
                      min={0}
                      max={1}
                      step={0.01}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a value between 0 and 1 (e.g., 0.3 for 30%)</p>
                  </div>
                </div>

                {/* Credit Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Credit History
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years of Credit History
                    </label>
                    <input
                      type="number"
                      value={formData.credit_history}
                      onChange={(e) => handleInputChange('credit_history', parseInt(e.target.value) || 0)}
                      className="input-field"
                      min={0}
                      max={30}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Loan Amount Requested ($)
                    </label>
                    <input
                      type="number"
                      value={formData.loan_amount}
                      onChange={(e) => handleInputChange('loan_amount', parseFloat(e.target.value) || 0)}
                      className="input-field"
                      min={0}
                      step={1000}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Previous Defaults
                    </label>
                    <input
                      type="number"
                      value={formData.previous_defaults}
                      onChange={(e) => handleInputChange('previous_defaults', parseInt(e.target.value) || 0)}
                      className="input-field"
                      min={0}
                      max={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Credit Inquiries (Last 6 months)
                    </label>
                    <input
                      type="number"
                      value={formData.credit_inquiries}
                      onChange={(e) => handleInputChange('credit_inquiries', parseInt(e.target.value) || 0)}
                      className="input-field"
                      min={0}
                      max={20}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPredicting}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg disabled:opacity-50"
                >
                  {isPredicting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Get Prediction</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleReset}
                  disabled={isPredicting}
                  className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <RefreshCcw className="w-5 h-5" />
                  <span>Reset</span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {isPredicting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
                  >
                    <BarChart3 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Analyzing Your Data
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our XGBoost model is processing your application...
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-2xl p-6 ${
                    result.prediction === 'Approved'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-red-500 to-rose-600'
                  } text-white shadow-2xl`}
                >
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        result.prediction === 'Approved' ? 'bg-white/20' : 'bg-white/20'
                      }`}
                    >
                      {result.prediction === 'Approved' ? (
                        <CheckCircle2 className="w-10 h-10" />
                      ) : (
                        <XCircle className="w-10 h-10" />
                      )}
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-2">
                      {result.prediction === 'Approved' ? 'Approved!' : 'Rejected'}
                    </h3>
                    <p className="text-white/80">
                      {result.prediction === 'Approved'
                        ? 'Congratulations! Your application meets the criteria.'
                        : 'Unfortunately, your application does not meet the criteria.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/70">Probability Score</span>
                        <span className="text-2xl font-bold">
                          {(result.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.probability * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Confidence Level</span>
                        <span className="text-xl font-bold">{result.confidence.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Predict
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Fill in your details and click "Get Prediction" to see your approval chances.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Risk Factors */}
            {result && result.riskFactors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Risk Factors
                </h3>
                <ul className="space-y-2">
                  {result.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{factor}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Feature Importance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                Key Factors
              </h3>
              <div className="space-y-3">
                {featureImportance.slice(0, 5).map((feature, index) => (
                  <div key={feature.feature}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{feature.feature}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {(feature.importance * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.importance * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security Note */}
            <div className="glass-card rounded-xl p-4 flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your data is encrypted and never shared with third parties. Predictions are for informational purposes only.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
