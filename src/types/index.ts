export interface ThreatData {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  source: string;
  timestamp: string;
  status: 'active' | 'mitigated' | 'investigating';
  description: string;
}

export interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
}

export interface VulnerabilityData {
  id: string;
  name: string;
  cveId?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'fixed' | 'in-progress';
  discoveryMethod: 'ai' | 'ethical-hacking' | 'scan';
  discoveredAt: string;
  affectedSystems: string[];
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  relatedThreats: string[];
  timestamp: string;
  actionable: boolean;
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';