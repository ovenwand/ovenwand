import UAParser from 'ua-parser-js';

export function parseUserAgent(userAgentString: string) {
	return UAParser(userAgentString);
}
