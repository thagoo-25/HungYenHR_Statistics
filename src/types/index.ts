export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  department: string;
  name: string;
  created_at: string;
}

export interface JobReport {
  id: string;
  period: string;
  total_jobs: number;
  total_candidates: number;
  successful_matches: number;
  by_industry: Record<string, number>;
  by_region: Record<string, number>;
  created_at: string;
}

export interface LaborDemandForecast {
  id: string;
  forecast_period: string;
  industry: string;
  region: string;
  estimated_demand: number;
  confidence_level: number;
  factors: string[];
  created_at: string;
}

export interface ConnectionActivity {
  id: string;
  activity_type: 'job_posting' | 'candidate_application' | 'interview' | 'hiring';
  channel: 'employment_center' | 'online_portal' | 'direct_contact';
  success_rate: number;
  volume: number;
  date: string;
}

export interface Filter {
  dateFrom?: string;
  dateTo?: string;
  industry?: string;
  region?: string;
  department?: string;
}