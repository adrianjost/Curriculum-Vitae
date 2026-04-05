import fetchRetry from "fetch-retry";

const fetch = fetchRetry(globalThis.fetch.bind(globalThis), {
	retries: 3,
	retryDelay: 1000,
});

const apiBaseUrl =
	process.env.API_URL ||
	(process.env.NODE_ENV === "development"
		? "http://localhost:3001/curriculum-vitae-5cd0a/us-central1/fastApiProjects"
		: "https://us-central1-curriculum-vitae-5cd0a.cloudfunctions.net/fastApiProjects");

let sharpModulePromise;

function getSharp() {
	if (!sharpModulePromise) {
		sharpModulePromise = import("sharp").then(
			(module) => module.default || module
		);
	}

	return sharpModulePromise;
}

async function fetchImageBuffer(url) {
	const attempts = [
		{},
		{
			headers: {
				accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
				"cache-control": "no-cache",
				pragma: "no-cache",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
			},
		},
	];

	let lastStatus;
	for (const attempt of attempts) {
		const response = await globalThis.fetch(url, {
			method: "GET",
			redirect: "follow",
			...attempt,
		});

		if (response.ok) {
			return Buffer.from(await response.arrayBuffer());
		}

		lastStatus = response.status;
	}

	throw new Error(`Failed to load image for placeholder: ${lastStatus}`);
}

async function encodeImage(url) {
	if (process.client) {
		return undefined;
	}

	const sharp = await getSharp();
	const imageBuffer = await fetchImageBuffer(url);
	const resizedBuffer = await sharp(imageBuffer)
		.resize({
			height: 30,
			fit: "inside",
			withoutEnlargement: true,
		})
		.webp({ quality: 60 })
		.toBuffer();

	return `data:image/webp;base64,${resizedBuffer.toString("base64")}`;
}

const logInvalid = (res) => {
	if (res.status < 200 || res.status >= 300) {
		console.error("Error", res);
	}
	return res;
};

const getData = (urlPath) => () =>
	fetch(`${apiBaseUrl}/${urlPath}`)
		.then(logInvalid)
		.then((res) => res.json())
		.then((data) => data.data);

export const getAbout = getData("about");
export const getChapters = getData("chapters");
export const getTags = getData("tags");

export const getProjects = () =>
	fetch(`${apiBaseUrl}/projects`)
		.then(logInvalid)
		.then((res) => res.json())
		.then((data) =>
			Promise.all(
				data.data.map(async (project) => {
					if (project.img) {
						project.imgPlaceholder = await encodeImage(project.img);
					}
					return project;
				})
			)
		);

export const getAll = () =>
	Promise.all([getAbout(), getChapters(), getTags(), getProjects()]);
