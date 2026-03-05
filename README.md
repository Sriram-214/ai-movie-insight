# AI Movie Insight Builder🎬
This is a Next.js project bootstrapped with create-next-app. Built for the Brew Full-Stack Developer Internship Hiring Assignment.

## 🚀 Getting StartedFirst, add your OMDB API key.

Create a .env.local file in the root directory:
OMDB_API_KEY=your_api_key_here

Then, run the development server:

# Bash
npm run dev
# or
yarn dev

Open http://localhost:3000 with your browser to see the result.

# 🛠 Tech Stack Rationale

* Frontend & Backend: Next.js (React). I chose Next.js because its App Router and API routes allow for a seamless full-stack architecture within the JavaScript ecosystem, aligning with modern best practices for scalable web apps.

* Styling: Pure CSS (via styled-jsx) for a custom, glassmorphism-inspired UI that is lightweight and highly responsive.

* Data Source: OMDB API for fetching accurate movie metadata, posters, and ratings

# 📌 Assumptions & Trade-offs

* AI Implementation: To ensure functionality within the estimated 8-10 hours of active work timeframe , the "AI Audience Insight" feature is simulated via a dynamic, server-side algorithm that processes actual IMDb ratings and plot data to generate contextual sentiment paragraphs.

* Deployment: The application is deployed live on Vercel to ensure it is accessible, responsive, and secure for evaluation without local setup.

# Learn More
To learn more about Next.js, take a look at the following resources:

* Next.js Documentation - learn about Next.js features and API.

* Learn Next.js - an interactive Next.js tutorial.
