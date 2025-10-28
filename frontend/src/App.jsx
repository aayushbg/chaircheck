import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [seatingGrid, setSeatingGrid] = useState([]);

  useEffect(() => {
    createSeatingGrid();
  }, []);

  // Create a 7x10 grid using the fetchall endpoint
  const createSeatingGrid = async () => {
    const rows = 7;
    const cols = 10;
    const grid = [];

    try {
      // Fetch all occupied seats in one request
      const response = await fetch('https://chaircheck-backend.onrender.com/fetchall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_number: 1
        })
      });
      const data = await response.json();
      const occupiedSeats = new Set(data.occupied_seats); // Convert to Set for O(1) lookups

      // Create the grid based on the occupied seats data
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const seatNumber = i * 10 + j + 1;
          row.push(occupiedSeats.has(seatNumber)); // true if seat is in occupied set
        }
        grid.push(row);
      }
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
      // If there's an error, create an empty grid with all seats vacant
      for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(false));
      }
    }
    
    setSeatingGrid(grid);
  };

  return (
    <div className="container">
      <h1 className="title">ChairCheck</h1>
      <div className="seating-grid">
        {seatingGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((isOccupied, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`seat ${isOccupied ? 'occupied' : 'vacant'}`}
              >
                {rowIndex * 10 + colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
