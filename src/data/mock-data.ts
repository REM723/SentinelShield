import { ThreatData, SecurityMetric, VulnerabilityData, AIInsight } from '../types';

export const mockThreats: ThreatData[] = [
  {
    id: '1',
    severity: 'critical',
    type: 'Ransomware',
    source: 'External Network',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'active',
    description: 'Potential Conti ransomware variant detected attempting to encrypt file shares'
  },
  {
    id: '2',
    severity: 'high',
    type: 'Credential Stuffing',
    source: 'Authentication Gateway',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'investigating',
    description: 'Multiple failed login attempts across administrative accounts from unusual geolocations'
  },
  {
    id: '3',
    severity: 'medium',
    type: 'Data Exfiltration',
    source: 'DLP System',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'investigating',
    description: 'Unusual outbound data transfer patterns detected from finance department'
  },
  {
    id: '4',
    severity: 'high',
    type: 'Zero-day Exploit',
    source: 'Web Application Firewall',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'mitigated',
    description: 'Attempted exploitation of recently disclosed Apache vulnerability (CVE-2025-1234)'
  },
  {
    id: '5',
    severity: 'low',
    type: 'Port Scanning',
    source: 'Perimeter Firewall',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    status: 'mitigated',
    description: 'Systematic port scanning detected from multiple IPs in Eastern Europe'
  }
];

export const mockMetrics: SecurityMetric[] = [
  {
    id: '1',
    name: 'Overall Security Posture',
    value: 78,
    change: 5,
    trend: 'up',
    target: 85
  },
  {
    id: '2',
    name: 'Mean Time to Detect (MTTD)',
    value: 42,
    change: -12,
    trend: 'down',
    target: 30
  },
  {
    id: '3',
    name: 'Mean Time to Respond (MTTR)',
    value: 3.5,
    change: -0.8,
    trend: 'down',
    target: 2
  },
  {
    id: '4',
    name: 'Active Vulnerabilities',
    value: 24,
    change: -3,
    trend: 'down',
    target: 0
  },
  {
    id: '5',
    name: 'AI Detection Accuracy',
    value: 94.2,
    change: 1.5,
    trend: 'up',
    target: 98
  },
  {
    id: '6',
    name: 'Threat Intel Coverage',
    value: 83,
    change: 4,
    trend: 'up',
    target: 90
  }
];

export const mockVulnerabilities: VulnerabilityData[] = [
  {
    id: '1',
    name: 'Unpatched Log4j vulnerability',
    cveId: 'CVE-2021-44228',
    severity: 'critical',
    status: 'in-progress',
    discoveryMethod: 'scan',
    discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    affectedSystems: ['api-gateway', 'auth-service', 'log-aggregator']
  },
  {
    id: '2',
    name: 'SQL Injection in customer portal',
    severity: 'high',
    status: 'open',
    discoveryMethod: 'ethical-hacking',
    discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    affectedSystems: ['customer-portal']
  },
  {
    id: '3',
    name: 'Weak encryption in data storage',
    severity: 'medium',
    status: 'open',
    discoveryMethod: 'ai',
    discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    affectedSystems: ['data-warehouse', 'backup-system']
  },
  {
    id: '4',
    name: 'Outdated TLS configuration',
    severity: 'medium',
    status: 'fixed',
    discoveryMethod: 'scan',
    discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    affectedSystems: ['public-website', 'cdn-endpoints']
  },
  {
    id: '5',
    name: 'Improper access control in admin API',
    severity: 'high',
    status: 'in-progress',
    discoveryMethod: 'ethical-hacking',
    discoveredAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    affectedSystems: ['admin-api']
  }
];

export const mockInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Potential APT Group Activity Detected',
    description: 'Behavioral patterns matching APT29 (Cozy Bear) observed in network traffic. Recommend enhanced monitoring of east-west traffic.',
    confidence: 76,
    relatedThreats: ['2', '3'],
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actionable: true
  },
  {
    id: '2',
    title: 'Unusual Authentication Patterns',
    description: 'ML model detected anomalous login timing and location patterns for 3 executive accounts.',
    confidence: 89,
    relatedThreats: ['2'],
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    actionable: true
  },
  {
    id: '3',
    title: 'Emerging Ransomware Variant',
    description: 'Threat intelligence indicates new ransomware variant targeting your industry. Signature updates recommended.',
    confidence: 94,
    relatedThreats: ['1'],
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    actionable: true
  },
  {
    id: '4',
    title: 'Cloud Misconfiguration Risk',
    description: 'S3 bucket permissions detected that could lead to data exposure. Verified against CIS benchmarks.',
    confidence: 98,
    relatedThreats: [],
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    actionable: false
  }
];

export const generateRandomAttacks = () => {
  const attackTypes = ['Ransomware', 'DDoS', 'Phishing', 'SQL Injection', 'XSS', 'Zero-day', 'Insider Threat'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
  
  return regions.map(region => ({
    region,
    attacks: Math.floor(Math.random() * 100) + 20,
    type: attackTypes[Math.floor(Math.random() * attackTypes.length)]
  }));
};

export const generateTimeSeriesData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toISOString(),
      attacks: Math.floor(Math.random() * 15) + 1,
      mitigated: Math.floor(Math.random() * 12),
      aiDetected: Math.floor(Math.random() * 10) + 2
    });
  }
  
  return data;
};