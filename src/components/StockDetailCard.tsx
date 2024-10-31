"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"

type StockMeta = {
    symbol: string;
    interval: string;
    changePercent: number
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    change: number
    type: string;
    stockValue: StockValue[]
};

// Define a type for each value entry
type StockValue = {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
};

export function StockDetailsCard({stockMeta, stocksValue}: {stockMeta: StockMeta, stocksValue: StockValue[]}) {

  if (!stockMeta) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Details</CardTitle>
          <CardDescription>Unable to load stock details</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const change = Number(stocksValue[0].close) - Number(stocksValue[0].open)
  stockMeta.change = change
  stockMeta.changePercent = (change / Number(stocksValue[0].open)) * 100

  const isPositiveChange = stockMeta.changePercent >= 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Details</CardTitle>
        <CardDescription>{stockMeta.symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Current Price</p>
            <p className="text-2xl font-bold">${Number(stocksValue[0].close).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Change</p>
            <div className="flex items-center">
              <Badge variant={isPositiveChange ? "default" : "destructive"} className="mr-2">
                {isPositiveChange ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                ${Math.abs(stockMeta.change).toFixed(2)} ({Math.abs(stockMeta.changePercent).toFixed(2)}%)
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Volume</p>
            <p className="text-lg font-semibold">{stocksValue[0].volume}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}