# Michal Drajna - Portfolio Website

A modern, responsive portfolio website built with Next.js, showcasing my work as a QA Engineer and Test Automation specialist.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Dynamic Content**: Interactive sections showcasing projects and skills
- **Performance Optimized**: Fast loading times and optimized assets
- **Accessibility**: WCAG compliant and screen-reader friendly
- **Analytics**: Visitor tracking with Supabase
- **API**: RESTful API endpoints for data access and analytics

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **Deployment**: Vercel
- **Icons**: React Icons
- **Testing**: Playwright

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/drajnamichal/md-portfolio.git
   cd md-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Database Setup

The project uses Supabase for visitor tracking. Required tables:

- `visitor_count`: Tracks total unique visitors
- `visitor_ips`: Stores visitor information and analytics

## Available Scripts

- `npm run dev`: Runs the development server
- `npm run build`: Builds the production application
- `npm run start`: Starts the production server
- `npm run lint`: Runs ESLint for code quality
- `npm test`: Runs Playwright tests (if configured)

## Project Structure

```plaintext
md-portfolio/
├── components/         # React components
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # CSS styles
├── lib/               # Utility functions
└── tests/            # Test files
```

## Key Components

- `Layout.js`: Main layout wrapper
- `Footer.js`: Site footer with dynamic content
- `SocialIcons.js`: Social media links
- `VisitorTracker.js`: Analytics tracking

## Deployment

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

## Analytics

The site uses Supabase to track:

- Unique visitors
- Visitor locations
- Most visited pages
- User engagement

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [michaldrajna.com](https://michaldrajna.com)
- LinkedIn: [Michal Drajna](https://www.linkedin.com/in/michaldrajna)
- Twitter: [@drajnamichal](https://twitter.com/drajnamichal)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Supabase for backend services
- All contributors and users of the site

## Documentation

- [API Documentation](docs/API.md) - Detailed documentation of all API endpoints
- [Contributing Guidelines](CONTRIBUTING.md) - Guidelines for contributing to the project
- [License](LICENSE) - MIT License details
