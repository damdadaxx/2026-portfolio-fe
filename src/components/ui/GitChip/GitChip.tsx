import { cn } from '@/utils/cn'

export default function GitChip({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'bg-accent flex items-center rounded-[4px] px-2 py-0.5 text-[14px] text-white uppercase',
        className,
      )}
    >
      {label}
    </div>
  )
}
