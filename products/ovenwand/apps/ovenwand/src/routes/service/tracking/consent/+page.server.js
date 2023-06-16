import { error, redirect } from "@sveltejs/kit";
import {
  OVENWAND_SERVICE_TRACKING_CONSENT,
  OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE,
  isValidTrackingConsent,
} from "@ovenwand/ovenwand.service/utils/tracking-consent-cookie.js";

/** @type {import('./$types.js').PageServerLoad} */
export async function load({ cookies }) {
  const hasConsentCookie = Boolean(
    cookies.get(OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE)
  );

  if (hasConsentCookie) {
    throw redirect(303, "/");
  }
}

/** @type {import('./$types.js').Actions} */
export const actions = {
  async default({ cookies, request }) {
    const data = await request.formData();

    const consent =
      data.get(OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE) ??
      OVENWAND_SERVICE_TRACKING_CONSENT.DECLINE;

    if (!isValidTrackingConsent(consent)) {
      throw error(400, "Invalid consent");
    }

    cookies.set(OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE, consent, {
      path: "/",
    });

    throw redirect(303, "/");
  },
};
