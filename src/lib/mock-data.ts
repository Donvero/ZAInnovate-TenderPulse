export interface TenderItem {
  id: string;
  referenceNumber: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  issuingEntity: string;
  department: string;
  province: string;
  cidbGrading?: string;
  estimatedValue?: number;
  estimatedValueText?: string;
  briefingSessionDate?: string;
  briefingSessionVenue?: string;
  isBriefingCompulsory: boolean;
  closingDate: string;
  status: "OPEN" | "CLOSING_SOON" | "CLOSED" | "AWARDED";
  documentUrls: { name: string; url: string; size: string }[];
  originalUrl: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  requiredSbd: string[];
}

export const MOCK_TENDERS: TenderItem[] = [
  {
    id: "tender-001",
    referenceNumber: "SCMU5-24/25-0089",
    title: "Construction of New 12-Classroom Block and Ablution Facilities at Qonce Senior Secondary School",
    description: "The Eastern Cape Department of Public Works and Infrastructure invites qualified contractors for the construction of educational facilities, civil earthworks, stormwater drainage, water-harvesting tanks, and perimeter security fencing.",
    category: "Construction & Infrastructure",
    categorySlug: "construction",
    issuingEntity: "Eastern Cape Dept of Public Works & Infrastructure",
    department: "Provincial Government",
    province: "Eastern Cape",
    cidbGrading: "5GB or Higher",
    estimatedValue: 14850000,
    estimatedValueText: "R12,000,000 - R16,000,000",
    briefingSessionDate: "2025-11-14T10:00:00.000Z",
    briefingSessionVenue: "School Assembly Grounds, Qonce (King William's Town), Eastern Cape",
    isBriefingCompulsory: true,
    closingDate: "2025-11-28T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "Tender_Specification_SCMU5_0089.pdf", url: "#", size: "3.4 MB" },
      { name: "Bill_of_Quantities_BoQ.xlsx", url: "#", size: "1.8 MB" },
      { name: "SBD_Pack_Complete.pdf", url: "#", size: "950 KB" }
    ],
    originalUrl: "https://www.etenders.gov.za/home/Download/?blobName=SCMU5-24-25-0089",
    contactPerson: "Mr. L. Mabandla (SCM Specialist)",
    contactEmail: "scm.tenders@dpw.ecprov.gov.za",
    contactPhone: "+27 (0)40 602 4000",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1", "SBD 8", "SBD 9"]
  },
  {
    id: "tender-002",
    referenceNumber: "GT/GDeGov/045/2025",
    title: "Provision of Modern Enterprise Cloud Hosting, Managed Cybersecurity & SOC Services for 36 Months",
    description: "Gauteng Department of e-Government seeks accredited B-BBEE ICT service providers for cloud migration, 24/7 Security Operations Centre (SOC) monitoring, threat detection, and disaster recovery infrastructure.",
    category: "IT & Technology",
    categorySlug: "it-technology",
    issuingEntity: "Gauteng Department of e-Government",
    department: "Provincial Government",
    province: "Gauteng",
    cidbGrading: "Not Applicable",
    estimatedValue: 28500000,
    estimatedValueText: "R25,000,000 - R32,000,000",
    briefingSessionDate: "2025-11-12T11:00:00.000Z",
    briefingSessionVenue: "Virtual Microsoft Teams (Link provided upon registration)",
    isBriefingCompulsory: false,
    closingDate: "2025-11-21T11:00:00.000Z",
    status: "CLOSING_SOON",
    documentUrls: [
      { name: "RFP_Cloud_eGov_2025.pdf", url: "#", size: "4.2 MB" },
      { name: "Service_Level_Agreement_Draft.pdf", url: "#", size: "1.1 MB" },
      { name: "Pricing_Schedule_ICT.xlsx", url: "#", size: "620 KB" }
    ],
    originalUrl: "https://www.e-tenders.gov.za/tenders/GT-GDeGov-045-2025",
    contactPerson: "Ms. Kelebogile Sithole",
    contactEmail: "ict.procurement@gauteng.gov.za",
    contactPhone: "+27 (0)11 689 6000",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-003",
    referenceNumber: "SANRAL N.002-140-2024/2",
    title: "Periodic Maintenance and Resurfacing of National Route 2 Section 14 between Mthatha and Viedgesville",
    description: "The South African National Roads Agency SOC Limited (SANRAL) invites tenders for the special maintenance, asphalt overlay, rut correction, and road marking on National Route 2.",
    category: "Engineering & Technical Services",
    categorySlug: "engineering",
    issuingEntity: "South African National Roads Agency SOC Ltd (SANRAL)",
    department: "State Owned Enterprise",
    province: "Eastern Cape",
    cidbGrading: "7CE or 6CE PE",
    estimatedValue: 47200000,
    estimatedValueText: "R45,000,000 - R52,000,000",
    briefingSessionDate: "2025-11-10T10:00:00.000Z",
    briefingSessionVenue: "SANRAL Southern Region Office, 20 Shore Road, Humewood, Gqeberha",
    isBriefingCompulsory: true,
    closingDate: "2025-12-05T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "SANRAL_Tender_Doc_N002.pdf", url: "#", size: "8.5 MB" },
      { name: "Engineering_Drawings_Vol2.pdf", url: "#", size: "15.2 MB" }
    ],
    originalUrl: "https://www.nra.co.za/service-provider-zone/tenders/active-tenders/",
    contactPerson: "Mr. S. Gxalaba (Procurement Head)",
    contactEmail: "procurementSR@nra.co.za",
    contactPhone: "+27 (0)41 398 3200",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1", "SANRAL Form A"]
  },
  {
    id: "tender-004",
    referenceNumber: "CPT/2025/WS/091",
    title: "Supply, Delivery and Warehousing of Personal Protective Equipment (PPE) & High-Visibility Gear",
    description: "City of Cape Town Water and Sanitation Directorate requires term tender for safety boots (acid/oil resistant), reflective flame-retardant two-piece continental overalls, and specialized gloves.",
    category: "PPE & Workwear",
    categorySlug: "ppe-safety",
    issuingEntity: "City of Cape Town Metropolitan Municipality",
    department: "Local Municipality",
    province: "Western Cape",
    cidbGrading: "Not Applicable",
    estimatedValue: 6400000,
    estimatedValueText: "R5,000,000 - R7,500,000",
    briefingSessionDate: "2025-11-08T10:00:00.000Z",
    briefingSessionVenue: "Civic Centre, 2nd Floor Meeting Hall, 12 Hertzog Boulevard, Cape Town",
    isBriefingCompulsory: false,
    closingDate: "2025-11-19T10:00:00.000Z",
    status: "CLOSING_SOON",
    documentUrls: [
      { name: "Tender_91G_2024_25_PPE.pdf", url: "#", size: "2.8 MB" },
      { name: "Local_Content_Declaration_SABS.pdf", url: "#", size: "520 KB" }
    ],
    originalUrl: "https://web1.capetown.gov.za/web1/TenderPortal/Tender",
    contactPerson: "Zandile Khumalo",
    contactEmail: "tenders.admin@capetown.gov.za",
    contactPhone: "+27 (0)21 400 1111",
    requiredSbd: ["MBD 1", "MBD 4", "MBD 6.1", "MBD 6.2 (Local Content)"]
  },
  {
    id: "tender-005",
    referenceNumber: "DOH/KZN/088/2025",
    title: "Outsourced Hygiene, Deep Cleaning and Waste Management Services for 14 District Clinics",
    description: "KwaZulu-Natal Department of Health invites bids from experienced cleaning companies with COIDA certification and certified green cleaning chemicals for eThekwini Health District.",
    category: "Cleaning & Waste Management",
    categorySlug: "cleaning",
    issuingEntity: "KwaZulu-Natal Department of Health",
    department: "Provincial Government",
    province: "KwaZulu-Natal",
    cidbGrading: "Not Applicable",
    estimatedValue: 8900000,
    estimatedValueText: "R8,000,000 - R10,500,000",
    briefingSessionDate: "2025-11-15T09:30:00.000Z",
    briefingSessionVenue: "Natalia Building Auditorium, 330 Langalibalele Street, Pietermaritzburg",
    isBriefingCompulsory: true,
    closingDate: "2025-11-26T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "KZN_Health_Cleaning_RFP.pdf", url: "#", size: "3.1 MB" }
    ],
    originalUrl: "https://www.kznhealth.gov.za/tenders.htm",
    contactPerson: "Mr. B. Nzimande",
    contactEmail: "scm.health@kznhealth.gov.za",
    contactPhone: "+27 (0)33 395 2111",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-006",
    referenceNumber: "TRANSNET-TPT-019-2025",
    title: "Supply, Delivery and Commissioning of 4x Heavy Industrial Forklifts and Spares Package",
    description: "Transnet Port Terminals requires 4x 16-ton diesel counterbalance container forklifts for the Port of Durban Pier 2 Container Terminal, including 3 years preventative maintenance.",
    category: "Transport & Fleet Logistics",
    categorySlug: "transport",
    issuingEntity: "Transnet Port Terminals (TPT)",
    department: "State Owned Enterprise",
    province: "KwaZulu-Natal",
    cidbGrading: "Not Applicable",
    estimatedValue: 18200000,
    estimatedValueText: "R16,000,000 - R21,000,000",
    briefingSessionDate: "2025-11-18T10:00:00.000Z",
    briefingSessionVenue: "TPT Boardroom, Kingsmead Office Park, Durban",
    isBriefingCompulsory: true,
    closingDate: "2025-12-02T10:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "TPT_Heavy_Machinery_RFP.pdf", url: "#", size: "5.4 MB" }
    ],
    originalUrl: "https://transnetetenders.azurewebsites.net",
    contactPerson: "Sipho Dlamini",
    contactEmail: "tpt.procurement@transnet.net",
    contactPhone: "+27 (0)31 308 8000",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1", "Transnet Standard Terms"]
  },
  {
    id: "tender-007",
    referenceNumber: "LP/LEDET/012/2025",
    title: "Appointment of Panel of Legal Practitioners for Civil Litigation, Labour Law & Contract Vetting",
    description: "Limpopo Department of Economic Development, Environment and Tourism (LEDET) invites admitted attorneys and advocates for placement on a 36-month legal services panel.",
    category: "Legal & Compliance Advisory",
    categorySlug: "legal",
    issuingEntity: "Limpopo Dept of Economic Development, Environment & Tourism",
    department: "Provincial Government",
    province: "Limpopo",
    cidbGrading: "Not Applicable",
    estimatedValue: 12000000,
    estimatedValueText: "R10,000,000 - R15,000,000 (Rate based)",
    briefingSessionDate: undefined,
    briefingSessionVenue: "No briefing session required",
    isBriefingCompulsory: false,
    closingDate: "2025-12-09T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "Legal_Panel_ToR_LEDET.pdf", url: "#", size: "1.9 MB" }
    ],
    originalUrl: "https://www.ledet.gov.za/tenders",
    contactPerson: "Adv. M. Ramaphosa",
    contactEmail: "legal.scm@ledet.gov.za",
    contactPhone: "+27 (0)15 293 8300",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-008",
    referenceNumber: "NW/DSD/099/2025",
    title: "Provision of Security Guarding Services (Armed & Unarmed) for 24 Social Development Facilities",
    description: "North West Department of Social Development invites PSIRA-registered security providers for 24-hour guarding, rapid armed response, and access control in Bojanala District.",
    category: "Security & Guarding Services",
    categorySlug: "security",
    issuingEntity: "North West Dept of Social Development",
    department: "Provincial Government",
    province: "North West",
    cidbGrading: "Not Applicable",
    estimatedValue: 22400000,
    estimatedValueText: "R20,000,000 - R25,000,000",
    briefingSessionDate: "2025-11-13T10:00:00.000Z",
    briefingSessionVenue: "Departmental Conference Room, University Drive, Mmabatho",
    isBriefingCompulsory: true,
    closingDate: "2025-11-25T11:00:00.000Z",
    status: "CLOSING_SOON",
    documentUrls: [
      { name: "PSIRA_Security_Specs_NW.pdf", url: "#", size: "2.4 MB" }
    ],
    originalUrl: "https://socdev.nwpg.gov.za/tenders",
    contactPerson: "Collen Modise",
    contactEmail: "cmodise@nwpg.gov.za",
    contactPhone: "+27 (0)18 388 2000",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-009",
    referenceNumber: "MP/EDU/2025/110",
    title: "Supply and Delivery of School Stationery Packs for No-Fee Schools in Ehlanzeni District",
    description: "Mpumalanga Department of Education invites SMMEs to bid for the packaging, labeling, and direct-to-school delivery of learner exercise books, pens, rulers, and mathematical sets.",
    category: "Stationery & Office Supplies",
    categorySlug: "stationery",
    issuingEntity: "Mpumalanga Department of Education",
    department: "Provincial Government",
    province: "Mpumalanga",
    cidbGrading: "Not Applicable",
    estimatedValue: 9800000,
    estimatedValueText: "R8,500,000 - R11,000,000",
    briefingSessionDate: undefined,
    briefingSessionVenue: "Non-compulsory online briefing",
    isBriefingCompulsory: false,
    closingDate: "2025-11-30T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "Stationery_Distribution_Schedule.pdf", url: "#", size: "3.7 MB" }
    ],
    originalUrl: "https://www.mpumalanga.gov.za/education/tenders",
    contactPerson: "Nomsa Mabuza",
    contactEmail: "n.mabuza@education.mpu.gov.za",
    contactPhone: "+27 (0)13 766 5555",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-010",
    referenceNumber: "ESK/2025/RE/014",
    title: "Engineering, Procurement and Construction (EPC) of 15MW Solar PV System at Tutuka Power Station",
    description: "Eskom Holdings SOC Ltd seeks engineering consortiums for the design, civil works, grid integration, inverter stations, and 24-month maintenance of ground-mounted solar PV array.",
    category: "Engineering & Technical Services",
    categorySlug: "engineering",
    issuingEntity: "Eskom Holdings SOC Ltd",
    department: "State Owned Enterprise",
    province: "Mpumalanga",
    cidbGrading: "8EP or 8GB",
    estimatedValue: 185000000,
    estimatedValueText: "R170,000,000 - R200,000,000",
    briefingSessionDate: "2025-11-19T09:00:00.000Z",
    briefingSessionVenue: "Megawatt Park Commercial Hall, Maxwell Drive, Sunninghill, Sandton",
    isBriefingCompulsory: true,
    closingDate: "2025-12-18T10:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "Eskom_Solar_EPC_Specification.pdf", url: "#", size: "12.8 MB" },
      { name: "Environmental_Authorization_RoD.pdf", url: "#", size: "7.1 MB" }
    ],
    originalUrl: "https://tenderbulletin.eskom.co.za",
    contactPerson: "Hendrik Van Der Merwe",
    contactEmail: "eskom.renewables@eskom.co.za",
    contactPhone: "+27 (0)11 800 2000",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1", "Eskom Standard Commercial Pack"]
  },
  {
    id: "tender-011",
    referenceNumber: "FS/DESTEA/2025/03",
    title: "Appointment of Catering and Hospitality Providers for 3-Day Free State SMME Summit 2026",
    description: "Department of Small Business Development, Tourism and Environmental Affairs requires catering for 1,200 delegates per day, including breakfast snacks, VIP plated lunch, and dietary variations.",
    category: "Catering & Event Management",
    categorySlug: "catering",
    issuingEntity: "Free State Dept of Small Business, Tourism & Environmental Affairs",
    department: "Provincial Government",
    province: "Free State",
    cidbGrading: "Not Applicable",
    estimatedValue: 1450000,
    estimatedValueText: "R1,200,000 - R1,600,000",
    briefingSessionDate: "2025-11-07T11:00:00.000Z",
    briefingSessionVenue: "Boet Troskie Hall, Central University of Technology, Bloemfontein",
    isBriefingCompulsory: true,
    closingDate: "2025-11-20T11:00:00.000Z",
    status: "CLOSING_SOON",
    documentUrls: [
      { name: "Catering_Menu_Specs.pdf", url: "#", size: "1.2 MB" }
    ],
    originalUrl: "https://www.destea.fs.gov.za/tenders",
    contactPerson: "Pulane Moloi",
    contactEmail: "catering@destea.fs.gov.za",
    contactPhone: "+27 (0)51 400 4911",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  },
  {
    id: "tender-012",
    referenceNumber: "NC/DOH/2025/44",
    title: "Supply, Delivery, Testing & Commissioning of Digital Mobile X-Ray Equipment for Rural Clinics",
    description: "Northern Cape Department of Health requires 6 units of robust, digital mobile radiography units suitable for mobile health outreach clinics in the Pixley ka Seme and Namakwa districts.",
    category: "Medical Equipment & Consumables",
    categorySlug: "medical",
    issuingEntity: "Northern Cape Department of Health",
    department: "Provincial Government",
    province: "Northern Cape",
    cidbGrading: "Not Applicable",
    estimatedValue: 8400000,
    estimatedValueText: "R7,500,000 - R9,200,000",
    briefingSessionDate: undefined,
    briefingSessionVenue: "Online MS Teams",
    isBriefingCompulsory: false,
    closingDate: "2025-12-04T11:00:00.000Z",
    status: "OPEN",
    documentUrls: [
      { name: "Medical_Imaging_Specs.pdf", url: "#", size: "4.1 MB" }
    ],
    originalUrl: "https://www.health.ncpg.gov.za/tenders",
    contactPerson: "Dr. A. Jacobs",
    contactEmail: "healthprocure@ncpg.gov.za",
    contactPhone: "+27 (0)53 830 0600",
    requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1"]
  }
];

export const MOCK_USER_PROFILE = {
  id: "user_zainnovate_demo",
  name: "Vuyolwethu Ntshele",
  email: "vuyo@imvulacivil.co.za",
  companyName: "Imvula Civil & Infra (Pty) Ltd",
  csdNumber: "MAAA0492104",
  bbbEeLevel: 1,
  province: "Eastern Cape",
  phone: "+27 82 456 7890",
  subscription: {
    tier: "PRO",
    status: "ACTIVE",
    interval: "MONTHLY",
    currentPeriodEnd: "2025-12-28T23:59:59.000Z",
    amountZAR: 99,
  },
  alertsCount: 3,
  savedCount: 4,
  matchesThisWeek: 18,
};
