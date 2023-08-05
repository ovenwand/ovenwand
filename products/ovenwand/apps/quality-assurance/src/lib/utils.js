import debug from "debug";
import { QUALITY_GATE, QUALITY_REVIEW_VERDICT } from "./constants.js";

/**
 * @param {string} error
 * @param {ErrorOptions} [options]
 * @returns {never}
 */
export function raise(error, options) {
  throw new Error(error, options);
}

/**
 * @param {string} namespace
 * @returns {debug.Debugger}
 */
export function createDebugLogger(namespace) {
  return debug(`quality-assurance:${namespace}`);
}

/**
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/**
 * @template {import('./types.js').QualityGate} T
 * @param {unknown} gate
 * @return {gate is T}
 */
export function isQualityGate(gate) {
  return Object.values(QUALITY_GATE).includes(/** @type {T} */ (gate));
}

/**
 * @template {import('./types.js').QualityReviewVerdict} T
 * @param {unknown} verdict
 * @returns {verdict is T}
 */
export function isQualityReviewVerdict(verdict) {
  return Object.values(QUALITY_REVIEW_VERDICT).includes(/** @type {T} */ (verdict));
}
