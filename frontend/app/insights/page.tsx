import { ArrowLeft, Sparkles, TrendingUp, Clock, Users, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { OccupancyChart } from "@/components/occupancy-chart"
import { HeatmapChart } from "@/components/heatmap-chart"

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Insights</h1>
                <p className="text-xs text-muted-foreground">Powered by advanced analytics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Peak Hours</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2-4 PM</div>
              <p className="text-xs text-muted-foreground mt-1">Highest occupancy period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Occupancy</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">68%</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Popular Zones</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Rows C-D</div>
              <p className="text-xs text-muted-foreground mt-1">Most frequently occupied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency Score</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8.4/10</div>
              <p className="text-xs text-muted-foreground mt-1">Space utilization rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Occupancy Trends</CardTitle>
              <CardDescription>Last 7 days hourly average</CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancyChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Seat Popularity Heatmap</CardTitle>
              <CardDescription>Usage frequency by seat position</CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapChart />
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">AI Recommendations</CardTitle>
            </div>
            <CardDescription>Actionable insights to optimize your space</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">Optimal Capacity</h4>
                  <Badge variant="secondary" className="text-xs">
                    High Priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Current occupancy rate of 66.7% is within the optimal range (60-75%). This indicates healthy space
                  utilization without overcrowding.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">Peak Hour Management</h4>
                  <Badge variant="secondary" className="text-xs">
                    Medium Priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Consider implementing a booking system for 2-4 PM slots when occupancy reaches 85%. This will help
                  manage demand during peak hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">Underutilized Areas</h4>
                  <Badge variant="secondary" className="text-xs">
                    Low Priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rows A and F show 40% lower occupancy than center rows. Consider repositioning amenities or improving
                  visibility to increase usage of these areas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">Seating Preferences</h4>
                  <Badge variant="secondary" className="text-xs">
                    Insight
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Users show a 65% preference for middle rows (C-D). This pattern suggests good sightlines and acoustics
                  in these areas. Consider this data for future room configurations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
