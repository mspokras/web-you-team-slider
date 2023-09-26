function getEntryPoints (base = "", mode) {
	return {
		"common": [`${base}/js/common/index.js`, `${base}/scss/common/index.scss`],
		"home": [`${base}/js/pages/home/index.js`, `${base}/scss/pages/home/index.scss`],
	};
}
export default getEntryPoints;