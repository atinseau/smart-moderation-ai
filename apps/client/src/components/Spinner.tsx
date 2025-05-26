import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

type SpinnerProps = {
  label?: string;
  className?: string;
}

export function Spinner(props: SpinnerProps) {
  return <div className={cn(props.className, "flex gap-2")}>
    <LoaderCircle
      className="animate-spin"
    />
    {props.label && <span>{props.label}</span>}
  </div>
}
