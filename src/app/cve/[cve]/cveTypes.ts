export const emptyResponseArray = {
  cveMetadata: {
    cveId: "",
    assignerOrgId: "",
    assignerShortName: "",
    datePublished: "",
    dateReserved: "",
    dateUpdated: "",
    state: "",
  },
  containers: {
    cna: {
      descriptions: [{ value: "", lang: "" }],
      metrics: [],
      affected: [],
      problemTypes: [],
      references: [],
      providerMetadata: {
        orgId: "",
        shortName: "",
        dateUpdated: "",
      },
    },
    adp: [
      {
        metrics: [
          {
            other: {
              type: "",
              content: {
                timestamp: "",
                id: "",
                options: [],
                role: "",
                version: "",
              },
            },
          },
        ],
        title: "",
        providerMetadata: {
          orgId: "",
          shortName: "",
          dateUpdated: "",
        },
      },
    ],
  },
  dataType: "",
  dataVersion: "",
};

export interface ApiResponse {
  dataType: string;
  dataVersion: string;
  cveMetadata: CveMetadata;
  containers: Containers;
}

export interface CveMetadata {
  cveId: string;
  assignerOrgId: string;
  state: string;
  assignerShortName: string;
  dateReserved: string;
  datePublished: string;
  dateUpdated: string;
}

export interface Containers {
  cna: CnaData;
  adp: AdpData[];
}

export interface CnaData {
  providerMetadata: ProviderMetadata;
  problemTypes: ProblemType[];
  affected: AffectedProduct[];
  descriptions: Description[];
  references: Reference[];
  metrics: CnaMetric[];
}

export interface ProviderMetadata {
  orgId: string;
  shortName: string;
  dateUpdated: string;
}

export interface ProblemType {
  descriptions: ProblemDescription[];
}

export interface ProblemDescription {
  lang: string;
  description: string;
  cweId: string;
}

export interface AffectedProduct {
  vendor: string;
  product: string;
  versions: ProductVersion[];
  defaultStatus: string;
}

export interface ProductVersion {
  version: string;
  status: string;
  lessThan: string;
  versionType: string;
}

export interface Description {
  lang: string;
  value: string;
}

export interface Reference {
  url: string;
}

export interface CnaMetric {
  format: string;
  scenarios: Scenario[];
  cvssV3_1?: CvssV3_1;
}

export interface Scenario {
  lang: string;
  value: string;
}

export interface CvssV3_1 {
  version: string;
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  baseScore: number;
  baseSeverity: string;
  vectorString: string;
}

export interface AdpData {
  metrics: AdpMetric[];
  title: string;
  providerMetadata: ProviderMetadata;
}

export interface AdpMetric {
  other: OtherMetric;
}

export interface OtherMetric {
  type: string;
  content: SsvcContent;
}

export interface SsvcContent {
  timestamp: string;
  id: string;
  options: Record<string, string>[];
  role: string;
  version: string;
}
