-- Sample data for Playwright MCP course
-- Run this in your Supabase SQL editor after creating the tables

-- Insert sample videos for the Playwright MCP course
INSERT INTO course_videos (course_id, title, description, video_url, duration, order_index, is_free_preview)
VALUES
  (
    'playwright-mcp',
    'Welcome to Playwright MCP Mastery',
    'Introduction to the course, what you will learn, and how to get the most out of it.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_1',
    420,
    1,
    true
  ),
  (
    'playwright-mcp',
    'What is Model Context Protocol?',
    'Understanding the fundamentals of MCP and its role in modern AI applications.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_2',
    780,
    2,
    true
  ),
  (
    'playwright-mcp',
    'Setting Up Your Development Environment',
    'Step-by-step guide to setting up Playwright, Node.js, and MCP tools.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_3',
    900,
    3,
    false
  ),
  (
    'playwright-mcp',
    'Building Your First MCP Server',
    'Create a simple MCP server that interacts with Playwright for browser automation.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_4',
    1200,
    4,
    false
  ),
  (
    'playwright-mcp',
    'Advanced MCP Server Patterns',
    'Learn advanced patterns for building robust and scalable MCP servers.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_5',
    1080,
    5,
    false
  ),
  (
    'playwright-mcp',
    'AI-Powered Test Generation',
    'Using AI and MCP to automatically generate intelligent test cases.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_6',
    1350,
    6,
    false
  ),
  (
    'playwright-mcp',
    'Integrating with CI/CD Pipelines',
    'Deploy your MCP-powered tests to GitHub Actions, GitLab CI, and Jenkins.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_7',
    960,
    7,
    false
  ),
  (
    'playwright-mcp',
    'Real-World Project: E-commerce Testing',
    'Build a complete testing suite for an e-commerce application using MCP.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_8',
    1800,
    8,
    false
  ),
  (
    'playwright-mcp',
    'Performance Testing with Playwright',
    'Measure and optimize application performance using Playwright APIs.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_9',
    840,
    9,
    false
  ),
  (
    'playwright-mcp',
    'Best Practices and Design Patterns',
    'Learn industry best practices for maintaining test automation projects.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_10',
    720,
    10,
    false
  ),
  (
    'playwright-mcp',
    'Debugging and Troubleshooting',
    'Master debugging techniques and solve common automation challenges.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_11',
    900,
    11,
    false
  ),
  (
    'playwright-mcp',
    'Course Summary and Next Steps',
    'Recap of everything learned and resources for continued learning.',
    'https://player.vimeo.com/video/YOUR_VIDEO_ID_12',
    600,
    12,
    false
  );

-- Verify the data was inserted
SELECT 
  course_id, 
  title, 
  duration, 
  order_index, 
  is_free_preview,
  created_at
FROM course_videos
WHERE course_id = 'playwright-mcp'
ORDER BY order_index;

-- Calculate total course duration
SELECT 
  course_id,
  COUNT(*) as total_videos,
  SUM(duration) as total_duration_seconds,
  ROUND(SUM(duration) / 3600.0, 1) as total_duration_hours
FROM course_videos
WHERE course_id = 'playwright-mcp'
GROUP BY course_id;

