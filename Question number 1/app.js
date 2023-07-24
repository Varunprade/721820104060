mport React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/numbers');
      setNumbers(response.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = async () => {
    if (inputValue !== '') {
      try {
        await axios.post('http://localhost:5000/api/numbers', { number: parseInt(inputValue) });
        setInputValue('');
        fetchNumbers();
      } catch (error) {
        console.error('Error adding number:', error);
      }
    }
  };

  const handleRemoveNumber = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/numbers/${index}`);
      fetchNumbers();
    } catch (error) {
      console.error('Error removing number:', error);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Program</h1>
      <div>
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddNumber}>Add Number</button>
      </div>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>
            {number} <button onClick={() => handleRemoveNumber(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
