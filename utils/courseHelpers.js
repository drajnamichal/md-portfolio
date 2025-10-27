// Helper functions for course management

/**
 * Format seconds into MM:SS or HH:MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export function formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate total course duration from videos array
 * @param {Array} videos - Array of video objects with duration property
 * @returns {Object} Total duration in seconds and formatted string
 */
export function calculateTotalDuration(videos) {
  if (!videos || videos.length === 0) {
    return { seconds: 0, formatted: '0:00', hours: 0 };
  }

  const totalSeconds = videos.reduce((acc, video) => acc + (video.duration || 0), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let formatted = '';
  if (hours > 0) {
    formatted = `${hours}h ${minutes}m`;
  } else {
    formatted = `${minutes}m`;
  }

  return {
    seconds: totalSeconds,
    formatted,
    hours: parseFloat((totalSeconds / 3600).toFixed(1)),
  };
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Store user email in localStorage for course access
 * @param {string} email - User's email address
 */
export function saveUserEmail(email) {
  if (typeof window !== 'undefined' && email) {
    localStorage.setItem('course_email', email);
  }
}

/**
 * Retrieve stored user email from localStorage
 * @returns {string|null} Stored email or null
 */
export function getUserEmail() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('course_email');
  }
  return null;
}

/**
 * Clear stored user email from localStorage
 */
export function clearUserEmail() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('course_email');
  }
}

/**
 * Format price in dollars
 * @param {number} cents - Price in cents
 * @returns {string} Formatted price (e.g., "$99.00")
 */
export function formatPrice(cents) {
  if (!cents || cents < 0) return '$0.00';
  const dollars = (cents / 100).toFixed(2);
  return `$${dollars}`;
}

/**
 * Get progress percentage for a course
 * @param {Array} videos - Array of all videos
 * @param {Array} watchedVideoIds - Array of watched video IDs
 * @returns {number} Progress percentage (0-100)
 */
export function getCourseProgress(videos, watchedVideoIds = []) {
  if (!videos || videos.length === 0) return 0;
  if (!watchedVideoIds || watchedVideoIds.length === 0) return 0;

  const percentage = (watchedVideoIds.length / videos.length) * 100;
  return Math.min(Math.round(percentage), 100);
}

/**
 * Group videos by section (if videos have section property)
 * @param {Array} videos - Array of video objects
 * @returns {Object} Videos grouped by section
 */
export function groupVideosBySection(videos) {
  if (!videos || videos.length === 0) return {};

  return videos.reduce((acc, video) => {
    const section = video.section || 'Main Content';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(video);
    return acc;
  }, {});
}

/**
 * Check if user has completed the course
 * @param {number} totalVideos - Total number of videos
 * @param {number} watchedVideos - Number of watched videos
 * @returns {boolean} True if course is completed
 */
export function isCourseCompleted(totalVideos, watchedVideos) {
  if (!totalVideos || totalVideos === 0) return false;
  return watchedVideos >= totalVideos;
}

/**
 * Get next video to watch
 * @param {Array} videos - Array of all videos
 * @param {string} currentVideoId - Current video ID
 * @returns {Object|null} Next video object or null
 */
export function getNextVideo(videos, currentVideoId) {
  if (!videos || videos.length === 0) return null;

  const currentIndex = videos.findIndex(v => v.id === currentVideoId);
  if (currentIndex === -1 || currentIndex === videos.length - 1) return null;

  return videos[currentIndex + 1];
}

/**
 * Get previous video
 * @param {Array} videos - Array of all videos
 * @param {string} currentVideoId - Current video ID
 * @returns {Object|null} Previous video object or null
 */
export function getPreviousVideo(videos, currentVideoId) {
  if (!videos || videos.length === 0) return null;

  const currentIndex = videos.findIndex(v => v.id === currentVideoId);
  if (currentIndex <= 0) return null;

  return videos[currentIndex - 1];
}

/**
 * Parse video URL to get provider and ID
 * @param {string} url - Video URL
 * @returns {Object} Provider and video ID
 */
export function parseVideoUrl(url) {
  if (!url) return { provider: null, videoId: null };

  // Vimeo
  const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return { provider: 'vimeo', videoId: vimeoMatch[1] };
  }

  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&]+)/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return { provider: 'youtube', videoId: youtubeMatch[1] };
  }

  return { provider: 'custom', videoId: null };
}

/**
 * Generate embed URL from video URL
 * @param {string} url - Original video URL
 * @returns {string} Embed-ready URL
 */
export function getEmbedUrl(url) {
  if (!url) return '';

  const { provider, videoId } = parseVideoUrl(url);

  if (provider === 'vimeo' && videoId) {
    return `https://player.vimeo.com/video/${videoId}`;
  }

  if (provider === 'youtube' && videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Return original URL if not recognized
  return url;
}
