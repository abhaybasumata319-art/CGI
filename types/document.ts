export type DocumentConfidence = 'high' | 'medium' | 'low';

export interface DocumentAnalysisResult {
  documentType: string;
  issuingAuthority: string;
  summary: string;
  importantDates: string[];
  reference: string;
  actionRequired: boolean;
  actionSummary: string;
  relevantServiceIds: string[];
  officialSources: Array<{ title: string; url: string; organization: string }>;
  confidence: DocumentConfidence;
  caution: string;
  highRisk: boolean;
}
