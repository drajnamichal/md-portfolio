/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { FaPlay, FaLock, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const [email, setEmail] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has email stored in localStorage
    const storedEmail = localStorage.getItem('course_email');
    if (storedEmail) {
      setEmail(storedEmail);
      verifyAccess(storedEmail);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const verifyAccess = async userEmail => {
    if (!courseId) return;

    setCheckingAccess(true);
    try {
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, courseId }),
      });

      const data = await response.json();
      setHasAccess(data.hasAccess);

      // Fetch videos
      const videosResponse = await fetch(`/api/get-videos?courseId=${courseId}&email=${userEmail}`);
      const videosData = await videosResponse.json();
      setVideos(videosData.videos || []);

      if (videosData.videos && videosData.videos.length > 0) {
        // Set first unlocked video as current
        const firstUnlocked = videosData.videos.find(v => !v.locked);
        if (firstUnlocked) {
          setCurrentVideo(firstUnlocked);
        }
      }
    } catch (err) {
      console.error('Error verifying access:', err);
      setError('Failed to verify access. Please try again.');
    } finally {
      setCheckingAccess(false);
      setLoading(false);
    }
  };

  const handleVerifyEmail = async e => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    localStorage.setItem('course_email', email);
    await verifyAccess(email);
  };

  const handleCheckout = () => {
    localStorage.setItem('course_email', email);
    router.push('/courses');
  };

  const handleVideoSelect = video => {
    if (!video.locked) {
      setCurrentVideo(video);
    }
  };

  const formatDuration = seconds => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Layout title="Loading Course..." description="Loading course content">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading course...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Playwright MCP Mastery Course | Michal Drajna"
      description="Master Playwright with Model Context Protocol. Learn AI-powered test automation."
      image="/playwright.png"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Playwright MCP Mastery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Master Playwright with Model Context Protocol
        </p>

        {!hasAccess ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Verify Your Access
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter the email address you used to purchase this course to access the content.
            </p>
            <form onSubmit={handleVerifyEmail} className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={checkingAccess}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {checkingAccess ? 'Verifying...' : 'Verify Access'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-6 pt-6 border-t border-yellow-200 dark:border-yellow-800">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Don't have access yet?</p>
              <button
                onClick={handleCheckout}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Purchase Course - $99
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div
                className="bg-gray-900 rounded-lg overflow-hidden mb-4"
                style={{ aspectRatio: '16/9' }}
              >
                {currentVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {currentVideo.video_url ? (
                      // Replace with actual video player (e.g., Vimeo, YouTube, or custom)
                      <iframe
                        src={currentVideo.video_url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-white text-center p-8">
                        <FaPlay className="text-6xl mx-auto mb-4 opacity-50" />
                        <p className="text-xl">Video content will be available soon</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <FaPlay className="text-6xl mx-auto mb-4 opacity-50" />
                      <p className="text-xl">Select a video to start learning</p>
                    </div>
                  </div>
                )}
              </div>

              {currentVideo && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {currentVideo.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {currentVideo.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FaClock className="mr-2" />
                    <span>Duration: {formatDuration(currentVideo.duration)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Course Content Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Course Content
                </h3>
                <div className="space-y-2">
                  {videos.length > 0 ? (
                    videos.map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        disabled={video.locked}
                        className={`w-full text-left p-4 rounded-lg transition-all ${
                          currentVideo?.id === video.id
                            ? 'bg-teal-100 dark:bg-teal-900 border-2 border-teal-500'
                            : video.locked
                              ? 'bg-gray-100 dark:bg-gray-700 opacity-60 cursor-not-allowed'
                              : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                                {video.title}
                              </h4>
                              {video.locked ? (
                                <FaLock className="text-gray-400 ml-2" />
                              ) : video.is_free_preview ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  FREE
                                </span>
                              ) : (
                                <FaCheckCircle className="text-teal-500 ml-2" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDuration(video.duration)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Course content coming soon...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Details */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            About This Course
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
                What You'll Learn
              </h3>
              <ul className="space-y-2">
                {[
                  'Introduction to Model Context Protocol',
                  'Building MCP servers for testing',
                  'AI-powered test generation',
                  'Advanced Playwright automation',
                  'Integration with CI/CD pipelines',
                  'Real-world testing scenarios',
                  'Best practices and patterns',
                  'Performance optimization',
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-4">
                Course Features
              </h3>
              <ul className="space-y-2">
                {[
                  '8+ hours of video content',
                  'Lifetime access to all materials',
                  'Source code and examples',
                  'Certificate of completion',
                  'Priority support',
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <FaCheckCircle className="text-teal-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
