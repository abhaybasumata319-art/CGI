export type GovernmentLevel = 'Central' | 'Tamil Nadu';

export type ServiceStatus = 'sample' | 'verified';

export interface ServiceDocument {
  name: string;
  required?: boolean;
  description?: string;
  alternatives?: string[];
  notes?: string;
}

export interface ServiceStep {
  number?: number;
  title: string;
  description?: string;
  action?: string;
  officialUrl?: string;
  notes?: string;
}

export interface ServiceTroubleshooting {
  problem: string;
  explanation?: string;
  action?: string;
  officialUrl?: string;
}

export interface OfficialSource {
  title: string;
  url: string;
  department?: string;
  organization?: string;
  type?: 'information' | 'application' | 'tracking' | 'grievance';
}

export interface GovernmentService {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  level: GovernmentLevel;
  department: string;
  status: ServiceStatus;
  popular?: boolean;
  keywords: string[];
  image?: string;
  eligibility?: string;
  documents?: string[];
  fees?: string;
  processingTime?: string;
  applicationMethod?: string;
  onlineUrl?: string;
  officialSource?: string;
  lastVerified?: string;
  documentsStructured?: ServiceDocument[];
  steps?: ServiceStep[];
  afterApplying?: string[];
  commonMistakes?: string[];
  troubleshooting?: ServiceTroubleshooting[];
  officialSources?: OfficialSource[];
  tracking?: string;
  grievanceHelp?: string;
  notes?: string;
  safetyRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
}
