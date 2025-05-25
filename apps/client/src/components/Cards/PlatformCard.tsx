import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type PlatformCardProps = {
  title: string
  description?: string | null
  isConnected?: boolean
  expiresAt?: string | null // Optional expiration date for the connection
  children?: React.ReactNode // Configure button
  onConfigure?: () => void
  onDisconnect?: () => void
  imageSrc: string
  imageAlt: string
}

export function PlatformCard(props: PlatformCardProps) {

  const dayLeft = props.expiresAt ? Math.ceil((new Date(props.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;

  return <Card className="gap-3">
    <CardHeader>
      <div className="flex">
        <Image src={props.imageSrc} alt={props.imageAlt} width={40} height={40} />
        <div className="ml-auto">
          {props.isConnected ? <Badge>Connected</Badge> : <Badge variant="secondary">Not connected</Badge>}
        </div>
      </div>
      <CardTitle>
        {props.title} <span className="text-xs font-light text-muted-foreground">{dayLeft ? `(${dayLeft} day${dayLeft > 1 ? 's' : ''} left)` : ''}</span>
      </CardTitle>
      {props.description ? <CardDescription>{props.description}</CardDescription> : null}
    </CardHeader>
    {!props.isConnected && props.onConfigure
      ? <CardFooter>
        <Button size="sm" className="cursor-pointer" onClick={props.onConfigure}>Configure</Button>
      </CardFooter>
      : null
    }

    {props.isConnected ? <CardFooter>
      <Button variant="destructive" size="sm" className="cursor-pointer" onClick={props.onDisconnect}>
        Disconnect
      </Button>
    </CardFooter> : null}
  </Card>
}
