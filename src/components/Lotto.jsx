import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

const LottoResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(API_URL); // Use the API_URL constant
      setResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Latest Lotto Results</h1>
      {loading && <p>Loading...</p>}
      {!loading && results && (
        <div>
          {Object.entries(results).map(([gameType, gameResults]) => (
            <div key={gameType}>
              <h2>{gameType}</h2>
              {gameResults.map(result => (
                <div key={result.draw_id}>
                  <p>Date: {result.date}</p>
                  <p>Winning Numbers: {result.winning_numbers.join(', ')}</p>
                  {result.bonus_ball && <p>Bonus Ball: {result.bonus_ball}</p>}
                  {/* Add other relevant data */}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LottoResults;
