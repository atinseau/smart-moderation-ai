import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export function Quota() {
  return <div className="flex gap-4 items-center">
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted-foreground whitespace-nowrap text-right">
        Quota: <span className="font-semibold">1000</span> / <span className="text-gray-400">1000</span>
      </p>
      <Progress className="w-[200px]" value={50} max={100} />
    </div>
    <Button size="sm" variant="outline">Upgrade</Button>
  </div>
}
