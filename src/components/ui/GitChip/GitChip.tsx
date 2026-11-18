import { cn } from '@/utils/cn'

type GitChipProps = {
  label: string
  /** accent: 브랜치·HEAD 표시(주황 채움), outline: 커밋 타입 표시(옅은 테두리) */
  variant?: 'accent' | 'outline'
  className?: string
  style?: React.CSSProperties
}

export default function GitChip({
  label,
  variant = 'accent',
  className,
  style,
}: GitChipProps) {
  return (
    <div
      style={style}
      className={cn(
        'flex items-center rounded-[4px] px-2 py-0.5 text-[14px] uppercase',
        variant === 'accent'
          ? 'bg-accent text-white'
          : 'border-brand/40 text-brand border',
        className,
      )}
    >
      {label}
    </div>
  )
}
