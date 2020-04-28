const baseUrl = "http://localhost:4001";
describe("Homepage", () => {
	test.each([["/"], ["/about"], ["/contact"], ["/projects"]])(
		"%p should match snapshot",
		async (path) => {
			await page.goto(`${baseUrl}${path}`);
			const body = await page.$eval("body", (el) => el.innerText);
			expect(body).toMatchSnapshot();
		}
	);
});
