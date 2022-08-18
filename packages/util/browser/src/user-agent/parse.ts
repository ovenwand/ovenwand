import { parse } from './ua-parser.js';

export function parseUserAgent(userAgentString: string) {
	return parse(userAgentString);
}
