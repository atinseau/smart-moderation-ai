import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type PlatformCardProps = {
  title: string
  description?: string | null
  isConnected?: boolean
  children?: React.ReactNode // Configure button
  onConfigure?: () => void
  imageSrc: string
  imageAlt: string
}

export function PlatformCard(props: PlatformCardProps) {
  return <Card className="gap-3">
    <CardHeader>
      <div className="flex">
        <Image src={props.imageSrc} alt={props.imageAlt} width={40} height={40} />
        <div className="ml-auto">
          {props.isConnected ? <Badge>Connected</Badge> : <Badge variant="secondary">Not connected</Badge>}
        </div>
      </div>
      <CardTitle>{props.title}</CardTitle>
      {props.description ? <CardDescription>{props.description}</CardDescription> : null}
    </CardHeader>
    {!props.isConnected && props.onConfigure
      ? <CardFooter>
        <Button size="sm" className="cursor-pointer" onClick={props.onConfigure}>Configure</Button>
      </CardFooter>
      : null
    }
  </Card>
}
