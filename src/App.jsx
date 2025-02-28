import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/beers/ale"
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="card-container">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            price={item.price || "N/A"}
            name={item.name}
            rating={item.rating || { average: "N/A", reviews: 0 }}
            image={item.image}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
