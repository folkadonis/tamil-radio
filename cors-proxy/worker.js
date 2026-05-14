/**
 * Tamil Radio & TV — HLS CORS Proxy Worker
 *
 * Usage: https://<your-worker>.workers.dev/?url=<encoded-stream-url>
 *
 * - Fetches any HTTP or HTTPS stream server-side (no mixed-content issues)
 * - Rewrites m3u8 playlist segment URLs to also go through this proxy
 * - Adds Access-Control-Allow-Origin: * to every response
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, Content-Type',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
};

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const reqUrl = new URL(request.url);
    const rawTarget = reqUrl.searchParams.get('url');

    if (!rawTarget) {
      return new Response(
        'Tamil Radio TV — HLS CORS Proxy\nUsage: ?url=<encoded-stream-url>',
        { status: 200, headers: { 'Content-Type': 'text/plain', ...CORS_HEADERS } }
      );
    }

    const targetUrl = decodeURIComponent(rawTarget);

    let upstream;
    try {
      upstream = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HLSProxy/1.0)',
          'Accept': '*/*',
        },
        cf: { cacheTtl: 2 },
      });
    } catch (err) {
      return new Response('Upstream error: ' + err.message, {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    if (!upstream.ok && upstream.status !== 206) {
      return new Response(`Upstream returned ${upstream.status}`, {
        status: upstream.status,
        headers: CORS_HEADERS,
      });
    }

    const ct = upstream.headers.get('content-type') || '';
    const isPlaylist =
      ct.includes('mpegurl') ||
      targetUrl.includes('.m3u8') ||
      targetUrl.includes('.m3u');

    if (isPlaylist) {
      const text = await upstream.text();
      const base = new URL(targetUrl);
      const proxyBase = reqUrl.origin + '/?url=';

      const rewritten = text
        .split('\n')
        .map(line => {
          const trimmed = line.trim();

          // Keep comments and empty lines as-is
          if (!trimmed || trimmed.startsWith('#')) return line;

          // Resolve to absolute URL
          let abs;
          if (/^https?:\/\//i.test(trimmed)) {
            abs = trimmed;
          } else if (trimmed.startsWith('//')) {
            abs = base.protocol + trimmed;
          } else if (trimmed.startsWith('/')) {
            abs = `${base.protocol}//${base.host}${trimmed}`;
          } else {
            const dir = targetUrl.slice(0, targetUrl.lastIndexOf('/') + 1);
            abs = dir + trimmed;
          }

          return proxyBase + encodeURIComponent(abs);
        })
        .join('\n');

      return new Response(rewritten, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Cache-Control': 'no-cache, no-store',
          ...CORS_HEADERS,
        },
      });
    }

    // Pass through binary segments (.ts, .aac, .mp4, etc.) with CORS headers
    const passHeaders = new Headers(CORS_HEADERS);
    if (ct) passHeaders.set('Content-Type', ct);
    const cl = upstream.headers.get('content-length');
    if (cl) passHeaders.set('Content-Length', cl);
    const cr = upstream.headers.get('content-range');
    if (cr) passHeaders.set('Content-Range', cr);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: passHeaders,
    });
  },
};
