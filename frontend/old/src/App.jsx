
import { useState, useEffect } from 'react';
import './App.css'

function StatsCard({ title, value, subValue, subLabel, icon: Icon }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {Icon && <Icon className="card-icon" />}
      </div>
      <div className="card-content">
        <div className="card-value">{value}</div>
        <p className="card-subtitle">
          {subValue && <span className="highlight">{subValue}</span>} {subLabel}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [seatingGrid, setSeatingGrid] = useState([]);
  const [stats, setStats] = useState({
    total: 70, // 7 rows * 10 columns
    occupied: 0,
    available: 70,
    occupancyRate: 0
  });
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const fetchAndUpdateSeats = async () => {
    const rows = 7;
    const cols = 10;
    const grid = [];

    try {
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
      const occupiedSeats = new Set(data.occupied_seats);

      // Update stats
      const occupiedCount = occupiedSeats.size;
      const availableCount = stats.total - occupiedCount;
      const occupancyRate = ((occupiedCount / stats.total) * 100).toFixed(1);

      setStats({
        total: stats.total,
        occupied: occupiedCount,
        available: availableCount,
        occupancyRate: parseFloat(occupancyRate)
      });

      // Create grid
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const seatNumber = i * 10 + j + 1;
          row.push(occupiedSeats.has(seatNumber));
        }
        grid.push(row);
      }
    } catch (error) {
      console.error('Error fetching occupied seats:', error);
      for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(false));
      }
    }
    
    setSeatingGrid(grid);
  };

  useEffect(() => {
    fetchAndUpdateSeats();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchAndUpdateSeats, 30000);
    return () => clearInterval(interval);
  }, []);

  const getRowLabel = (index) => String.fromCharCode(65 + index); // Convert 0-6 to A-G

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              💺
            </div>
            <div>
              <h1 className="title">ChairCheck</h1>
              <p className="subtitle">Real-time Seating Monitor</p>
            </div>
          </div>
          <div className="status-badge">
            <div className="live-indicator"></div>
            Live
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard
            title="Total Seats"
            value={stats.total}
            subLabel="Conference Room A"
            icon={() => <span className="icon">💺</span>}
          />
          <StatsCard
            title="Occupied"
            value={stats.occupied}
            subValue={`${stats.occupancyRate}%`}
            subLabel="occupancy rate"
            icon={() => <span className="icon">👥</span>}
          />
          <StatsCard
            title="Available"
            value={stats.available}
            subValue={`${(100 - stats.occupancyRate).toFixed(1)}%`}
            subLabel="available now"
            icon={() => <span className="icon">✨</span>}
          />
        </div>

        {/* Seating Layout */}
        <div className="seating-layout-card">
          <div className="card-header">
            <div>
              <h2 className="section-title">Seating Layout</h2>
              <p className="section-subtitle">Conference Room A - Real-time view</p>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="legend-color occupied"></div>
                <span>Occupied</span>
              </div>
              <div className="legend-item">
                <div className="legend-color available"></div>
                <span>Available</span>
              </div>
            </div>
          </div>

          <div className="stage-indicator">STAGE / FRONT</div>

          <div className="seating-grid">
            {seatingGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <div className="row-label">{getRowLabel(rowIndex)}</div>
                {row.map((isOccupied, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`seat ${isOccupied ? 'occupied' : 'available'} ${
                      hoveredSeat === `${rowIndex}-${colIndex}` ? 'hovered' : ''
                    }`}
                    onMouseEnter={() => setHoveredSeat(`${rowIndex}-${colIndex}`)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  >
                    {rowIndex * 10 + colIndex + 1}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
