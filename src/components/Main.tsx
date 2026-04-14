interface MainProps {
  city: string;
  setCity: (value: string) => void;
}

export default function Main({ city, setCity }: MainProps) {
  return (
    <div className="main">
      <h1 className="title">Weather</h1>
      <p className="subtitle">Type a city to see current conditions.</p>
      <label htmlFor="city-input" className="sr-only">City name</label>
      <input
        id="city-input"
        className="search"
        type="text"
        value={city}
        placeholder="Write here the town"
        onChange={(e) => setCity(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
}