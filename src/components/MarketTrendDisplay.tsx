"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type StockData = {
  datetime: Date,
  volume: number,
  open: number,
  close: number,
  high: number,
  low: number,
}

export function MarketTrendsDisplay({marketData}:{marketData: StockData[]}) { // Change here
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>Recent performance of stocks and crypto (indexed)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            stocks: {
              label: "Stocks",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <XAxis dataKey="datetime" /> {/* Ensure the dataKey matches the property name */}
              <YAxis dataKey={"close"}/>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="close" stroke="var(--color-stocks)" strokeWidth={2} /> {/* Ensure the dataKey matches the property name */}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}