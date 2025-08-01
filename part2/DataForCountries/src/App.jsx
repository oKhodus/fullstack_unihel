import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    const capital = country.capital?.[0];
    if (!capital) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;

    axios.get(url).then(response => {
      setWeather(response.data);
    }).catch(err => {
      console.error("Weather error:", err);
    });
  }, [country, api_key]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="flag" width="150" />

      {weather && (
        <>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const CountryList = ({ countries, onShow }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => onShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch all countries once
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data));
  }, []);

  useEffect(() => {
    const matches = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(matches);

    if (matches.length === 1) {
      setSelectedCountry(matches[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [query, allCountries]);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleShow = (countryName) => {
    const country = allCountries.find((c) => c.name.common === countryName);
    setSelectedCountry(country);
  };

  return (
    <div>
      <form>
        find countries <input value={query} onChange={handleInputChange} />
      </form>

      {filtered.length > 10 && <p>Too many matches, specify another filter</p>}

      {filtered.length <= 10 && filtered.length > 1 && (
        <CountryList countries={filtered} onShow={handleShow} />
      )}

      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
}

export default App;
