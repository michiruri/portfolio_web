/**
 * Utilities for parsing GIF frame delays and automatically discovering
 * developer GIFs from the public/developer-gifs folder.
 */

export interface DeveloperGif {
  url: string;
  duration: number;
  index: number;
}

/**
 * Parses a GIF binary buffer and computes total animation duration in milliseconds.
 * Follows the GIF87a/GIF89a standard Graphic Control Extension specifications.
 */
export function parseGifDuration(buffer: ArrayBuffer | Uint8Array): { duration: number; frameCount: number } {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  
  if (bytes.length < 13) return { duration: 0, frameCount: 0 };
  
  // Verify GIF Header (GIF87a or GIF89a)
  const header = String.fromCharCode(bytes[0], bytes[1], bytes[2]);
  if (header !== "GIF") return { duration: 0, frameCount: 0 };

  let i = 10; // skip width (2), height (2)
  if (i >= bytes.length) return { duration: 0, frameCount: 0 };

  const flags = bytes[i++];
  const hasGct = (flags & 0x80) !== 0;
  const gctSize = 3 * Math.pow(2, (flags & 0x07) + 1);
  i += 2; // skip bg color index and pixel aspect ratio
  if (hasGct) i += gctSize;

  let totalDurationMs = 0;
  let frameCount = 0;

  while (i < bytes.length) {
    const block = bytes[i++];
    if (block === 0x3b) break; // Trailer / End of GIF

    if (block === 0x21) { // Extension block
      if (i >= bytes.length) break;
      const extType = bytes[i++];

      if (extType === 0xf9) { // Graphic Control Extension
        if (i >= bytes.length) break;
        const blockSize = bytes[i++];
        if (i + 3 <= bytes.length) {
          const delay = bytes[i + 1] | (bytes[i + 2] << 8);
          // Standard browser behavior: delays <= 1 (10ms) are treated as 10 (100ms)
          const delayHundredths = delay <= 1 ? 10 : delay;
          totalDurationMs += delayHundredths * 10;
          frameCount++;
        }
        i += blockSize;
        // Skip sub-blocks
        while (i < bytes.length && bytes[i] !== 0) {
          i += bytes[i] + 1;
        }
        if (i < bytes.length) i++; // Skip block terminator (0x00)
      } else {
        // Skip other extensions
        while (i < bytes.length && bytes[i] !== 0) {
          i += bytes[i] + 1;
        }
        if (i < bytes.length) i++;
      }
    } else if (block === 0x2c) { // Image Descriptor
      i += 8; // skip bounds (left, top, width, height)
      if (i >= bytes.length) break;
      const packed = bytes[i++];
      if ((packed & 0x80) !== 0) { // Local Color Table
        i += 3 * Math.pow(2, (packed & 0x07) + 1);
      }
      i++; // skip LZW minimum code size
      // Skip image data sub-blocks
      while (i < bytes.length && bytes[i] !== 0) {
        i += bytes[i] + 1;
      }
      if (i < bytes.length) i++;
    }
  }

  return { duration: totalDurationMs, frameCount };
}

const VERIFIED_DEVELOPER_GIFS = [
  "/developer-gifs/1.gif",
  "/developer-gifs/2.gif",
  "/developer-gifs/3.gif",
];

/**
 * Discovers and parses animations for verified developer GIFs stored in /developer-gifs/.
 * Falls back to /profile_back.gif if no folder GIFs are detected.
 */
export async function discoverDeveloperGifs(): Promise<DeveloperGif[]> {
  const discovered: DeveloperGif[] = [];

  for (let i = 0; i < VERIFIED_DEVELOPER_GIFS.length; i++) {
    const url = VERIFIED_DEVELOPER_GIFS[i];
    try {
      const response = await fetch(url, { method: "GET", cache: "default" });
      if (response.ok && response.status === 200) {
        const gifBuffer = await response.arrayBuffer();
        const { duration } = parseGifDuration(gifBuffer);
        const validDuration = duration >= 500 ? duration : 3000;

        discovered.push({
          url,
          duration: validDuration,
          index: i + 1,
        });
      }
    } catch {
      // Continue checking candidates
    }
  }

  // Fallback to default if folder is empty or not yet seeded
  if (discovered.length === 0) {
    try {
      const fallbackUrl = "/profile_back.gif";
      const res = await fetch(fallbackUrl);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const { duration } = parseGifDuration(buf);
        discovered.push({
          url: fallbackUrl,
          duration: duration >= 500 ? duration : 2220,
          index: 1
        });
      }
    } catch {
      discovered.push({
        url: "/profile_back.gif",
        duration: 2220,
        index: 1
      });
    }
  }

  return discovered;
}
