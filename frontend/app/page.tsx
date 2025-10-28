"use client"

import { Sparkles, Users, Armchair, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { SeatingLayout } from "@/components/seating-layout"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

interface OccupancyData {
  occupied_seats: number[]
}

export default function DashboardPage() {
  const [occupiedCount, setOccupiedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOccupancy = async () => {
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

        if (!response.ok) {
          throw new Error('Failed to fetch occupancy data');
        }

        const data: OccupancyData = await response.json();
        setOccupiedCount(data.occupied_seats.length);
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
        setOccupiedCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOccupancy();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Armchair className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">ChairCheck</h1>
              <p className="text-xs text-muted-foreground">IoT based Real-time Seat Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Seats</CardTitle>
              <Armchair className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">48</div>
              <p className="text-xs text-muted-foreground mt-1">PDEU E-Block 308</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Occupied</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 w-16 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded mt-2" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-foreground">{occupiedCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-foreground font-medium">
                      {((occupiedCount / 48) * 100).toFixed(1)}%
                    </span> occupancy rate
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 w-16 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded mt-2" />
                </div>
              ) : (
                <>
                  <div className="text-3xl font-bold text-foreground">{48 - occupiedCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-foreground font-medium">
                      {(((48 - occupiedCount) / 48) * 100).toFixed(1)}%
                    </span> available now
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Seating Layout */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Seating Layout</CardTitle>
                <CardDescription>PDEU E-Block 308</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[var(--color-occupied)]" />
                  <span className="text-sm text-muted-foreground">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[var(--color-available)] border border-border" />
                  <span className="text-sm text-muted-foreground">Available</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SeatingLayout />
          </CardContent>
        </Card>

        {/* AI Insights CTA */}
        <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">AI-Powered Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    Get intelligent analysis of seating patterns, occupancy trends, and optimization recommendations
                    powered by advanced AI.
                  </p>
                </div>
              </div>
              <Link href="/insights">
                <Button size="lg" className="gap-2 whitespace-nowrap">
                  <Sparkles className="w-4 h-4" />
                  View AI Insights
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
