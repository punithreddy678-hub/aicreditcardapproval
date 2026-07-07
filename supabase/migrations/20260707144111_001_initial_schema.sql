/*
# Create predictions table and user profiles

1. New Tables
- `profiles` - extends auth.users with additional user info
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `phone` (text)
  - `role` (text, default 'user')
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

- `predictions` - stores credit card approval prediction history
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, nullable for anonymous predictions)
  - `gender` (text)
  - `age` (integer)
  - `annual_income` (numeric)
  - `employment_type` (text)
  - `employment_years` (integer)
  - `education` (text)
  - `marital_status` (text)
  - `own_house` (boolean)
  - `own_car` (boolean)
  - `credit_history` (integer)
  - `loan_amount` (numeric)
  - `previous_defaults` (integer)
  - `credit_inquiries` (integer)
  - `monthly_income` (numeric)
  - `outstanding_loan` (numeric)
  - `debt_ratio` (numeric)
  - `prediction_result` (text) - 'Approved' or 'Rejected'
  - `probability` (numeric) - probability score 0-1
  - `confidence` (numeric) - confidence percentage
  - `risk_factors` (jsonb) - array of risk factors if rejected
  - `recommendations` (jsonb) - array of recommendations
  - `created_at` (timestamp)

2. Security
- Enable RLS on all tables
- Profiles: users can read/update own profile
- Predictions: authenticated users can CRUD own predictions, anon users can create/read predictions (user_id null)
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  gender text NOT NULL,
  age integer NOT NULL CHECK (age >= 18 AND age <= 100),
  annual_income numeric NOT NULL CHECK (annual_income >= 0),
  employment_type text NOT NULL,
  employment_years integer NOT NULL CHECK (employment_years >= 0),
  education text NOT NULL,
  marital_status text,
  own_house boolean DEFAULT false,
  own_car boolean DEFAULT false,
  credit_history integer DEFAULT 0,
  loan_amount numeric DEFAULT 0 CHECK (loan_amount >= 0),
  previous_defaults integer DEFAULT 0 CHECK (previous_defaults >= 0),
  credit_inquiries integer DEFAULT 0 CHECK (credit_inquiries >= 0),
  monthly_income numeric NOT NULL CHECK (monthly_income >= 0),
  outstanding_loan numeric DEFAULT 0 CHECK (outstanding_loan >= 0),
  debt_ratio numeric DEFAULT 0 CHECK (debt_ratio >= 0 AND debt_ratio <= 1),
  prediction_result text NOT NULL CHECK (prediction_result IN ('Approved', 'Rejected')),
  probability numeric NOT NULL CHECK (probability >= 0 AND probability <= 1),
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  risk_factors jsonb DEFAULT '[]'::jsonb,
  recommendations jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_predictions_result ON predictions(prediction_result);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Profiles policies (authenticated users only)
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Predictions policies
-- Allow anon and authenticated to insert predictions
DROP POLICY IF EXISTS "insert_predictions" ON predictions;
CREATE POLICY "insert_predictions" ON predictions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow anon and authenticated to read predictions (for dashboard stats)
DROP POLICY IF EXISTS "select_predictions" ON predictions;
CREATE POLICY "select_predictions" ON predictions FOR SELECT
  TO anon, authenticated USING (true);

-- Allow authenticated users to delete their own predictions
DROP POLICY IF EXISTS "delete_own_predictions" ON predictions;
CREATE POLICY "delete_own_predictions" ON predictions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();