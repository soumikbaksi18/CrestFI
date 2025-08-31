export interface LPRecommendationInputs {
  amountAvax: number;
  horizonMonths: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  topN?: number;
  project?: string;
  search?: string;
}

export interface LPRecommendationPool {
  pool: string;
  project: string;
  chain: string;
  symbol: string;
  url: string | null;
  category: string | null;
  tvlUsd: number;
  apy_now: number;
  apy_net_estimate: number;
  periodReturnPct: number;
  downsidePeriod: number;
  RAR: number;
  Score: number;
  throughput: number;
  conf: number;
  amountStartAVAX: number;
  amountEndAVAX: number;
  profitAvax: number;
  horizonMonths: number;
  why: {
    tvlScore: number;
    ilPenaltyPctPts: number;
    exposureBias: number;
    style: string;
  };
  exposure: string;
  ilRisk: string;
  underlyingTokens: string[];
  topsisScore: number;
  avaxPriceUsd: number;
  profitUsd: number;
  tvlFloorApplied: number;
}

export interface LPRecommendationExplanation {
  pool: string;
  project: string;
  symbol: string;
  text: string;
}

export interface LPRecommendationResponse {
  inputs: LPRecommendationInputs & {
    chain: string;
    limitFetch: number;
    includeNarrative: boolean;
  };
  universeCount: number;
  tvlFloorUsed: number;
  topN: LPRecommendationPool[];
  explanations: LPRecommendationExplanation[];
}

const API_BASE_URL = 'https://fastapi-on-render-0s0u.onrender.com';

export const getLPRecommendations = async (
  inputs: LPRecommendationInputs
): Promise<LPRecommendationResponse> => {
  const params = new URLSearchParams({
    amountAvax: inputs.amountAvax.toString(),
    horizonMonths: inputs.horizonMonths.toString(),
    riskTolerance: inputs.riskTolerance,
    ...(inputs.topN && { topN: inputs.topN.toString() }),
    ...(inputs.project && { project: inputs.project }),
    ...(inputs.search && { search: inputs.search }),
  });

  const response = await fetch(`${API_BASE_URL}/recommend?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch LP recommendations: ${response.statusText}`);
  }

  return response.json();
};

export const getLPRecommendationsLocal = async (
  inputs: LPRecommendationInputs,
  localPort: number = 9000
): Promise<LPRecommendationResponse> => {
  const params = new URLSearchParams({
    amountAvax: inputs.amountAvax.toString(),
    horizonMonths: inputs.horizonMonths.toString(),
    riskTolerance: inputs.riskTolerance,
    ...(inputs.topN && { topN: inputs.topN.toString() }),
    ...(inputs.project && { project: inputs.project }),
    ...(inputs.search && { search: inputs.search }),
  });

  const response = await fetch(`http://localhost:${localPort}/recommend?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch LP recommendations: ${response.statusText}`);
  }

  return response.json();
}; 