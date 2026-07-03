// HANDOFF NOTE: YouTube-link parsing used by the admin panel.
// In production you may want richer providers (Loom, Vimeo, uploaded mp4);
// the Garden page only needs a thumbnail URL + a watch URL.

export function parseYouTubeId(input: string): string | null {
  const url = input.trim();
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,16})/,
  );
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
  return null;
}

export const youTubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const youTubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
