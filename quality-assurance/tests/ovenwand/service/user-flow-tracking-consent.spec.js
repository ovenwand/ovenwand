import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("User flow: Without prior consent user gets redirected to tracking consent page", async ({
  page,
}) => {
  const url = new URL("/", BASE_URL);
  await page.goto(url.href);
  await expect(page).toHaveURL(/\/service\/tracking\/consent$/);
});

test("User flow: User accepts tracking", async ({ page }) => {
  const url = new URL("/service/tracking/consent", BASE_URL);
  await page.goto(url.href);
  await page.getByRole("button", { name: "Accept" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("User flow: User rejects tracking", async ({ page }) => {
  const url = new URL("/service/tracking/consent", BASE_URL);
  await page.goto(url.href);
  await page.getByRole("button", { name: "Decline" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("User flow: Form submission fails", async ({ page }) => {
  test.skip();
});

test("User flow: User navigates to user preferences", async ({ page }) => {
  const url = new URL("/service/tracking/consent", BASE_URL);
  await page.goto(url.href);
  await page.getByRole("link", { name: "tracking preferences" }).click();
  await expect(page).toHaveURL(/\/service\/tracking\/preferences$/);
});

test("Visual regression: Tracking consent page", async ({ page }) => {
  const url = new URL("/service/tracking/consent", BASE_URL);
  await page.goto(url.href);
  await expect(page).toHaveScreenshot("color-scheme--light.png", {
    fullPage: true,
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page).toHaveScreenshot("color-scheme--dark.png", {
    fullPage: true,
  });
});
