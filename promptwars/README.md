# StadiumMind AI

StadiumMind AI is a GenAI-enabled Stadium Intelligence Platform built for the FIFA World Cup 2026. It acts as a digital command center enhancing stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff.

## Features

- **AI Navigation & Match Assistant**: Real-time GPT-powered chat assistant helping fans find seats, restrooms, food, and exits.
- **Crowd Intelligence**: Live simulated data predicting queue times, crowd density, and tracking traffic.
- **AI Decision Center**: The core organizer dashboard providing real-time AI-generated recommendations to prevent overcrowding and manage emergencies.
- **Accessibility Dashboard**: Tools for visually impaired or wheelchair-bound fans to navigate the stadium seamlessly.
- **Sustainability Dashboard**: Tracks carbon footprint savings and incentivizes green actions.
- **Transportation Hub**: Live transit updates, parking availability, and smart routing.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express, TypeScript, OpenAI API, custom live simulation engine.

## Project Structure

- `/frontend`: React application containing all UI components and dashboards.
- `/backend`: Node.js server containing the data simulation engine and AI endpoints.

## Installation & Setup

1. **Clone the repository** (or navigate to the project root).
2. **Setup the Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on instructions below
   npm run build
   npm run start # or npm run dev
   ```
3. **Setup the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Access the Application**: Open `http://localhost:5173` in your browser.

## Environment Configuration

In the `backend` directory, create a `.env` file:
```env
PORT=5000
# To enable real AI responses, add your OpenAI key:
# OPENAI_API_KEY=sk-...
```
*Note: If no API key is provided, the backend will automatically use a smart mock-fallback system to simulate the AI experience.*
