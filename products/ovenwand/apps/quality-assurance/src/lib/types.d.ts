import { QUALITY_GATE, QUALITY_REVIEW_VERDICT, QUALITY_GATE_STATUS } from "./constants.js";

export type QualityGate = (typeof QUALITY_GATE)[keyof typeof QUALITY_GATE];

export type QualityGateStatus = (typeof QUALITY_GATE_STATUS)[keyof typeof QUALITY_GATE_STATUS];

export type QualityReviewVerdict =
  (typeof QUALITY_REVIEW_VERDICT)[keyof typeof QUALITY_REVIEW_VERDICT];

export interface QualityGateReport {
  gate: QualityGate;
  status: QualityGateStatus;
  verdict: QualityReviewVerdict;
  statusUrl: string | null;
  reportUrl: string | null;
}

export interface QualityReport {
  gates: QualityGateReport[];
  verdict: QualityReviewVerdict;
}
