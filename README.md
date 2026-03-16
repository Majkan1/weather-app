# 🌤 Real-Time Weather Dashboard

A responsive weather application built with React and JavaScript. Search any city and instantly see current temperature, wind speed, and weather conditions — powered by a live REST API.

> **Live demo:** https://majkan1.github.io/weather-app/

---

## Screenshot

![Weather App Screenshot](./screenshot.png)

> *Search autocomplete with live weather card showing city, temperature, and wind speed.*

---

## Features

- Search any city by name with autocomplete suggestions
- Displays current temperature (°C), wind speed (km/h), and weather icon
- Comprehensive error handling — invalid cities, network failures, and empty queries all handled gracefully
- Loading states prevent UI flashing during API calls
- Fully responsive layout — works on mobile and desktop

---

## Tech stack

| Technology | Purpose |
|---|---|
| React 18 | UI component architecture |
| JavaScript ES6+ | Application logic |
| OpenWeatherMap API | Live weather data |
| Fetch + async/await | HTTP requests |
| React.memo / useMemo | Render optimisation |
| Vite | Build tool and dev server |
| GitHub Pages | Deployment |

---

## Technical decisions

**Why React.memo and useMemo?**
The `WeatherCard` component was re-rendering on every keystroke in the search input, even though the weather data hadn't changed. Wrapping it in `React.memo` and memoising the derived display values with `useMemo` means the card only re-renders when the API actually returns new data — not on every user input event.

**Why async/await over .then() chains?**
Error handling with `.then().catch()` chains gets messy when you have multiple failure states (network error, invalid city, API rate limit). Using `async/await` with `try/catch` blocks makes each failure case explicit and easy to handle independently.

**Why a separate loading state?**
Without a loading state, there's a flash of stale data between searches. A dedicated `isLoading` boolean lets the UI show a spinner immediately on submit and hide the previous result until new data arrives — preventing a confusing UX where the user sees Warsaw's weather while searching for Berlin.

---

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/Majkan1/weather-app.git
cd weather-app

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

Open `.env` and add your API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Get a free key at [openweathermap.org/api](https://openweathermap.org/api) — the free tier is sufficient for this app.

```bash
# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Input with autocomplete dropdown
│   ├── WeatherCard.jsx     # Main result card (memoised)
│   └── ErrorMessage.jsx    # Reusable error display
├── hooks/
│   └── useWeather.js       # API fetching logic + state
├── utils/
│   └── formatWeather.js    # Data transformation helpers
└── App.jsx
```

---

## What I learned

- How to integrate a third-party REST API with proper error handling for multiple failure cases
- When and why to use `React.memo` and `useMemo` — not just how to use them
- How to design a loading state that prevents stale UI
- Structuring a React app with custom hooks to separate API logic from display logic

---

## License

MIT
