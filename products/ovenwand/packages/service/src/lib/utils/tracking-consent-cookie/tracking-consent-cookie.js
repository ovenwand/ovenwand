import {
  OVENWAND_SERVICE_TRACKING_CONSENT,
  OVENWAND_SERVICE_TRACKING_CONSENT_ALLOWED_URLS_WHEN_NO_CONSENT,
} from "./constants.js";

/**
 * @typedef {typeof OVENWAND_SERVICE_TRACKING_CONSENT[keyof typeof OVENWAND_SERVICE_TRACKING_CONSENT]} TrackingConsent
 */

/**
 * @param {unknown} value
 * @returns {value is TrackingConsent}
 */
export function isValidTrackingConsent(value) {
  // @ts-expect-error TS2345: Argument of type 'unknown' is not assignable to parameter of type '"accept" | "decline"'.
  return Object.values(OVENWAND_SERVICE_TRACKING_CONSENT).includes(value);
}

/**
 * Checks if the given URL is allowed to be accessed when no tracking consent cookie is set.
 * @param {URL} url
 * @returns {boolean}
 */
export function isUrlAllowedWithoutTrackingConsent(url) {
  // TODO what to do if url is invalid? return false? throw error?
  return OVENWAND_SERVICE_TRACKING_CONSENT_ALLOWED_URLS_WHEN_NO_CONSENT.includes(
    url.pathname
  );
}
