import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Armchair, Sparkles } from "lucide-react"
import { SeatingLayout } from "@/components/seating-layout"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCards } from "@/components/stats-cards"
import Link from "next/link"

export default function DashboardPage() {
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
              <p className="text-xs text-muted-foreground">Real-time Seating Monitor</p>
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
          <StatsCards />
        </div>

        {/* Seating Layout */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Seating Layout</CardTitle>
                <CardDescription>Conference Room A - Real-time view</CardDescription>
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
