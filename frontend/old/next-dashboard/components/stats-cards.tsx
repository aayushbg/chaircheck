"use client"

import { useState, useEffect } from "react"
import { Users, Armchair, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  const [stats, setStats] = useState({
    total: 48, // 6 rows * 8 columns
    occupied: 0,
    available: 48,
    occupancyRate: 0
  })

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
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
        const occupiedCount = data.occupied_seats.length;
        const availableCount = stats.total - occupiedCount;
        const occupancyRate = ((occupiedCount / stats.total) * 100).toFixed(1);

        setStats({
          total: stats.total,
          occupied: occupiedCount,
          available: availableCount,
          occupancyRate: parseFloat(occupancyRate)
        });
      } catch (error) {
        console.error('Error fetching occupied seats:', error);
      }
    };

    fetchOccupiedSeats();
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Seats</CardTitle>
          <Armchair className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">Conference Room A</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Occupied</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.occupied}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-foreground font-medium">{stats.occupancyRate}%</span> occupancy rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{stats.available}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-foreground font-medium">{(100 - stats.occupancyRate).toFixed(1)}%</span> available now
          </p>
        </CardContent>
      </Card>
    </>
  )
}