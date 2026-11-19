import logoMarkBeige from '@/assets/images/logo-mark-beige.svg'
import logoMarkBlue from '@/assets/images/logo-mark.svg'
import { cn } from '@/utils/cn'

type LogoProps = {
  tone?: 'blue' | 'beige'
  className?: string
}

export default function Logo({ tone = 'blue', className }: LogoProps) {
  return (
    <div className={cn('relative size-16.5', className)}>
      <div className="absolute inset-[16.67%]">
        <img
          src={tone === 'blue' ? logoMarkBlue : logoMarkBeige}
          alt=""
          className="absolute inset-0 block size-full max-w-none"
        />
      </div>
    </div>
  )
}
