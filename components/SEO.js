import Head from 'next/head';

export default function SEO({ 
  title = "Michal Drajna - Senior QA Engineer",
  description = "Senior QA Engineer specializing in test automation with Playwright. Offering workshops, consulting, and online courses in software testing.",
  image = "/memoji.png",
  url = "https://michaldrajna.com",
  type = "website"
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Michal Drajna",
    "jobTitle": "Senior QA Engineer",
    "url": "https://michaldrajna.com",
    "sameAs": [
      "https://www.linkedin.com/in/michaldrajna-qa/",
      "https://github.com/drajnamichal",
      "https://www.facebook.com/michaldrajna/"
    ],
    "description": "Senior QA Engineer specializing in test automation with Playwright. Expert in software testing and quality assurance.",
    "image": "https://michaldrajna.com/memoji.png",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Technical University of Košice"
    },
    "knowsAbout": [
      "Test Automation",
      "Playwright",
      "Software Testing",
      "Quality Assurance",
      "CI/CD",
      "API Testing",
      "Mobile Testing"
    ]
  };

  return (
    <Head>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Michal Drajna" />
      <meta name="keywords" content="QA Engineer, Test Automation, Playwright, Software Testing, Quality Assurance, Test Framework, Workshops, Online Courses" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="Michal Drajna" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />

      {/* Schema.org JSON-LD */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
} 