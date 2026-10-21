import CloverIcon from '@/components/ui/CloverIcon'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

type NavLinkProps = {
  href: string
  active?: boolean
  tone?: 'blue' | 'beige'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export default function NavLink({
  href,
  active,
  tone = 'blue',
  className,
  children,
  onClick,
}: NavLinkProps) {
  return (
    <a
      href={`#${href}`}
      onClick={onClick}
      className={cn(
        'flex w-fit items-center gap-1.5 text-lg whitespace-nowrap uppercase',
        HOVER_UNDERLINE,
        tone === 'blue' ? 'text-brand' : 'text-cream',
        className,
      )}
    >
      {active && <CloverIcon size={18} />}
      {children}
    </a>
  )
}
