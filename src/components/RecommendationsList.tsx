import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const mockRecommendations = [
  {
    type: "Stock",
    name: "AAPL",
    recommendation: "Buy",
    reason: "Strong financial performance and upcoming product releases",
  },
  {
    type: "Crypto",
    name: "ETH",
    recommendation: "Hold",
    reason: "Potential growth due to upcoming network upgrades",
  },
  {
    type: "Stock",
    name: "MSFT",
    recommendation: "Buy",
    reason: "Consistent growth in cloud services and AI initiatives",
  },
]

export function RecommendationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Personalized investment suggestions based on your preferences and market trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockRecommendations.map((rec, index) => (
            <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-semibold">
                {rec.type}: {rec.name}
              </h3>
              <p className="text-sm text-muted-foreground">Recommendation: {rec.recommendation}</p>
              <p className="text-sm mt-1">{rec.reason}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}