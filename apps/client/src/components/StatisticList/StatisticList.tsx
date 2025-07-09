'use client';

import { StatisticCard, StatisticCardProps } from "../Cards/StatisticCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useBreakpoints } from "@/hooks/use-breakpoints"

export type StatisticListProps = {
  statistics: StatisticCardProps[]
}

export function StatisticList(props: StatisticListProps) {
  const breakpoints = useBreakpoints()
  const slidesToScroll = breakpoints.lg ? 3 : breakpoints.sm ? 2 : 1



  return <Carousel
    opts={{
      slidesToScroll,

    }}
  >
    <CarouselContent>
      {props.statistics.map((statistic, index) => <CarouselItem
        key={index}
        className="sm:basis-1/2 lg:basis-1/3"
      >
        <StatisticCard {...statistic} />
      </CarouselItem>)}
    </CarouselContent>
  </Carousel>
}
