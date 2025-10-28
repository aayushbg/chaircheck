"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Seat {
  id: string
  row: number
  number: number
  occupied: boolean
}

const generateSeats = async (): Promise<Seat[]> => {
  const seats: Seat[] = []
  const rows = ["A", "B", "C", "D", "E", "F"]
  let seatNumber = 1

  try {
    // Fetch occupied seats from backend
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

    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= 8; i++) {
        seats.push({
          id: seatNumber.toString(),
          row: rowIndex,
          number: i,
          occupied: occupiedSeats.has(seatNumber),
        })
        seatNumber++
      }
    })
  } catch (error) {
    console.error('Error fetching occupied seats:', error);
    // If there's an error, create seats with all vacant
    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= 8; i++) {
        seats.push({
          id: seatNumber.toString(),
          row: rowIndex,
          number: i,
          occupied: false,
        })
        seatNumber++
      }
    })
  }

  return seats
}

export function SeatingLayout() {
  const [seats, setSeats] = useState<Seat[]>([])
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null)

  // Fetch seats when component mounts
  useEffect(() => {
    const fetchSeats = async () => {
      const seatsData = await generateSeats()
      setSeats(seatsData)
    }
    fetchSeats()
  }, [])

  const rows = ["A", "B", "C", "D", "E", "F"]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stage/Front indicator */}
      <div className="mb-8 text-center">
        <div className="inline-block px-6 py-2 bg-muted border border-border rounded-lg">
          <span className="text-sm font-medium text-muted-foreground">STAGE / FRONT</span>
        </div>
      </div>

      {/* Seating Grid */}
      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <div key={row} className="flex items-center gap-4">
            {/* Row Label */}
            <div className="w-8 text-center">
              <span className="text-sm font-semibold text-muted-foreground">{row}</span>
            </div>

            {/* Seats */}
            <div className="flex-1 grid grid-cols-8 gap-3">
              {seats
                .filter((seat) => seat.row === rowIndex)
                .map((seat) => (
                  <button
                    key={seat.id}
                    onMouseEnter={() => setHoveredSeat(seat.id)}
                    onMouseLeave={() => setHoveredSeat(null)}
                    className={cn(
                      "aspect-square rounded-lg transition-all duration-200 relative group",
                      "flex items-center justify-center text-xs font-semibold",
                      seat.occupied
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 border-2 border-primary/50"
                        : "bg-muted/50 text-foreground border-2 border-border hover:border-primary/50 hover:bg-muted",
                      hoveredSeat === seat.id && "scale-110 z-10 ring-2 ring-primary/50",
                    )}
                  >
                    <span>{seat.id}</span>

                    {/* Tooltip */}
                    {hoveredSeat === seat.id && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded shadow-lg whitespace-nowrap z-20">
                        <p className="text-xs font-medium text-popover-foreground">Seat {seat.id}</p>
                        <p className="text-xs text-muted-foreground">{seat.occupied ? "Occupied" : "Available"}</p>
                      </div>
                    )}
                  </button>
                ))}
            </div>

            {/* Row Label (right side) */}
            <div className="w-8 text-center">
              <span className="text-sm font-semibold text-muted-foreground">{row}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Seat Numbers */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-8" />
        <div className="flex-1 grid grid-cols-8 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="text-center">
              <span className="text-xs text-muted-foreground">{num}</span>
            </div>
          ))}
        </div>
        <div className="w-8" />
      </div>
    </div>
  )
}
