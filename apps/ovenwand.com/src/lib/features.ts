const features = Object.freeze({
	'route.blog': import.meta.env.VITE_FEATURE_ROUTE_BLOG === '1'
});

export function isFeatureEnabled(feature: keyof typeof features) {
	return features[feature];
}
