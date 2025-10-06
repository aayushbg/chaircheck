import './App.css'

function App() {
  // Create a 7x10 grid with all seats unoccupied except middle seat in first row
  const createSeatingGrid = () => {
    const rows = 7;
    const cols = 10;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        // Set middle seat in first row as occupied (for 10 columns, middle seats are 4 and 5)
        const isOccupied = i === 0 && j === 4;
        row.push(isOccupied);
      }
      grid.push(row);
    }
    return grid;
  };

  const seatingGrid = createSeatingGrid();

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
