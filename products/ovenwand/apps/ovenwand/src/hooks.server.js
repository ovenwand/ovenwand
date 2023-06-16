import { redirect } from "@sveltejs/kit";
import {
  OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE,
  isUrlAllowedWithoutTrackingConsent,
} from "@ovenwand/ovenwand.service/utils/tracking-consent-cookie.js";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { cookies, url } = event;

  const hasCookieConsent = Boolean(
    cookies.get(OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE)
  );

  if (!hasCookieConsent && !isUrlAllowedWithoutTrackingConsent(url)) {
    throw redirect(303, "/service/tracking/consent");
  }

  return resolve(event);
}
