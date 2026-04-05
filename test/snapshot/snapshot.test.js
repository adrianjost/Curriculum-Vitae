import { test, expect } from "@playwright/test";

const paths = ["/", "/about", "/contact", "/projects"];

for (const path of paths) {
	test(`${path} should match snapshot`, async ({ page }) => {
		await page.goto(path);
		const body = await page.locator("body").textContent();
		const normalized = body
			.replace(
				/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
				"<buildId>"
			)
			.replace(/\b\d{13}\b/g, "<timestamp>");
		await expect(normalized).toMatchSnapshot(`${path.slice(1) || "index"}.txt`);
	});
}
