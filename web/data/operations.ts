export interface OperationEntry {
  id: string;
  name: string;
  org: string;
  role: string;
  certImage?: string;
  certPdf?: string;
  year?: string;
}

export const operationLogs: OperationEntry[] = [
  { id: 'fti-camp',       name: 'FTI Camp',               org: 'Camp Program',            role: 'PARTICIPANT', certPdf: '/certificates/DEX BENNETT (FTI Camp).pdf' },
  { id: 'fti-typing',     name: 'FTI FEST Typing Contest', org: 'FTI Festival',            role: 'COMPETITOR',  certImage: '/images/certificates/Dex Bennett (FTI FEST Typing Contest).png', certPdf: '/certificates/Dex Bennett (FTI FEST Typing Contest).pdf' },
  { id: 'smartpath',      name: 'SmartPath Program',       org: 'Career Development',      role: 'PARTICIPANT', certImage: '/images/certificates/Dex Bennett (SmartPath).png', certPdf: '/certificates/Dex Bennett (SmartPath).pdf' },
  { id: 'dilusi',         name: 'DILUSI Program',          org: 'Professional Development', role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (DILUSI).pdf' },
  { id: 'berbagi-kasih',  name: 'Berbagi Kasih',           org: 'Community Service',       role: 'VOLUNTEER',   certImage: '/images/certificates/Dex Bennett (Berbagi Kasih).png', certPdf: '/certificates/Dex Bennett (Berbagi Kasih).pdf' },
  { id: 'dli-2024',       name: 'DLI 2024',                org: 'Dialog Lintas Iman',      role: 'PARTICIPANT', year: '2024', certPdf: '/certificates/Dex Bennett (DLI_24).pdf' },
  { id: 'imlek-imt',      name: 'Imlek IMT × BOSA',        org: 'Lunar New Year Event',    role: 'STAFF',       certImage: '/images/certificates/Dex Bennett (Imlek IMT x BOSA).jpg', certPdf: '/certificates/Dex Bennett (Imlek IMT x BOSA).pdf' },
  { id: 'peh-cun',        name: 'Peh Cun',                 org: 'Dragon Boat Festival',    role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (Peh Cun).pdf' },
  { id: 'pedas-aptikom',  name: 'PeDas APTIKOM',           org: 'APTIKOM Program',         role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (PeDas APTIKOM).pdf' },
  { id: 'pbty',           name: 'PBTY Program',            org: 'Pekan Budaya Tionghoa Yogyakarta', role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (PBTY).pdf' },
  { id: 'sap',            name: 'SAP Program',             org: 'Professional Development', role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (SAP).pdf' },
  { id: 'talkshow-kamu',  name: 'Talk Show KaMu',          org: 'Campus Event',            role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (Talk Show KaMu).pdf' },
  { id: 'sui-gtc',        name: 'Sui GTC',                 org: 'Tech Competition',        role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (Sui GTC).pdf' },
  { id: 'wow',            name: 'WoW Program',             org: 'Professional Development', role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (WoW).pdf' },
  { id: 'ice',            name: 'ICE Event',               org: 'International Conference', role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (ICE).pdf' },
  { id: 'fti-cocacola',   name: 'FTI × Coca Cola',         org: 'Corporate Partnership',   role: 'PARTICIPANT', certImage: '/images/certificates/Dex Bennett (FTI+ Coca Cola).jpg' },
  { id: 'fti-dana',       name: 'FTI × DANA',              org: 'Corporate Partnership',   role: 'PARTICIPANT', certImage: '/images/certificates/Dex Bennett (FTI+ DANA).jpg' },
  { id: 'imlek-imt-2',    name: 'Imlek IMT × BOSA 2.0',    org: 'Lunar New Year Event v2', role: 'STAFF',       certImage: '/images/certificates/Dex Bennett (Imlek IMT x BOSA) 2.0.jpg', certPdf: '/certificates/Dex Bennett (Imlek IMT x BOSA) 2.0.pdf' },
  { id: 'dli',            name: 'DLI Program',             org: 'Dialog Lintas Iman',      role: 'PARTICIPANT', certPdf: '/certificates/Dex Bennett (DLI).pdf' },
  { id: 'dilusi-cert',    name: 'DILUSI — Participant Cert', org: 'Professional Development', role: 'CERTIFIED', certPdf: '/certificates/Dex Bennett (Sertif Peserta DILUSI).pdf' },
];
