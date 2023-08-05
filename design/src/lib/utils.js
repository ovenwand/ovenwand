// TODO MOVE ALL THIS TO A MORE APPROPRIATE PLACE

/**
 * @typedef {{ (): string, test: (uuid: string) => boolean }} UUIDFactory
 */

function getUUIDFactoryFromSelf() {
  return /** @type {UUIDFactory} */ (() => self.crypto.randomUUID());
}

/**
 * @returns {UUIDFactory}
 */
function createUUIDFactory() {
  /** @type {Uint8Array | null} */
  let buffer;

  /** @type {number} */
  let bufferIndex = 0;

  /** @type {string[]} */
  const hexBytes = [];

  /**
   * String UUIDv4 (Random)
   * @returns {string}
   */
  const uuid = () => {
    const b = uuid.bin();
    return (
      hexBytes[b[0]] +
      hexBytes[b[1]] +
      hexBytes[b[2]] +
      hexBytes[b[3]] +
      "-" +
      hexBytes[b[4]] +
      hexBytes[b[5]] +
      "-" +
      hexBytes[b[6]] +
      hexBytes[b[7]] +
      "-" +
      hexBytes[b[8]] +
      hexBytes[b[9]] +
      "-" +
      hexBytes[b[10]] +
      hexBytes[b[11]] +
      hexBytes[b[12]] +
      hexBytes[b[13]] +
      hexBytes[b[14]] +
      hexBytes[b[15]]
    );
  };

  /**
   * Buffer some random bytes for speed
   * @param {number} n
   * @returns {Uint8Array}
   */
  const randomBytesBuffered = (n) => {
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

  /**
   * Binary uuids
   * @returns {Uint8Array}
   */
  uuid.bin = () => {
    /** @type {Uint8Array} */
    const b = randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  };

  // lol
  return /** @type {UUIDFactory} */ (/** @type {unknown} */ (uuid));
}

const supportsNativeUUIDFactory =
  typeof self !== "undefined" && Boolean(self?.crypto?.randomUUID);

/**
 * @type {UUIDFactory}
 */
const uuid = supportsNativeUUIDFactory
  ? getUUIDFactoryFromSelf()
  : createUUIDFactory();

uuid.test = (uuid) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
    uuid
  );
};

export { uuid };
