/**
 * Converts various YouTube URL formats to a privacy-enhanced embed URL
 * Handles:
 * - https://www.youtube.com/watch?v=v_xcBcVVsp4
 * - https://youtu.be/v_xcBcVVsp4
 * - https://www.youtube.com/embed/v_xcBcVVsp4
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    // If it's already an embed URL
    if (url.includes('/embed/')) {
      return url;
    }

    // Standard watch?v= format
    const matchWatch = url.match(/[?&]v=([^&#]+)/);
    if (matchWatch && matchWatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${matchWatch[1]}?autoplay=1&rel=0&modestbranding=1`;
    }

    // Shortened youtu.be/ format
    const matchShort = url.match(/youtu\.be\/([^?&#]+)/);
    if (matchShort && matchShort[1]) {
      return `https://www.youtube-nocookie.com/embed/${matchShort[1]}?autoplay=1&rel=0&modestbranding=1`;
    }

    // Return original if unknown format
    return url;
  } catch (err) {
    return url;
  }
}
