import { GovernmentLevel } from '@/types/service';

export type InventoryVerificationStatus = 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED';
export type InventoryPriority = 'P0' | 'P1' | 'P2';
export type InventoryConfidence = 'high' | 'medium' | 'low';
export type InventorySourceType = 'information' | 'application' | 'tracking' | 'grievance';
export type InventoryDisposition = 'keep' | 'replace' | 'expand';

export interface InventorySource {
  title: string;
  url: string;
  organization: string;
  governmentLevel: GovernmentLevel;
  type: InventorySourceType;
  verifies: string;
  isApplicationPortal: boolean;
}

export interface ServiceInventoryRecord {
  name: string;
  proposedSlug: string;
  governmentLevel: GovernmentLevel;
  state: string;
  category: string;
  department: string;
  officialSources: InventorySource[];
  verificationStatus: InventoryVerificationStatus;
  priority: InventoryPriority;
  confidence: InventoryConfidence;
  reasonForInclusion: string;
  exampleCitizenQueries: string[];
  notes: string;
  duplicateOfExistingSlug?: string;
}

export interface CurrentServiceAuditRecord {
  name: string;
  slug: string;
  governmentLevel: GovernmentLevel;
  state: string;
  category: string;
  currentStatus: string;
  hasOfficialSource: boolean;
  disposition: InventoryDisposition;
  notes: string;
}

export const currentServiceAudit: CurrentServiceAuditRecord[] = [
  {
    name: 'Income certificate', slug: 'income-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'Certificates', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'keep', notes: 'Keep as a placeholder and expand only after the exact Tamil Nadu service scope and source are verified.',
  },
  {
    name: 'PAN card', slug: 'pan-card-central', governmentLevel: 'Central', state: 'India', category: 'Identity', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'expand', notes: 'Expand into a verified PAN journey only after deciding whether the guide covers new PAN, correction, replacement, or a bounded combination.',
  },
  {
    name: 'Birth certificate', slug: 'birth-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'Certificates', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'keep', notes: 'Keep as a placeholder; the audited e-Sevai source confirms a service catalogue but not this individual service on the fetched page.',
  },
  {
    name: 'Passport services', slug: 'passport-central', governmentLevel: 'Central', state: 'India', category: 'Travel', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'expand', notes: 'Expand into a bounded passport application/reissue journey using the official Passport Seva service taxonomy.',
  },
  {
    name: 'Community certificate', slug: 'caste-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'Certificates', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'keep', notes: 'Keep as a placeholder; confirm the exact service name and issuing path before promotion.',
  },
  {
    name: 'Check application status', slug: 'application-status-central', governmentLevel: 'Central', state: 'India', category: 'Other', currentStatus: 'sample / unverified', hasOfficialSource: false, disposition: 'replace', notes: 'Replace the generic record with service-specific tracking journeys because status systems are not interchangeable.',
  },
];

const source = (title: string, url: string, organization: string, governmentLevel: GovernmentLevel, type: InventorySourceType, verifies: string, isApplicationPortal: boolean): InventorySource => ({ title, url, organization, governmentLevel, type, verifies, isApplicationPortal });

const centralSources = {
  incomeTax: source('Income Tax e-Filing portal', 'https://www.incometax.gov.in/iec/foportal/', 'Income Tax Department, Ministry of Finance, Government of India', 'Central', 'information', 'The Income Tax Department portal and its tax information/services area, including returns and notice-related services.', false),
  incomeTaxPortal: source('Income Tax e-Filing services', 'https://eportal.incometax.gov.in/iec/foservices/', 'Income Tax Department, Ministry of Finance, Government of India', 'Central', 'application', 'Online tax services such as e-Verify Return, Instant e-PAN, Comply to Notice and PAN verification, as linked by the department portal.', true),
  uidai: source('UIDAI official website', 'https://www.uidai.gov.in/', 'Unique Identification Authority of India (UIDAI), Government of India', 'Central', 'information', 'UIDAI identity, enrolment, update, document and support services.', false),
  myAadhaar: source('My Aadhaar services', 'https://myaadhaarbeta.uidai.gov.in/', 'Unique Identification Authority of India (UIDAI), Government of India', 'Central', 'application', 'UIDAI-linked Aadhaar services including download, updates, status and related actions.', true),
  passport: source('Passport Seva', 'https://www.passportindia.gov.in/psp', 'Ministry of External Affairs, Government of India', 'Central', 'application', 'Fresh/re-issue passport, Tatkaal, tracking, appointments and related Passport Seva services.', true),
  voters: source('ECI Voters\' Services Portal', 'https://voters.eci.gov.in/', 'Election Commission of India', 'Central', 'application', 'New voter registration, deletion, correction, electoral roll search, e-EPIC and application tracking.', true),
  parivahan: source('Parivahan Sewa', 'https://parivahan.gov.in/', 'Ministry of Road Transport & Highways, Government of India', 'Central', 'information', 'Driving licence and vehicle-related citizen service areas and their Sarathi/Vahan portals.', false),
  sarathi: source('Sarathi driving licence services', 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do', 'Ministry of Road Transport & Highways, Government of India', 'Central', 'application', 'Driving/learner licence services, appointments, tests, duplicate licence and application status areas.', true),
  vahan: source('Vahan vehicle services', 'https://vahan.parivahan.gov.in/', 'Ministry of Road Transport & Highways, Government of India', 'Central', 'application', 'Vehicle registration and related vehicle citizen services.', true),
  digilocker: source('DigiLocker', 'https://www.digilocker.gov.in/', 'National e-Governance Division, Digital India Corporation, Ministry of Electronics & IT, Government of India', 'Central', 'application', 'Digital document wallet, document retrieval, sharing and verification service.', true),
  cpgrams: source('CPGRAMS', 'https://pgportal.gov.in/', 'Department of Administrative Reforms & Public Grievances; hosted by NIC, Ministry of Electronics & IT, Government of India', 'Central', 'grievance', 'Lodging, tracking and appeal of public-service grievances.', true),
  nsp: source('National Scholarship Portal', 'https://scholarships.gov.in/', 'National Scholarship Portal, Government of India', 'Central', 'application', 'Scholarship portal access and One Time Registration for students.', true),
};

export const proposedCentralServices: ServiceInventoryRecord[] = [
  {
    name: 'PAN and e-PAN services', proposedSlug: 'pan-and-epan-services-central', governmentLevel: 'Central', state: 'India', category: 'identity', department: 'Income Tax Department, Ministry of Finance, Government of India', officialSources: [centralSources.incomeTax, centralSources.incomeTaxPortal], verificationStatus: 'PARTIALLY_VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'Identity and tax-related requests are common, and the official portal visibly exposes PAN-related services.', exampleCitizenQueries: ['I need a PAN card', 'I lost my PAN card', 'How do I get an e-PAN?', 'How can I check my PAN status?'], notes: 'Scope must be narrowed before production: new PAN, correction, reprint and e-PAN are separate user journeys. Potential duplicate of current pan-card-central.', duplicateOfExistingSlug: 'pan-card-central',
  },
  {
    name: 'Income Tax Return filing', proposedSlug: 'income-tax-return-filing-central', governmentLevel: 'Central', state: 'India', category: 'tax', department: 'Income Tax Department, Ministry of Finance, Government of India', officialSources: [centralSources.incomeTax, centralSources.incomeTaxPortal], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The department portal directly links income-tax-return resources and e-filing services.', exampleCitizenQueries: ['How do I file my income tax return?', 'Where do I file my ITR?', 'How can I e-verify my return?', 'I need help with my tax return'], notes: 'Filing guidance needs a separate content review for assessment year and taxpayer type. Do not add tax advice to the inventory.',
  },
  {
    name: 'Respond to an Income Tax notice', proposedSlug: 'income-tax-notice-response-central', governmentLevel: 'Central', state: 'India', category: 'tax', department: 'Income Tax Department, Ministry of Finance, Government of India', officialSources: [centralSources.incomeTax, centralSources.incomeTaxPortal], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The official portal explicitly links “Comply to Notice” and notice/order authentication.', exampleCitizenQueries: ['I received an Income Tax notice', 'How do I check if a tax notice is real?', 'Where do I respond to an income tax notice?', 'What should I do after receiving a tax notice?'], notes: 'High-value notice journey. Any future explanation must clearly separate procedural information from professional tax advice.',
  },
  {
    name: 'Aadhaar services', proposedSlug: 'aadhaar-services-central', governmentLevel: 'Central', state: 'India', category: 'identity', department: 'Unique Identification Authority of India (UIDAI)', officialSources: [centralSources.uidai, centralSources.myAadhaar], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'UIDAI visibly identifies its operator and lists download, update, status, enrolment and support services.', exampleCitizenQueries: ['How do I download my Aadhaar?', 'How can I update my Aadhaar?', 'Where can I check my Aadhaar update status?', 'I need help with Aadhaar'], notes: 'Keep the eventual guide scoped to one Aadhaar task per guide rather than one broad guide for every operation.',
  },
  {
    name: 'Passport application and re-issue', proposedSlug: 'passport-application-central', governmentLevel: 'Central', state: 'India', category: 'travel', department: 'Ministry of External Affairs, Government of India', officialSources: [centralSources.passport], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'Passport Seva explicitly identifies fresh/re-issue, Tatkaal, appointments and tracking.', exampleCitizenQueries: ['How do I apply for a passport?', 'I need to renew my passport', 'How do I track my passport application?', 'Where is the official Passport Seva website?'], notes: 'Do not merge passport, police clearance certificate and surrender certificate without a clear product decision. Potential duplicate of current passport-central.', duplicateOfExistingSlug: 'passport-central',
  },
  {
    name: 'Voter registration and electoral services', proposedSlug: 'voter-registration-and-services-central', governmentLevel: 'Central', state: 'India', category: 'voting', department: 'Election Commission of India', officialSources: [centralSources.voters], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The ECI portal explicitly provides new registration, deletion, correction, e-EPIC, search and tracking.', exampleCitizenQueries: ['How do I register as a voter?', 'How can I correct my voter details?', 'How do I download my e-EPIC?', 'Where can I check my name in the voter list?'], notes: 'State CEO portals may be needed for state-specific operational details; the central ECI portal is the audited starting point.',
  },
  {
    name: 'Driving licence services', proposedSlug: 'driving-licence-services-central', governmentLevel: 'Central', state: 'India', category: 'transport', department: 'Ministry of Road Transport & Highways, Government of India', officialSources: [centralSources.parivahan, centralSources.sarathi], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'Parivahan explicitly lists learner/driver licence, appointments, tests, duplicate licence and status services.', exampleCitizenQueries: ['How do I apply for a driving licence?', 'I need to renew my driving licence', 'How can I book a learner licence test?', 'How do I track my licence application?'], notes: 'State selection is part of the official journey; do not state Tamil Nadu-specific requirements from this central source alone.',
  },
  {
    name: 'Vehicle registration services', proposedSlug: 'vehicle-registration-services-central', governmentLevel: 'Central', state: 'India', category: 'transport', department: 'Ministry of Road Transport & Highways, Government of India', officialSources: [centralSources.parivahan, centralSources.vahan], verificationStatus: 'VERIFIED', priority: 'P1', confidence: 'high', reasonForInclusion: 'Parivahan explicitly identifies vehicle registration, duplicate registration, address change, ownership transfer and status areas.', exampleCitizenQueries: ['How do I register a vehicle?', 'How can I transfer vehicle ownership?', 'I need a duplicate RC', 'How do I change the address on my vehicle registration?'], notes: 'Vehicle services are a family of journeys; future production records should separate application, transfer and tracking where needed.',
  },
  {
    name: 'DigiLocker document access', proposedSlug: 'digilocker-documents-central', governmentLevel: 'Central', state: 'India', category: 'identity', department: 'National e-Governance Division, Digital India Corporation, Ministry of Electronics & IT, Government of India', officialSources: [centralSources.digilocker], verificationStatus: 'VERIFIED', priority: 'P1', confidence: 'high', reasonForInclusion: 'DigiLocker identifies its operator and explicitly describes document storage, retrieval, sharing and verification.', exampleCitizenQueries: ['How do I use DigiLocker?', 'Where can I find my digital documents?', 'How do I download my driving licence from DigiLocker?', 'Can I get my marksheet in DigiLocker?'], notes: 'Issuer-specific availability changes; the eventual guide must avoid promising a particular document unless the issuer is verified.',
  },
  {
    name: 'Public grievance through CPGRAMS', proposedSlug: 'central-public-grievance-cpgrams', governmentLevel: 'Central', state: 'India', category: 'grievances', department: 'Department of Administrative Reforms & Public Grievances, Government of India', officialSources: [centralSources.cpgrams], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'CPGRAMS explicitly supports grievance lodging, tracking and appeal and identifies its government ownership and host.', exampleCitizenQueries: ['How do I file a government complaint?', 'Where can I track my CPGRAMS complaint?', 'My grievance was not resolved', 'How do I appeal a grievance response?'], notes: 'The official page also lists subjects it does not take up; that scope should be carried into future guide review.',
  },
  {
    name: 'National Scholarship Portal registration', proposedSlug: 'national-scholarship-portal-central', governmentLevel: 'Central', state: 'India', category: 'education', department: 'National Scholarship Portal, Government of India', officialSources: [centralSources.nsp], verificationStatus: 'VERIFIED', priority: 'P1', confidence: 'high', reasonForInclusion: 'The official portal explicitly identifies student access, scholarship applications and One Time Registration.', exampleCitizenQueries: ['How do I apply for a scholarship?', 'What is NSP OTR?', 'How can I register on the National Scholarship Portal?', 'Where can I check my scholarship application?'], notes: 'Individual scholarship schemes have their own eligibility and dates; do not collapse them into one generic entitlement claim.',
  },
];

const tamilNaduSources = {
  tnega: source('Tamil Nadu e-Governance Agency', 'https://tnega.tn.gov.in/', 'Tamil Nadu e-Governance Agency / Directorate of e-Governance, Information Technology and Digital Services Department, Government of Tamil Nadu', 'Tamil Nadu', 'information', 'TNeGA ownership, citizen services, e-Sevai service catalogue and centre locations.', false),
  eseva: source('TN e-Sevai', 'https://www.tnesevai.tn.gov.in/', 'Tamil Nadu e-Governance Agency, Information Technology and Digital Services Department, Government of Tamil Nadu', 'Tamil Nadu', 'application', 'e-Sevai citizen access, service catalogue, centre-based process and application access.', true),
  land: source('Tamil Nadu e-Services: land records', 'https://eservices.tn.gov.in/eservicesnew/home.html', 'Commissionerate of Survey and Settlement, Government of Tamil Nadu; designed and developed by NIC Tamil Nadu', 'Tamil Nadu', 'application', 'Online land information and patta-transfer access, including land record extracts and related services.', true),
  grievance: source('Mudhalvarin Mugavari / CM Helpline', 'https://cmhelpline.tnega.org/portal/en/home', 'Mudhalvarin Mugavari Department / Government of Tamil Nadu', 'Tamil Nadu', 'grievance', 'Tamil Nadu grievance submission, tracking and government-service help-centre functions.', true),
  elections: source('Chief Electoral Officer, Tamil Nadu', 'https://www.elections.tn.gov.in/', 'Public (Elections) Department, Government of Tamil Nadu', 'Tamil Nadu', 'information', 'Tamil Nadu electoral roll services, polling-station lookup and complaints links.', false),
  voterServices: source('ECI Voters\' Services Portal', 'https://voters.eci.gov.in/', 'Election Commission of India', 'Central', 'application', 'The central electoral application journey used by Tamil Nadu voters for registration and related services.', true),
  tnGov: source('Tamil Nadu Government portal', 'https://www.tn.gov.in/', 'Government of Tamil Nadu; maintained by National Informatics Centre', 'Tamil Nadu', 'information', 'Tamil Nadu departments, schemes, directories and links to official state services.', false),
};

export const proposedTamilNaduServices: ServiceInventoryRecord[] = [
  {
    name: 'TN e-Sevai citizen services', proposedSlug: 'tn-e-sevai-citizen-services', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'other', department: 'Tamil Nadu e-Governance Agency, Information Technology and Digital Services Department', officialSources: [tamilNaduSources.tnega, tamilNaduSources.eseva], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'TNeGA explicitly identifies e-Sevai as the access point for Tamil Nadu government services and links citizen login and the service list.', exampleCitizenQueries: ['How do I use Tamil Nadu e-Sevai?', 'Where is the official TN e-Sevai portal?', 'How can I find an e-Sevai centre?', 'What services are available through e-Sevai?'], notes: 'This is an access/discovery journey, not a replacement for individual certificate guides. The fetched source says the catalogue contains 119 services on one page and TNeGA separately reports 260; catalogue scope needs reconciliation before production.',
  },
  {
    name: 'Tamil Nadu income certificate', proposedSlug: 'income-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'certificates', department: 'Not identified on the audited source', officialSources: [tamilNaduSources.eseva, tamilNaduSources.tnega], verificationStatus: 'PARTIALLY_VERIFIED', priority: 'P0', confidence: 'medium', reasonForInclusion: 'It is an existing citizen-facing placeholder and the official e-Sevai catalogue is the relevant state access route, but the fetched evidence did not identify this individual service by name.', exampleCitizenQueries: ['I need an income certificate', 'How do I get proof of income in Tamil Nadu?', 'Where can I apply for an income certificate?', 'I need an income certificate in Tamil Nadu'], notes: 'Potential duplicate of current income-certificate-tamil-nadu. Confirm exact catalogue label, issuing department, application path and source page.', duplicateOfExistingSlug: 'income-certificate-tamil-nadu',
  },
  {
    name: 'Tamil Nadu community certificate', proposedSlug: 'community-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'certificates', department: 'Not identified on the audited source', officialSources: [tamilNaduSources.eseva, tamilNaduSources.tnega], verificationStatus: 'PARTIALLY_VERIFIED', priority: 'P0', confidence: 'medium', reasonForInclusion: 'Certificate access is a high-need citizen journey and the official state e-Sevai route is identified, but this individual certificate was not named in the fetched source.', exampleCitizenQueries: ['I need a community certificate', 'How do I get a caste certificate in Tamil Nadu?', 'Where can I apply for a community certificate?', 'What is the official Tamil Nadu certificate portal?'], notes: 'Do not promote until the exact service record and department are confirmed. Potential overlap with current caste-certificate-tamil-nadu.',
  },
  {
    name: 'Tamil Nadu birth certificate', proposedSlug: 'birth-certificate-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'certificates', department: 'Not identified on the audited source', officialSources: [tamilNaduSources.eseva, tamilNaduSources.tnega], verificationStatus: 'PARTIALLY_VERIFIED', priority: 'P0', confidence: 'medium', reasonForInclusion: 'Birth certificates are a common citizen need and e-Sevai is an identified state service access route, but the individual service scope needs confirmation.', exampleCitizenQueries: ['How do I get a birth certificate in Tamil Nadu?', 'Where can I apply for a birth certificate?', 'I need a copy of a birth certificate', 'How do I correct a birth certificate?'], notes: 'Potential duplicate of current birth-certificate-tamil-nadu. Birth registration and certificate download/correction may be distinct journeys.', duplicateOfExistingSlug: 'birth-certificate-tamil-nadu',
  },
  {
    name: 'Patta transfer', proposedSlug: 'patta-transfer-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'property', department: 'Commissionerate of Survey and Settlement, Government of Tamil Nadu', officialSources: [tamilNaduSources.land], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The official land-services portal explicitly describes patta transfer applications and online land services.', exampleCitizenQueries: ['How do I apply for patta transfer?', 'Where can I check patta transfer status?', 'I need to transfer patta in Tamil Nadu', 'What is the official Tamil Nadu land records portal?'], notes: 'The audited page includes fee information and service language; these details require a separate capture pass before entering production data.',
  },
  {
    name: 'Patta, Chitta and land record extracts', proposedSlug: 'patta-chitta-land-records-tamil-nadu', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'property', department: 'Commissionerate of Survey and Settlement, Government of Tamil Nadu', officialSources: [tamilNaduSources.land], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The official portal visibly provides online land information and land-record extract access.', exampleCitizenQueries: ['How do I view Patta and Chitta?', 'Where can I get a land record extract?', 'How do I check land details in Tamil Nadu?', 'What is the official Tamil Nadu land records website?'], notes: 'Keep viewing/extract access separate from patta transfer because they are different citizen journeys.',
  },
  {
    name: 'Tamil Nadu public grievance through Mudhalvarin Mugavari', proposedSlug: 'tamil-nadu-public-grievance', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'grievances', department: 'Mudhalvarin Mugavari Department, Government of Tamil Nadu', officialSources: [tamilNaduSources.grievance], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The official TNeGA-hosted portal explicitly supports submissions, tracking and service-related public grievances.', exampleCitizenQueries: ['How do I file a complaint to the Tamil Nadu government?', 'Where can I track my Tamil Nadu grievance?', 'How do I submit a petition online?', 'I need help with a Tamil Nadu government service'], notes: 'The portal also publishes its own process and helpline details; verify current language and routes before production.',
  },
  {
    name: 'Tamil Nadu electoral roll services', proposedSlug: 'tamil-nadu-electoral-roll-services', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'voting', department: 'Public (Elections) Department, Government of Tamil Nadu', officialSources: [tamilNaduSources.elections, tamilNaduSources.voterServices], verificationStatus: 'VERIFIED', priority: 'P0', confidence: 'high', reasonForInclusion: 'The CEO Tamil Nadu site explicitly identifies electoral roll services, polling-station lookup and complaints, with links to ECI services.', exampleCitizenQueries: ['How do I check my name in the Tamil Nadu voter list?', 'Where is my polling station?', 'How do I register to vote in Tamil Nadu?', 'How can I make a voter complaint?'], notes: 'Avoid duplicating the central voter guide; state-specific discovery and polling information may be a separate guide or a localized variant.',
  },
  {
    name: 'Tamil Nadu government schemes and services discovery', proposedSlug: 'tamil-nadu-government-schemes-discovery', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'welfare', department: 'Government of Tamil Nadu', officialSources: [tamilNaduSources.tnGov, tamilNaduSources.tnega], verificationStatus: 'PARTIALLY_VERIFIED', priority: 'P1', confidence: 'medium', reasonForInclusion: 'The official state portal exposes department schemes and links to state service systems, making discovery valuable even before individual scheme guides are selected.', exampleCitizenQueries: ['What government schemes are available in Tamil Nadu?', 'Where can I find Tamil Nadu welfare schemes?', 'How do I find a scheme for my family?', 'Which Tamil Nadu department handles this scheme?'], notes: 'This is a discovery record, not a claim that a citizen qualifies for any scheme. Individual scheme inventory requires its own source review.',
  },
  {
    name: 'Tamil Nadu transport services', proposedSlug: 'tamil-nadu-transport-services', governmentLevel: 'Tamil Nadu', state: 'Tamil Nadu', category: 'transport', department: 'Not identified on the audited source', officialSources: [tamilNaduSources.tnega], verificationStatus: 'UNVERIFIED', priority: 'P1', confidence: 'low', reasonForInclusion: 'Transport was identified as a candidate area, but the audited sources did not clearly identify a Tamil Nadu-specific citizen transport service portal or operator for this inventory entry.', exampleCitizenQueries: ['How do I access transport services in Tamil Nadu?', 'Where can I find a Tamil Nadu transport service?', 'I need help with a vehicle service in Tamil Nadu'], notes: 'Do not add to production. Requires a dedicated Transport Department source audit; central Parivahan services must not be assumed to be Tamil Nadu-specific.',
  },
];

export const allProposedServices = [...proposedCentralServices, ...proposedTamilNaduServices];

export const inventoryAuditSummary = {
  currentServices: currentServiceAudit.length,
  proposedCentral: proposedCentralServices.length,
  proposedTamilNadu: proposedTamilNaduServices.length,
  proposedTotal: allProposedServices.length,
  verified: allProposedServices.filter((service) => service.verificationStatus === 'VERIFIED').length,
  partiallyVerified: allProposedServices.filter((service) => service.verificationStatus === 'PARTIALLY_VERIFIED').length,
  unverified: allProposedServices.filter((service) => service.verificationStatus === 'UNVERIFIED').length,
  highConfidence: allProposedServices.filter((service) => service.confidence === 'high').length,
};
