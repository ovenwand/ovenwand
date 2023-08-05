import { expect, test } from "@playwright/test";

test("User flow: Without prior consent user gets redirected to tracking consent page", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/service\/tracking\/consent$/);
});

test("User flow: User accepts tracking", async ({ page }) => {
  await page.goto("/service/tracking/consent");
  await page.getByRole("button", { name: "Accept" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("User flow: User rejects tracking", async ({ page }) => {
  await page.goto("/service/tracking/consent");
  await page.getByRole("button", { name: "Decline" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("User flow: Form submission fails", async ({ page }) => {
  test.skip();
});

test("User flow: User navigates to user preferences", async ({ page }) => {
  await page.goto("/service/tracking/consent");
  await page.getByRole("link", { name: "tracking preferences" }).click();
  await expect(page).toHaveURL(/\/service\/tracking\/preferences$/);
});

test("Visual regression: Tracking consent page", async ({ page }) => {
  await page.goto("/service/tracking/consent");
  await expect(page).toHaveScreenshot("color-scheme--light.png", {
    fullPage: true,
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page).toHaveScreenshot("color-scheme--dark.png", {
    fullPage: true,
  });
});
