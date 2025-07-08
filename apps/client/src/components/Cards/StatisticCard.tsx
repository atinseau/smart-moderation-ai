import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type StatisticCardProps = {
  title: string;
  value: number;
  className?: string;
  icon: React.ReactNode;
}

export function StatisticCard({ title, value, icon, className }: StatisticCardProps) {
  return <Card>
    <CardContent className="px-6">
      <div className="flex items-center space-x-2">
        <div className={cn(className, "p-2 rounded-lg")}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
}
