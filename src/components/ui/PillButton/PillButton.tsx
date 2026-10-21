import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import { cn } from '@/utils/cn'

type PillButtonProps = {
  label: string
  className?: string
  labelClassName?: string
  hideArrow?: boolean
} & (
  | { href: string; onClick?: never; type?: never; presentational?: never }
  | { href?: never; onClick?: () => void; type?: 'button' | 'submit'; presentational?: never }
  | { href?: never; onClick?: never; type?: never; presentational: true }
)

const PILL_BUTTON_CLASSNAME =
  'border-brand hover:bg-brand hover:text-cream flex h-7.5 w-fit cursor-pointer items-center gap-2 rounded-full border pr-3 pl-3.5 transition-colors lg:h-10 lg:gap-3 lg:pr-4 lg:pl-5'

export default function PillButton({
  label,
  href,
  onClick,
  type = 'button',
  presentational,
  className,
  labelClassName,
  hideArrow,
}: PillButtonProps) {
  const content = (
    <>
      <span
        className={cn(
          'text-[13px] font-medium whitespace-nowrap uppercase lg:text-lg lg:font-normal',
          labelClassName,
        )}
      >
        {label}
      </span>
      {!hideArrow && <ArrowRightIcon className="h-[11px] w-[18px] lg:h-3 lg:w-5" />}
    </>
  )

  if (presentational) {
    return <span className={cn(PILL_BUTTON_CLASSNAME, className)}>{content}</span>
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(PILL_BUTTON_CLASSNAME, className)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cn(PILL_BUTTON_CLASSNAME, className)}>
      {content}
    </button>
  )
}
