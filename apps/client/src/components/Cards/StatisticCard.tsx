import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "../ui/card";



export function StatisticCard() {
  return <Card>
    <CardContent className="px-6">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ExternalLink className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total contenus</p>
          <p className="text-2xl font-bold">10</p>
        </div>
      </div>
    </CardContent>
  </Card>
}
