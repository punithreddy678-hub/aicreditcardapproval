export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface PredictionInput {
  gender: 'Male' | 'Female';
  age: number;
  annual_income: number;
  employment_type: 'Salaried' | 'Self-Employed' | 'Business' | 'Unemployed';
  employment_years: number;
  education: 'High School' | 'Bachelor' | 'Master' | 'PhD' | 'Other';
  marital_status: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  own_house: boolean;
  own_car: boolean;
  credit_history: number;
  loan_amount: number;
  previous_defaults: number;
  credit_inquiries: number;
  monthly_income: number;
  outstanding_loan: number;
  debt_ratio: number;
}

export interface PredictionResult {
  id: string;
  user_id?: string;
  ...PredictionInput;
  prediction_result: 'Approved' | 'Rejected';
  probability: number;
  confidence: number;
  risk_factors: string[];
  recommendations: string[];
  created_at: string;
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  is_best?: boolean;
}

export interface DashboardStats {
  total_predictions: number;
  approved_count: number;
  rejected_count: number;
  approval_rate: number;
  avg_confidence: number;
}

export type Theme = 'light' | 'dark';

export interface AuthState {
  user: User | null;
  session: any;
  loading: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  workflow: string[];
  benefits: string[];
  icon: string;
}

export interface NavItem {
  name: string;
  path: string;
  icon?: string;
}
