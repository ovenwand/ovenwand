let buffer: Uint8Array | null;
let bufferIndex = 0;
const hexBytes: string[] = [];

// String UUIDv4 (Random)
const uuid = (): string => {
	const b = uuid.bin();
	return (
		hexBytes[b[0]] +
		hexBytes[b[1]] +
		hexBytes[b[2]] +
		hexBytes[b[3]] +
		'-' +
		hexBytes[b[4]] +
		hexBytes[b[5]] +
		'-' +
		hexBytes[b[6]] +
		hexBytes[b[7]] +
		'-' +
		hexBytes[b[8]] +
		hexBytes[b[9]] +
		'-' +
		hexBytes[b[10]] +
		hexBytes[b[11]] +
		hexBytes[b[12]] +
		hexBytes[b[13]] +
		hexBytes[b[14]] +
		hexBytes[b[15]]
	);
};

// Buffer some random bytes for speed
const randomBytesBuffered = (n: number): Uint8Array => {
	if (!buffer || bufferIndex + n > uuid.BUFFER_SIZE) {
		const bytes = new Uint8Array(uuid.BUFFER_SIZE);
		bufferIndex = 0;
		buffer = crypto.getRandomValues(bytes);
	}
	return buffer.slice(bufferIndex, (bufferIndex += n));
};

// Pre-calculate toString(16) for speed
for (let i = 0; i < 256; i++) {
	hexBytes[i] = (i + 0x100).toString(16).substring(1);
}

// Buffer random numbers for speed
// Reduce memory usage by decreasing this number (min 16)
// or improve speed by increasing this number (try 16384)
uuid.BUFFER_SIZE = 4096;

// Binary uuids
uuid.bin = (): Uint8Array => {
	const b: Uint8Array = randomBytesBuffered(16);
	b[6] = (b[6] & 0x0f) | 0x40;
	b[8] = (b[8] & 0x3f) | 0x80;
	return b;
};

// Test for uuid
uuid.test = (uuid: string): boolean => {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
};

export { uuid };
