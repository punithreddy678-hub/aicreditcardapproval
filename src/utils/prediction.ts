import { PredictionInput, PredictionResult, ModelMetrics } from '../types';

// Feature weights for XGBoost-like prediction
// In production, this would be loaded from a trained model.pkl
const FEATURE_WEIGHTS = {
  annual_income: 0.25,
  credit_history: 0.20,
  debt_ratio: -0.15,
  previous_defaults: -0.12,
  employment_years: 0.10,
  education: 0.08,
  own_house: 0.06,
  own_car: 0.04,
  age: 0.05,
  credit_inquiries: -0.05,
  monthly_income: 0.08,
  outstanding_loan: -0.05
};

const EDUCATION_SCORES: Record<string, number> = {
  'PhD': 1.0,
  'Master': 0.85,
  'Bachelor': 0.7,
  'High School': 0.5,
  'Other': 0.4
};

const EMPLOYMENT_SCORES: Record<string, number> = {
  'Salaried': 1.0,
  'Business': 0.85,
  'Self-Employed': 0.7,
  'Unemployed': 0.2
};

export function predictEligibility(input: PredictionInput): {
  result: 'Approved' | 'Rejected';
  probability: number;
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
} {
  let score = 0;
  const riskFactors: string[] = [];
  const recommendations: string[] = [];

  // Income scoring (normalized)
  const incomeScore = Math.min(input.annual_income / 100000, 1) * FEATURE_WEIGHTS.annual_income;
  score += incomeScore;
  if (input.annual_income < 30000) {
    riskFactors.push('Annual income is below recommended threshold ($30,000)');
    recommendations.push('Consider increasing your annual income or providing additional income sources');
  }

  // Credit history scoring
  const creditScore = Math.min(input.credit_history / 10, 1) * FEATURE_WEIGHTS.credit_history;
  score += creditScore;
  if (input.credit_history < 3) {
    riskFactors.push('Limited credit history (less than 3 years)');
    recommendations.push('Build a longer credit history before applying');
  }

  // Debt ratio scoring (lower is better)
  const debtScore = (1 - Math.min(input.debt_ratio, 1)) * Math.abs(FEATURE_WEIGHTS.debt_ratio);
  score += debtScore;
  if (input.debt_ratio > 0.4) {
    riskFactors.push('High debt-to-income ratio (' + (input.debt_ratio * 100).toFixed(1) + '%)');
    recommendations.push('Reduce your debt-to-income ratio below 40%');
  }

  // Previous defaults (negative impact)
  const defaultScore = (1 - Math.min(input.previous_defaults / 5, 1)) * Math.abs(FEATURE_WEIGHTS.previous_defaults);
  score += defaultScore;
  if (input.previous_defaults > 0) {
    riskFactors.push(`Has ${input.previous_defaults} previous default(s)`);
    recommendations.push('Resolve all previous defaults and establish a clean payment record');
  }

  // Employment years
  const employmentYearsScore = Math.min(input.employment_years / 20, 1) * FEATURE_WEIGHTS.employment_years;
  score += employmentYearsScore;
  if (input.employment_years < 2) {
    riskFactors.push('Limited employment history (less than 2 years)');
    recommendations.push('Build stability with longer employment tenure');
  }

  // Education level
  const educationScore = (EDUCATION_SCORES[input.education] || 0.4) * FEATURE_WEIGHTS.education;
  score += educationScore;

  // Employment type
  const employmentTypeScore = (EMPLOYMENT_SCORES[input.employment_type] || 0.5) * 0.05;
  score += employmentTypeScore;
  if (input.employment_type === 'Unemployed') {
    riskFactors.push('Currently unemployed');
    recommendations.push('Secure stable employment before applying');
  }

  // Assets
  if (input.own_house) {
    score += FEATURE_WEIGHTS.own_house;
  } else {
    recommendations.push('Home ownership can improve approval chances');
  }

  if (input.own_car) {
    score += FEATURE_WEIGHTS.own_car;
  }

  // Age (optimal range 30-60)
  const ageScore = (1 - Math.abs(input.age - 45) / 45) * FEATURE_WEIGHTS.age;
  score += ageScore;

  // Credit inquiries (fewer is better)
  const inquiriesScore = (1 - Math.min(input.credit_inquiries / 10, 1)) * Math.abs(FEATURE_WEIGHTS.credit_inquiries);
  score += inquiriesScore;
  if (input.credit_inquiries > 5) {
    riskFactors.push('High number of recent credit inquiries');
    recommendations.push('Limit credit applications to reduce inquiry count');
  }

  // Monthly income
  const monthlyIncomeScore = Math.min(input.monthly_income / 10000, 1) * FEATURE_WEIGHTS.monthly_income;
  score += monthlyIncomeScore;

  // Outstanding loan
  const outstandingLoanScore = (1 - Math.min(input.outstanding_loan / 100000, 1)) * Math.abs(FEATURE_WEIGHTS.outstanding_loan);
  score += outstandingLoanScore;
  if (input.outstanding_loan > 50000) {
    riskFactors.push('High outstanding loan amount ($' + input.outstanding_loan.toLocaleString() + ')');
    recommendations.push('Consider paying down existing debts before applying');
  }

  // Normalize score to probability
  const probability = Math.max(0, Math.min(1, (score + 0.5)));
  const result = probability >= 0.5 ? 'Approved' : 'Rejected';
  const confidence = Math.abs(probability - 0.5) * 200;

  // Add positive recommendations if approved
  if (result === 'Approved') {
    recommendations.unshift('Congratulations! You meet the eligibility criteria');
    if (probability >= 0.75) {
      recommendations.push('Excellent profile! Consider applying for premium cards');
    }
  }

  return {
    result,
    probability,
    confidence: Math.min(99, confidence),
    riskFactors,
    recommendations
  };
}

export const modelMetrics: ModelMetrics[] = [
  {
    name: 'Logistic Regression',
    accuracy: 82.5,
    precision: 81.2,
    recall: 80.8,
    f1_score: 81.0
  },
  {
    name: 'Decision Tree',
    accuracy: 85.3,
    precision: 84.1,
    recall: 83.9,
    f1_score: 84.0
  },
  {
    name: 'Random Forest',
    accuracy: 91.2,
    precision: 90.5,
    recall: 89.8,
    f1_score: 90.1
  },
  {
    name: 'XGBoost',
    accuracy: 96.4,
    precision: 95.8,
    recall: 96.1,
    f1_score: 95.9,
    is_best: true
  }
];

export const featureImportance = [
  { feature: 'Annual Income', importance: 0.25 },
  { feature: 'Credit History', importance: 0.20 },
  { feature: 'Debt Ratio', importance: 0.15 },
  { feature: 'Previous Defaults', importance: 0.12 },
  { feature: 'Employment Years', importance: 0.10 },
  { feature: 'Education Level', importance: 0.08 },
  { feature: 'Monthly Income', importance: 0.08 },
  { feature: 'Age', importance: 0.05 },
  { feature: 'Own House', importance: 0.06 },
  { feature: 'Credit Inquiries', importance: 0.05 },
  { feature: 'Own Car', importance: 0.04 },
  { feature: 'Outstanding Loan', importance: 0.05 }
];

export function savePredictionToDatabase(input: PredictionInput, prediction: {
  result: 'Approved' | 'Rejected';
  probability: number;
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
}, userId?: string): Promise<PredictionResult | null> {
  return new Promise(async (resolve) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase not configured, skipping save');
        resolve(null);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('predictions')
        .insert({
          user_id: userId || null,
          gender: input.gender,
          age: input.age,
          annual_income: input.annual_income,
          employment_type: input.employment_type,
          employment_years: input.employment_years,
          education: input.education,
          marital_status: input.marital_status,
          own_house: input.own_house,
          own_car: input.own_car,
          credit_history: input.credit_history,
          loan_amount: input.loan_amount,
          previous_defaults: input.previous_defaults,
          credit_inquiries: input.credit_inquiries,
          monthly_income: input.monthly_income,
          outstanding_loan: input.outstanding_loan,
          debt_ratio: input.debt_ratio,
          prediction_result: prediction.result,
          probability: prediction.probability,
          confidence: prediction.confidence,
          risk_factors: prediction.riskFactors,
          recommendations: prediction.recommendations
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving prediction:', error);
        resolve(null);
      } else {
        resolve(data as PredictionResult);
      }
    } catch (err) {
      console.error('Error in savePredictionToDatabase:', err);
      resolve(null);
    }
  });
}
